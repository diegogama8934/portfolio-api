import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateReferenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  place: string;

  @IsString()
  @IsOptional()
  role: string;
}
