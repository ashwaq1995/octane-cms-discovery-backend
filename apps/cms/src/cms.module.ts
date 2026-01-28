import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { Program } from './entities/program.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'oct',
      password: process.env.DB_PASSWORD ?? 'oct',
      database: process.env.DB_NAME ?? 'oct_content',
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Program]),
  ],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
