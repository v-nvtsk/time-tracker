import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ActivityService } from './activities.service';
import {
  ActivityCreateRequestDto,
  ActivityCreateFailedResponseDto,
  ActivityCreateSuccessResponseDto,
} from './dto/activity-create.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { GetUser } from '@/decorators/get-user.decorator';
import { JwtPayload } from '@/types';
import {
  ActivityUpdateFailedResponseDto,
  ActivityUpdateRequestDto,
  ActivityUpdateSuccessResponseDto,
} from './dto/activity-update.dto';
import {
  ActivityFailedResponseDto,
  ActivitySuccessResponseDto,
} from './dto/activity-get.dto';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiOperation({
    operationId: 'findActivities',
    summary: 'Получение всех активностей',
    description:
      'Возвращает список активностей, созданных текущим авторизованным пользователем',
  })
  @ApiOkResponse({
    type: [ActivitySuccessResponseDto],
  })
  @ApiNotFoundResponse({
    description: 'Активности не найдено',
    type: ActivityFailedResponseDto,
  })
  @ApiQuery({
    name: 'period',
    enum: ['today', 'week', 'month', 'year'],
    required: false,
  })
  @ApiQuery({
    name: 'startDate',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    required: false,
  })
  @Get()
  findAll(
    @GetUser() user: JwtPayload,
    @Query('period') period?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<ActivitySuccessResponseDto[]> {
    return this.activityService.activityFindAll(
      user.sub,
      period,
      startDate,
      endDate,
    );
  }

  @ApiOperation({
    operationId: 'findActivity',
    summary: 'Получение активности по её id',
    description:
      'Возвращает активность по id, если она создана текущим авторизованным пользователем',
  })
  @Get(':id')
  @ApiOkResponse({
    type: ActivitySuccessResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Активности не найдено',
    type: ActivityFailedResponseDto,
  })
  findOne(
    @GetUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ActivitySuccessResponseDto> {
    return this.activityService.activityFindOne(user.sub, id);
  }

  @ApiOperation({
    operationId: 'createActivity',
    summary: 'Создание новой активности',
    description:
      'Создаёт новую активность для текущего авторизованного пользователя',
  })
  @Post()
  @ApiCreatedResponse({
    description: 'Активность успешно создана',
    type: ActivityCreateSuccessResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Активность не создана',
    type: ActivityCreateFailedResponseDto,
  })
  async create(
    @GetUser() user: JwtPayload,
    @Body() createDto: ActivityCreateRequestDto,
  ) {
    return await this.activityService.activityCreate(user.sub, createDto);
  }

  @ApiOperation({
    operationId: 'updateActivity',
    summary: 'Изменяет свойства активности',
    description:
      'Изменяет свойства активности, если она была создана текущим авторизованным пользователем',
  })
  @ApiBody({
    type: ActivityUpdateRequestDto,
    schema: {
      example: {
        id: 1,
        categoryId: 1,
        description: 'watching videos',
      },
    },
  })
  @ApiOkResponse({
    description: 'Активность успешно обновлена',
    type: ActivityUpdateSuccessResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Активность не найдена',
    type: ActivityUpdateFailedResponseDto,
  })
  @Put()
  update(
    @GetUser() user: JwtPayload,
    @Body() activity: ActivityUpdateRequestDto,
  ) {
    return this.activityService.activityUpdate(user.sub, activity);
  }

  @ApiOperation({
    operationId: 'deleteActivity',
    summary: 'Удаляет активность по её id',
    description:
      'Удаляет активность, если она была создана текущим авторизованным пользователем',
  })
  @ApiOkResponse({
    description: 'Активность успешно удалена',
  })
  @ApiNotFoundResponse({
    description: 'Активность не найдена',
  })
  @Delete(':id')
  delete(@GetUser() user: JwtPayload, @Param('id', ParseIntPipe) id: number) {
    return this.activityService.activityDelete(user.sub, id);
  }
}
