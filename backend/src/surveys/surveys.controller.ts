import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Controller('surveys')
export class SurveysController {
  constructor(
    private readonly surveysService: SurveysService,
  ) {}


  @Get(':id')
 findOne(@Param('id') id: string) {
  return this.surveysService.findOne(Number(id));
}

   @Get()
  findAll() {
   return this.surveysService.findAll();
  }

  @Get(':id/results')
  getResults(@Param('id') id: string) {
  return this.surveysService.getResults(+id);
}

 @Post()
 create(@Body() body: CreateSurveyDto) {
  return this.surveysService.create(body);
}
}