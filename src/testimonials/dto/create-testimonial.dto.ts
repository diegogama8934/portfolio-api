import { IsEmail, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  place: string;

  @IsString()
  @IsEmail()
  email: string;
}
