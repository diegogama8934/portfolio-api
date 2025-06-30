import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createProjectDto: CreateProjectDto, file: Express.Multer.File) {
    const projectData: Partial<Project> = {
      ...createProjectDto,
      image: null,
    };

    const savedProject = await this.projectRepository.save(projectData);
    if (file) {
      const image = await this.s3Service.createImageToProject(
        file,
        savedProject.id,
      );
      await this.projectRepository.update(savedProject.id, { image });
      savedProject.image = image;
    }

    return {
      message: 'Reference created successfully',
      data: savedProject,
      success: true,
    };
  }

  async findAll() {
    const projects = await this.projectRepository.find();

    return {
      message: 'Projects retrieved successfully',
      data: projects,
      success: true,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
