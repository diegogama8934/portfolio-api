import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { Reference } from './entities/reference.entity';
import { S3Service } from 'src/s3/s3.service';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class ReferencesService {
  constructor(
    @InjectRepository(Reference)
    private readonly referenceRepository: Repository<Reference>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly s3Service: S3Service,
  ) { }

  async createProfileReference(
    createReferenceDto: CreateReferenceDto,
    file: Express.Multer.File,
  ) {
    let image: string | null;

    if (file) {
      image = await this.s3Service.createImageToProfileReference(file);
    }

    const savedReference = await this.referenceRepository.save({
      ...createReferenceDto,
      image: image,
    });

    return {
      message: 'Reference created successfully',
      data: savedReference,
      success: true,
    };
  }

  async createProjectReference(
    createReferenceDTO: CreateReferenceDto,
    file: Express.Multer.File,
  ) {
    let image: string | null;

    if (file) {
      image = await this.s3Service.createImageToProjectReference(
        file,
        createReferenceDTO.projectId,
      );
    }
    const savedReference = await this.referenceRepository.save({
      ...createReferenceDTO,
      image: image,
    });

    return {
      message: 'Reference created successfully',
      data: savedReference,
      success: true,
    };
  }

  async findAll() {
    const references = await this.referenceRepository.find();

    return {
      message: 'References retrieved successfully',
      data: references,
      success: true,
    };
  }

  async findOne(id: number) {
    const reference = await this.referenceRepository.findOne({ where: { id } });

    if (!reference) {
      throw new NotFoundException(`Reference with ID ${id} not found`);
    }

    return {
      message: 'Reference retrieved successfully',
      data: reference,
      success: true,
    };
  }

  async update(id: number, updateReferenceDto: UpdateReferenceDto) {
    const reference = await this.referenceRepository.findOne({ where: { id } });

    if (!reference) {
      throw new NotFoundException(`Reference with ID ${id} not found`);
    }

    Object.assign(reference, updateReferenceDto);
    const updatedReference = await this.referenceRepository.save(reference);

    return {
      message: 'Reference updated successfully',
      data: updatedReference,
      success: true,
    };
  }

  async remove(id: number) {
    const reference = await this.referenceRepository.findOne({ where: { id } });

    if (!reference) {
      throw new NotFoundException(`Reference with ID ${id} not found`);
    }

    await this.referenceRepository.remove(reference);

    return {
      message: 'Reference deleted successfully',
      data: null,
      success: true,
    };
  }
}
