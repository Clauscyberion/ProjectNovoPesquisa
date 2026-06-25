import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';

@Injectable()
export class SurveysService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.survey.findMany();
  }

  async findOne(id: number) {
  return this.prisma.survey.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
    },
  });
}


  async getResults(id: number) {
  return this.prisma.survey.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        include: {
          responses: true,
        },
      },
    },
  });
}



  async create(data: CreateSurveyDto) {
    console.log('DATA NO SERVICE:', data);

    if (!data) {
      throw new Error('DATA ESTÁ UNDEFINED');
    }

    return this.prisma.survey.create({
    data: {
      title: data.title,
      description: data.description,

      questions: {
        create: data.questions.map((question) => ({
          text: question.text,
        })),
      },
    },

    include: {
      questions: true,
    },
  });
  }
}