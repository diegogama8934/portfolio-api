import { Module } from '@nestjs/common';
import { ReferencesService } from './references.service';
import { ReferencesController } from './references.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from './entities/reference.entity';
import { S3Module } from 'src/s3/s3.module';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reference, Project]), S3Module],
  controllers: [ReferencesController],
  providers: [ReferencesService],
})
export class ReferencesModule {}
