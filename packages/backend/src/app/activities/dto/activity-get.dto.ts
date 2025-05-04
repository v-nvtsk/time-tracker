import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { ErrorResponseDto } from '@/types/error.response.dto';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ActivityEntity } from '@TimeTracker/entities';

class ResourceCategoryFieldDto {
  @ApiProperty({ example: 1, nullable: true })
  @IsNumber()
  @IsOptional()
  id: number | null;

  @ApiProperty({ example: 'Work', nullable: true })
  @IsString()
  @IsOptional()
  name: string | null;

  @ApiProperty({ example: 'neutral', nullable: false })
  @IsString()
  @IsOptional()
  type: string;
}

class ResourceFieldDto {
  @ApiProperty({ example: 1, nullable: true })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'example.com', nullable: true })
  @IsString()
  uri: string;

  @ApiProperty({ type: () => ResourceCategoryFieldDto, nullable: true })
  @IsOptional()
  category: ResourceCategoryFieldDto | null;
}

@ApiSchema({ name: 'ActivitySuccessResponse' })
export class ActivitySuccessResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ name: 'userId' })
  @Transform(({ obj }: { obj: ActivityEntity }) => obj.user?.id)
  @IsNumber()
  user: number;

  @ApiProperty({ name: 'resource', type: () => ResourceFieldDto })
  @Transform(({ obj }: { obj: ActivityEntity }) => ({
    id: obj.resource.id,
    uri: obj.resource.uri,
    category: {
      id: obj.resource.category?.id,
      name: obj.resource.category?.name,
      type: obj.resource.category?.type,
    },
  }))
  resource: string;

  @ApiProperty()
  timeSpent: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

@ApiSchema({ name: 'ActivityFailedResponse' })
export class ActivityFailedResponseDto extends ErrorResponseDto {
  constructor() {
    super(HttpStatus.NOT_FOUND);
  }
}
