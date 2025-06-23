import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TestimonialsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
