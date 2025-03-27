import { ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ErrorResponseDto } from '@/types/error.response.dto';
import { HttpStatus } from '@nestjs/common';
import { ActivitySuccessResponseDto } from './activity-get.dto';

@ApiSchema({ name: 'ActivityUpdateRequest' })
export class ActivityUpdateRequestDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  description: string = '';
}

@ApiSchema({ name: 'ActivityUpdateSuccessResponse' })
export class ActivityUpdateSuccessResponseDto extends ActivitySuccessResponseDto {}

@ApiSchema({ name: 'ActivityUpdateFailedResponse' })
export class ActivityUpdateFailedResponseDto extends ErrorResponseDto {
  constructor() {
    super(HttpStatus.NOT_FOUND);
  }
}
