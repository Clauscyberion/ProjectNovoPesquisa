import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveysModule } from './surveys/surveys.module';
import { QuestionsModule } from './questions/questions.module';
import { ResponsesModule } from './responses/responses.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [SurveysModule, QuestionsModule, ResponsesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
