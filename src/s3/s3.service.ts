import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class S3Service {
  private s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  private bucket = process.env.BUCKET_S3_NAME;

  private getFilePublicURL(path: string) {
    return `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${path}`;
  }

  getFileKey(fileName: string) {
    return `${uuidv4()}-${fileName}`;
  }

  async getReducedBuffer(file: Express.Multer.File, width: number) {
    return await sharp(file.buffer).resize({ width }).toBuffer();
  }

  findAll() {
    return `This action returns all s3`;
  }

  remove(id: number) {
    return `This action removes a #${id} s3`;
  }

  async createImageToProfileReference(file: Express.Multer.File) {
    const path = `references/profile/${this.getFileKey(file.originalname)}`;

    const reducedBuffer = await this.getReducedBuffer(file, 400);

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: path,
        Body: reducedBuffer,
        ContentType: file.mimetype,
      }),
    );

    return this.getFilePublicURL(path);
  }

  async createImageToProjectReference(
    file: Express.Multer.File,
    projectId: string,
  ) {
    const path = `references/project/${projectId}/${this.getFileKey(file.originalname)}`;

    const reducedBuffer = await this.getReducedBuffer(file, 400);

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: path,
        Body: reducedBuffer,
        ContentType: file.mimetype,
      }),
    );

    return this.getFilePublicURL(path);
  }

  async createImageToProject(file: Express.Multer.File, projectId: string) {
    const path = `projects/${projectId}/${this.getFileKey(file.originalname)}`;

    const reducedBuffer = await this.getReducedBuffer(file, 1200);

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: path,
        Body: reducedBuffer,
        ContentType: file.mimetype,
      }),
    );

    return this.getFilePublicURL(path);
  }
}
