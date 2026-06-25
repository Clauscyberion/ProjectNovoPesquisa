import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResponsesService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.response.findMany({
      include: {
        question: true,
      },
    });
  }



 async create(data: any) {
    console.log('DATA NO SERVICE:', JSON.stringify(data, null, 2));
  return this.prisma.response.createMany({
    data: data.answers.map((item) => ({
      questionId: item.questionId,
      answer: item.answer,
    })),
  });
}
}