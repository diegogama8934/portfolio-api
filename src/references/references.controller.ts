import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ReferencesService } from './references.service';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('references')
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) { }

  @Post('profile')
  @UseInterceptors(FileInterceptor('image'))
  createToProfile(
    @Body() createReferenceDto: CreateReferenceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.referencesService.createProfileReference(
      createReferenceDto,
      file,
    );
  }

  @Post('project/:id')
  @UseInterceptors(FileInterceptor('image'))
  createToProject(
    @Param('id') id: string,
    @Body() createReferenceDTO: CreateReferenceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.referencesService.createProjectReference(
      { ...createReferenceDTO, projectId: id },
      file,
    );
  }

  @Get()
  findAll() {
    return this.referencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referencesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReferenceDto: UpdateReferenceDto,
  ) {
    return this.referencesService.update(+id, updateReferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referencesService.remove(+id);
  }
}
