import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), S3Module],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectModule],
})
export class ProjectModule {}
