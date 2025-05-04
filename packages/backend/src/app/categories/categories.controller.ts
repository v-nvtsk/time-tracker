import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import {
  CategoryCreateFailedResponseDto,
  CategoryCreateRequestDto,
  CategoryCreateSuccessResponseDto,
} from './dto/category-create.dto';
import { GetUser } from '@/decorators/get-user.decorator';
import { JwtPayload } from '@/types';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CategoryUpdateFailedResponseDto,
  CategoryUpdateRequestDto,
  CategoryUpdateSuccessResponseDto,
} from './dto/category-update.dto';
import {
  CategoryFailedResponseDto,
  CategorySuccessResponseDto,
} from './dto/category-get.dto';
import { AuthLoginRequestDto } from '../auth/auth.dto';

@ApiTags('Categories')
@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({
    operationId: 'findCategories',
    summary: 'Получение всех категорий',
    description:
      'Возвращает список категорий, созданных текущим авторизованным пользователем',
  })
  @ApiOkResponse({
    description: 'Список категорий',
    type: CategorySuccessResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: CategoryFailedResponseDto,
  })
  @Get()
  async findAll(
    @GetUser() user: JwtPayload,
  ): Promise<CategorySuccessResponseDto[]> {
    return this.categoryService.categoryFindAllByUser(user.sub);
  }

  @ApiOperation({
    operationId: 'findCategory',
    summary: 'Получение категории по её id',
    description:
      'Возвращает категорию по id, если она создана текущим авторизованным пользователем',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'id категории',
  })
  @ApiOkResponse({
    type: CategorySuccessResponseDto,
    description: 'Категория по id для текущего пользователя',
  })
  @ApiNotFoundResponse({
    type: CategoryFailedResponseDto,
  })
  @Get(':id')
  findOne(
    @GetUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategorySuccessResponseDto> {
    return this.categoryService.categoryFindOne(id, user.sub);
  }

  @ApiOperation({
    operationId: 'updateCategory',
    summary: 'Изменяет свойства категории',
    description:
      'Изменяет свойства категории, если она была создана текущим авторизованным пользователем',
  })
  @ApiBody({
    type: CategoryUpdateRequestDto,
  })
  @ApiOkResponse({
    type: CategoryUpdateSuccessResponseDto,
    description: 'Категория обновлена',
  })
  @ApiNotFoundResponse({
    type: CategoryUpdateFailedResponseDto,
  })
  @Put()
  update(
    @GetUser() user: JwtPayload,
    @Body() category: CategoryUpdateRequestDto,
  ) {
    return this.categoryService.categoryUpdate(user.sub, category);
  }

  @ApiOperation({
    operationId: 'initDefault',
    summary: 'Создание новых категорий по-умолчанию',
    description:
      'Создаёт новые категории по-умолчанию для текущего авторизованного пользователя',
  })
  @ApiCreatedResponse({
    description: 'Категории создана',
    type: [CategoryCreateSuccessResponseDto],
  })
  @ApiConflictResponse({
    description: 'Категории уже существует',
    type: CategoryCreateFailedResponseDto,
  })
  @Post('init-default')
  async initDefault(
    @GetUser() user: JwtPayload,
  ): Promise<CategoryCreateSuccessResponseDto[]> {
    return this.categoryService.initDefaultCategories(user.sub);
  }

  @ApiOperation({
    operationId: 'createCategory',
    summary: 'Создание новой категории',
    description:
      'Создаёт новую категорию для текущего авторизованного пользователя',
  })
  @ApiBody({
    type: CategoryCreateRequestDto,
  })
  @ApiCreatedResponse({
    description: 'Категория создана',
    type: CategoryCreateSuccessResponseDto,
  })
  @ApiConflictResponse({
    description: 'Категория с таким именем уже существует',
    type: CategoryCreateFailedResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
    type: CategoryCreateFailedResponseDto,
  })
  @Post()
  create(
    @GetUser() user: JwtPayload,
    @Body() createDto: CategoryCreateRequestDto,
  ) {
    return this.categoryService.categoryCreate(user.sub, createDto);
  }

  @ApiOperation({
    operationId: 'resetCategories',
    summary: 'Удаляет все категории',
    description:
      'Удаляет все категории, если они были создана текущим авторизованным пользователем',
  })
  @ApiBody({
    required: true,
    type: AuthLoginRequestDto,
  })
  @ApiOkResponse({
    description: 'Все категории успешно удалены',
  })
  @ApiNotFoundResponse({
    description: 'Категорий не найдено',
  })
  @Delete('reset')
  async resetCategories(
    @GetUser() user: JwtPayload,
    @Body() body: AuthLoginRequestDto,
  ) {
    return await this.categoryService.resetCategories(user.sub, body);
  }

  @ApiOperation({
    operationId: 'deleteCategory',
    summary: 'Удаляет категорию',
    description:
      'Удаляет категорию, если она была создана текущим авторизованным пользователем',
  })
  @ApiOkResponse({
    description: 'Категория успешно удалена включая возможные подкатегории',
  })
  @ApiNotFoundResponse({
    description: 'Категория не найдена',
  })
  @Delete(':id')
  delete(@GetUser() user: JwtPayload, @Param('id', ParseIntPipe) id: number) {
    return this.categoryService.categoryDelete(user.sub, id);
  }
}
