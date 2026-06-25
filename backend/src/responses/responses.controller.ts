import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResponsesService } from './responses.service';

@Controller('responses')
export class ResponsesController {
  constructor(
    private readonly responsesService: ResponsesService,
  ) {}

  @Post()
  create(@Body() body: any) {
    console.log('BODY RECEBIDO:', JSON.stringify(body, null, 2));
    return this.responsesService.create(body);
  }

  @Get()
  findAll() {
    return this.responsesService.findAll();
  }
}