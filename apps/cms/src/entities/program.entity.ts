import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProgramStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

@Entity({ name: 'programs' })
export class Program {
  // DB: id uuid not null default gen_random_uuid()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // DB: title text not null
  @Column({ type: 'text' })
  title!: string;

  // DB: description text nullable
  @Column({ type: 'text', nullable: true })
  description!: string | null;

  // DB: language text not null
  @Column({ type: 'text' })
  language!: string;

  // DB: category_id uuid nullable (FK)
  @Column({ type: 'uuid', name: 'category_id', nullable: true })
  categoryId!: string | null;

  // DB: status text not null default 'DRAFT'
  @Column({ type: 'text', default: ProgramStatus.DRAFT })
  status!: ProgramStatus;

  @Column({ type: 'timestamptz', name: 'published_at', nullable: true })
  publishedAt!: Date | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt!: Date;

  @Column({ type: 'boolean', name: 'isPublished', default: true })
  isPublished!: boolean;

  @Index('idx_programs_search_vector', { synchronize: false })
  @Column({
    type: 'tsvector',
    name: 'search_vector',
    select: false,
    nullable: true,
  })
  searchVector?: string;
}
