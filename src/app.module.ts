import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencesModule } from './references/references.module';
import { Reference } from './references/entities/reference.entity';
import { S3Module } from './s3/s3.module';
import { ProjectModule } from './project/project.module';
import { Project } from './project/entities/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Reference, Project],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    ReferencesModule,
    S3Module,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
