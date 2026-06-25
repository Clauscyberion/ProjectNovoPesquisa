import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

class CreateQuestionDto {
  @IsString()
  text: string;
}

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}