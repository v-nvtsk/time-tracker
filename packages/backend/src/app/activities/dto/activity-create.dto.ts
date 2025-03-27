import { ApiSchema } from '@nestjs/swagger';
import { ErrorResponseDto } from '@/types/error.response.dto';
import { HttpStatus } from '@nestjs/common';
import { ActivitySuccessResponseDto } from './activity-get.dto';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ResourceType } from '@/types/activity.types';

@ApiSchema({ name: 'ActivityCreateRequest' })
export class ActivityCreateRequestDto {
  @IsString()
  resourceIdentifier: string;

  @IsNumber()
  timeSpent: number = 0;

  @IsString()
  description: string;

  @IsEnum(ResourceType)
  resourceType?: ResourceType = ResourceType.Web;
}

@ApiSchema({ name: 'ActivityCreateSuccessResponse' })
export class ActivityCreateSuccessResponseDto extends ActivitySuccessResponseDto {}

@ApiSchema({ name: 'ActivityFailedResponse' })
export class ActivityCreateErrorResponseDto extends ErrorResponseDto {
  constructor() {
    super(HttpStatus.NOT_FOUND);
  }
}

@ApiSchema({ name: 'ActivityCreateFailedResponse' })
export class ActivityCreateFailedResponseDto extends ErrorResponseDto {
  constructor() {
    super(HttpStatus.BAD_REQUEST);
  }
}
