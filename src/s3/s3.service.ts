import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class S3Service {
  private s3 = new S3Client({});
  private bucket = process.env.BUCKET_S3_NAME;

  async create(file: Express.Multer.File) {
    const reducedBuffer = await sharp(file.buffer)
      .resize({
        width: 400,
        height: 400,
        fit: 'cover',
      })
      .toBuffer();
    const key = `${uuidv4()}-${file.originalname}`;
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: reducedBuffer,
        ContentType: file.mimetype,
      }),
    );
    return `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }

  findAll() {
    return `This action returns all s3`;
  }

  remove(id: number) {
    return `This action removes a #${id} s3`;
  }
}
