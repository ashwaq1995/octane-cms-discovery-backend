import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CmsService } from './cms.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { Program } from './entities/program.entity';

@ApiTags('CMS Programs')
@Controller('/programs')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  // 🔹 GET /cms/programs?page=1&limit=10
  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: [Program] })
  getPrograms(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Program[]> {
    return this.cmsService.findAllPrograms(Number(page), Number(limit));
  }

  // 🔹 GET /cms/programs/:id
  @Get(':id')
  @ApiParam({ name: 'id', example: 'a3f1c1c4-7c4b-4a9e-9a3c-8c5f0c9d1234' })
  @ApiResponse({ status: 200, type: Program })
  getProgramById(@Param('id') id: string): Promise<Program> {
    return this.cmsService.findProgramById(id);
  }

  // 🔹 POST /cms/programs
  @Post()
  @ApiResponse({ status: 201, type: Program })
  createProgram(@Body() dto: CreateProgramDto): Promise<Program> {
    return this.cmsService.createProgram(dto);
  }

  // 🔹 PATCH /cms/programs/:id
  @Patch(':id')
  @ApiParam({ name: 'id', example: 'a3f1c1c4-7c4b-4a9e-9a3c-8c5f0c9d1234' })
  @ApiResponse({ status: 200, type: Program })
  updateProgram(
    @Param('id') id: string,
    @Body() dto: UpdateProgramDto,
  ): Promise<Program> {
    return this.cmsService.updateProgram(id, dto);
  }
}
