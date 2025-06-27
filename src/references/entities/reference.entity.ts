import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
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

  @Column()
  @IsString()
  @IsNotEmpty()
  place: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  role: string;
}
