import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { ConfigModule } from '@nestjs/config';
import { TestimonialsModule } from '../testimonials/testimonials.module';

@Module({
  imports: [ConfigModule, TestimonialsModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
