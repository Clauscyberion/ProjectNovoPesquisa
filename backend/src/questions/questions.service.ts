import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(data: any) {
    return this.prisma.question.create({
      data: {
        text: data.text,
        surveyId: data.surveyId,
      },
    });
  }

  async findAll() {
    return this.prisma.question.findMany();
  }
}