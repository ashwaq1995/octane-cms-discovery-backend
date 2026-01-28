import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program, ProgramStatus } from './entities/program.entity';

@Injectable()
export class CmsService {
  constructor(
    @InjectRepository(Program)
    private readonly programRepo: Repository<Program>,
  ) {}

  // 🔹 CREATE
  async createProgram(dto: CreateProgramDto): Promise<Program> {
    const program = this.programRepo.create({
      title: dto.title,
      description: dto.description ?? null,
      language: dto.language,
      categoryId: dto.categoryId ?? null,
      status: dto.status ?? ProgramStatus.DRAFT,
      publishedAt: dto.publishedAt ?? null,
      isPublished: dto.isPublished ?? true,
    });

    return this.programRepo.save(program);
  }

  // 🔹 GET LIST (pagination)
  async findAllPrograms(page = 1, limit = 10): Promise<Program[]> {
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit =
      Number.isFinite(limit) && limit > 0 ? Math.min(limit, 100) : 10;

    return this.programRepo.find({
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
      order: { createdAt: 'DESC' },
    });
  }

  // 🔹 GET BY ID
  async findProgramById(id: string): Promise<Program> {
    const program = await this.programRepo.findOne({
      where: { id },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return program;
  }

  // 🔹 UPDATE (PATCH)
  async updateProgram(id: string, dto: UpdateProgramDto): Promise<Program> {
    const program = await this.findProgramById(id);

    if (dto.title !== undefined) program.title = dto.title;
    if (dto.description !== undefined)
      program.description = dto.description ?? null;
    if (dto.language !== undefined) program.language = dto.language;
    if (dto.categoryId !== undefined)
      program.categoryId = dto.categoryId ?? null;
    if (dto.status !== undefined) program.status = dto.status;
    if (dto.publishedAt !== undefined)
      program.publishedAt = dto.publishedAt ?? null;
    if (dto.isPublished !== undefined) program.isPublished = dto.isPublished;

    return this.programRepo.save(program);
  }
}
