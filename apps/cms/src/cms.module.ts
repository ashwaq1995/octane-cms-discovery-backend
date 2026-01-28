import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { Program } from './entities/program.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Program]), // entity registration only
  ],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
