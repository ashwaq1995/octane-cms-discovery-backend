import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from './entities/program.entity';

@Injectable()
export class DiscoveryService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepo: Repository<Program>,
  ) {}

  async listPublishedPrograms(page = 1, limit = 10): Promise<Program[]> {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit =
      Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 10;

    return this.programRepo.find({
      where: { isPublished: true },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
      order: { publishedAt: 'DESC' },
    });
  }

  async getPublishedProgramById(id: string): Promise<Program> {
    const program = await this.programRepo.findOne({
      where: { id, isPublished: true },
    });

    if (!program) throw new NotFoundException('Program not found');
    return program;
  }

  async searchPublishedPrograms(q: string): Promise<Program[]> {
    const query = (q ?? '').trim();
    if (!query) return [];

    return this.programRepo
      .createQueryBuilder('p')
      .where('p."isPublished" = true')
      .andWhere(`p.search_vector @@ plainto_tsquery('simple', :q)`, {
        q: query,
      })
      .orderBy('p."publishedAt"', 'DESC')
      .limit(50)
      .getMany();
  }
}
