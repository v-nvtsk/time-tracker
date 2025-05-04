import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from '@/decorators/get-user.decorator';
import { JwtPayload } from '@/types';
import {
  ResourceDeleteFailedResponseDto,
  ResourceDeleteRequestDto,
  ResourceDeleteSuccessResponseDto,
  ResourceFailedResponseDto,
  ResourceSuccessResponseDto,
  ResourceUpdateFailedResponseDto,
  ResourceUpdateRequestDto,
  ResourceUpdateSuccessResponseDto,
} from './resources.dto';

@ApiTags('Resources')
@Controller('resources')
@UseInterceptors(ClassSerializerInterceptor)
export class ResourcesController {
  constructor(private readonly resourceService: ResourcesService) {}

  @ApiOperation({
    operationId: 'findAll',
    summary: 'Получение всех ресурсов',
    description: 'Возвращает все ресурсы',
  })
  @ApiOkResponse({
    description: 'Список ресурсов',
    type: ResourceSuccessResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: ResourceFailedResponseDto,
  })
  @Get()
  findAll(@GetUser() user: JwtPayload) {
    return this.resourceService.findAll(user.sub);
  }

  @ApiOperation({
    operationId: 'findOne',
    summary: 'Получение ресурса по id',
    description: 'Возвращает ресурс по id',
  })
  @ApiOkResponse({
    description: 'Возвращает ресурс с категорией',
    type: ResourceSuccessResponseDto,
    isArray: true,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'id ресурса',
  })
  @ApiNotFoundResponse({
    type: ResourceFailedResponseDto,
  })
  @Get(':id')
  findOne(@GetUser() user: JwtPayload, @Param('id', ParseIntPipe) id: number) {
    return this.resourceService.findOne(user.sub, id);
  }

  @ApiOperation({
    operationId: 'updateResource',
    summary: 'Обновление ресурса',
    description: 'Обновляет ресурс',
  })
  @ApiOkResponse({
    description: 'Ресурс обновлен',
    type: ResourceUpdateSuccessResponseDto,
  })
  @ApiNotFoundResponse({
    type: ResourceUpdateFailedResponseDto,
  })
  @Put()
  updateResource(
    @GetUser() user: JwtPayload,
    @Body() body: ResourceUpdateRequestDto,
  ) {
    return this.resourceService.update(user.sub, body);
  }

  @ApiOperation({
    operationId: 'deleteResource',
    summary: 'Удаление ресурса',
    description: 'Удаляет ресурс по id',
  })
  @ApiOkResponse({
    description: 'Ресурс удален',
    type: ResourceDeleteSuccessResponseDto,
  })
  @ApiNotFoundResponse({
    type: ResourceDeleteFailedResponseDto,
  })
  @Delete()
  deleteResource(
    @GetUser() user: JwtPayload,
    @Body() { id }: ResourceDeleteRequestDto,
  ) {
    return this.resourceService.delete(user.sub, id);
  }
}
