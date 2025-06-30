import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Project } from 'src/project/entities/project.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Reference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  image: string;

  @Column()
  @CreateDateColumn()
  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  place: string;

  @ManyToOne(() => Project, (project) => project.references, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  project: Project;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  role: string;
}
