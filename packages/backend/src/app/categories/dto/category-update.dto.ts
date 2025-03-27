import { ApiSchema } from '@nestjs/swagger';
import {
  CategoryCreateRequestDto,
  CategoryCreateSuccessResponseDto,
} from './category-create.dto';
import { ErrorResponseDto } from '@/types/error.response.dto';
import { HttpStatus } from '@nestjs/common';
import { IsNumber } from 'class-validator';

@ApiSchema({ name: 'CategoryUpdateRequest' })
export class CategoryUpdateRequestDto extends CategoryCreateRequestDto {
  @IsNumber()
  id: number;
}

@ApiSchema({ name: 'CategoryUpdateSuccessResponse' })
export class CategoryUpdateSuccessResponseDto extends CategoryCreateSuccessResponseDto {}

@ApiSchema({ name: 'CategoryUpdateErrorResponse' })
export class CategoryUpdateFailedResponseDto extends ErrorResponseDto {
  constructor() {
    super(HttpStatus.NOT_FOUND);
  }
}
