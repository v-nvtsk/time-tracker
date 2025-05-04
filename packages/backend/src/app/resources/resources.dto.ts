import { IsNumber, IsString } from 'class-validator';
import { CategoryEntity, ResourceEntity } from '@TimeTracker/entities';
import { ApiHideProperty, ApiProperty, ApiSchema } from '@nestjs/swagger';
import { CategorySuccessResponseDto } from '../categories/dto/category-get.dto';
import { Exclude, Transform } from 'class-transformer';
import { ErrorResponseDto } from '@/types/error.response.dto';

@ApiSchema({ name: 'ResourceCreateRequest' })
export class ResourceCreateRequestDto {
  @ApiProperty()
  @IsString()
  uri: string;

  @ApiProperty()
  @IsNumber()
  categoryId: CategoryEntity['id'];
}

@ApiSchema({ name: 'ResourceUpdateRequest' })
export class ResourceUpdateRequestDto {
  @ApiProperty()
  @IsString()
  uri: string;

  @IsNumber()
  categoryId: CategoryEntity['id'];
}

@ApiSchema({ name: 'ResourceDeleteRequest' })
export class ResourceDeleteRequestDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}

@ApiSchema({ name: 'ResourceSuccessResponse' })
export class ResourceSuccessResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  uri: string;

  @ApiHideProperty()
  @Exclude()
  user: never;

  @ApiProperty({ name: 'category', type: () => CategorySuccessResponseDto })
  @Transform(({ obj }: { obj: ResourceEntity }) => ({
    id: obj.category?.id,
    name: obj.category?.name,
    type: obj.category?.type,
  }))
  category;
}

@ApiSchema({ name: 'ResourceFailedResponse' })
export class ResourceFailedResponseDto extends ErrorResponseDto {}

@ApiSchema({ name: 'ResourceSuccessCreateResponse' })
export class ResourceCreateSuccessResponseDto extends ResourceSuccessResponseDto {}

@ApiSchema({ name: 'ResourceUpdateSuccessResponse' })
export class ResourceUpdateSuccessResponseDto extends ResourceSuccessResponseDto {}

@ApiSchema({ name: 'ResourceCreateFailedResponse' })
export class ResourceCreateFailedResponseDto extends ErrorResponseDto {}

@ApiSchema({ name: 'ResourceUpdateFailedResponse' })
export class ResourceUpdateFailedResponseDto extends ErrorResponseDto {}

@ApiSchema({ name: 'ResourceDeleteSuccessResponse' })
export class ResourceDeleteSuccessResponseDto {}

@ApiSchema({ name: 'ResourceDeleteFailedResponse' })
export class ResourceDeleteFailedResponseDto extends ErrorResponseDto {}
