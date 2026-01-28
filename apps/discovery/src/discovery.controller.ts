import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiscoveryService } from './discovery.service';
import { Program } from './entities/program.entity';

@ApiTags('Discovery')
@Controller()
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Get('programs')
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: [Program] })
  listPrograms(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.discoveryService.listPublishedPrograms(
      Number(page),
      Number(limit),
    );
  }

  @Get('programs/:id')
  @ApiResponse({ status: 200, type: Program })
  getProgram(@Param('id') id: string) {
    return this.discoveryService.getPublishedProgramById(id);
  }

  @Get('search')
  @ApiQuery({ name: 'q', required: true, example: 'podcast' })
  @ApiResponse({ status: 200, type: [Program] })
  search(@Query('q') q: string) {
    return this.discoveryService.searchPublishedPrograms(q);
  }
}
