import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { ErrorResponseDto } from '@/types/error.response.dto';
import { HttpStatus } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { CategoryEntity } from '@TimeTracker/entities';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ActivityType } from '@/types/activity.types';

@ApiSchema({ name: 'CategorySuccessResponse' })
export class CategorySuccessResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty({ name: 'userId' })
  @Transform(({ obj }: { obj: CategoryEntity }) => obj.user?.id)
  @IsNumber()
  user: number;

  @IsString()
  name: string;

  @IsEnum(ActivityType)
  @IsOptional()
  type? = ActivityType.Neutral;
}

@ApiSchema({ name: 'CategoryErrorResponse' })
export class CategoryFailedResponseDto extends ErrorResponseDto {
  constructor() {
    super(HttpStatus.NOT_FOUND);
  }
}
