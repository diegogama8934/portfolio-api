import { Controller, Get, Param, Delete } from '@nestjs/common';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Get()
  findAll() {
    return this.s3Service.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.s3Service.remove(+id);
  }
}
