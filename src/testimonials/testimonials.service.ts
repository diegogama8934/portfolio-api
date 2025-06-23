import { Injectable } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private testimonialRepository: Repository<Testimonial>,
  ) {}

  create(createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialRepository.save(createTestimonialDto);
  }

  findAll() {
    return this.testimonialRepository.find();
  }

  findOne(id: number) {
    return this.testimonialRepository.findOne({ where: { id } });
  }

  update(id: number, updateTestimonialDto: UpdateTestimonialDto) {
    return this.testimonialRepository.update(id, updateTestimonialDto);
  }

  remove(id: number) {
    return this.testimonialRepository.delete(id);
  }
}
