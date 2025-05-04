import { ApiSchema } from '@nestjs/swagger';
import { ErrorResponseDto } from '@/types/error.response.dto';
import { HttpStatus } from '@nestjs/common';
import { CategorySuccessResponseDto } from './category-get.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ActivityType } from '@/types/activity.types';

@ApiSchema({ name: 'CategoryCreateRequest' })
export class CategoryCreateRequestDto {
  @IsString()
  name: string;

  @IsEnum(ActivityType)
  @IsOptional()
  type?: ActivityType = ActivityType.Neutral;
}

@ApiSchema({ name: 'CategoryCreateSuccessResponse' })
export class CategoryCreateSuccessResponseDto extends CategorySuccessResponseDto {}

@ApiSchema({ name: 'CategoryCreateErrorResponse' })
export class CategoryCreateFailedResponseDto extends ErrorResponseDto {
  constructor() {
    super(HttpStatus.BAD_REQUEST);
  }
}
