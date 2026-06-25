import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.questionsService.create(body);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }
}