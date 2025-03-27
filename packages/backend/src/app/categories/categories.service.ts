import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CategoryCreateRequestDto,
  CategoryCreateSuccessResponseDto,
} from './dto/category-create.dto';
import { CategorySuccessResponseDto } from './dto/category-get.dto';
import { plainToInstance } from 'class-transformer';
import {
  CategoryUpdateRequestDto,
  CategoryUpdateSuccessResponseDto,
} from './dto/category-update.dto';
import { checkPassword } from '@/utils/password';
import { ActivityType } from '@/types/activity.types';
import {
  ResourceEntity,
  CategoryEntity,
  UserEntity,
  ActivityEntity,
} from '@TimeTracker/entities';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>,
    @InjectRepository(ResourceEntity)
    private resourceRepository: Repository<ResourceEntity>,
  ) {}

  async categoryCreate(
    userId: number,
    createDto: CategoryCreateRequestDto,
  ): Promise<CategoryCreateSuccessResponseDto> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException();
    }
    const category = this.categoryRepository.create({
      ...createDto,
      user,
    });
    const savedCategory = await this.categoryRepository.save(category);
    return plainToInstance(CategoryCreateSuccessResponseDto, savedCategory);
  }

  async categoryFindAllByUser(userId: number) {
    const categories = await this.categoryRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    return plainToInstance(CategorySuccessResponseDto, categories);
  }

  async categoryFindOne(
    id: number,
    userId: number,
  ): Promise<CategorySuccessResponseDto> {
    const category = await this.categoryRepository.findOneOrFail({
      where: { id, user: { id: userId } },
    });
    return plainToInstance(CategorySuccessResponseDto, category);
  }

  async categoryUpdate(
    userId: number,
    category: CategoryUpdateRequestDto,
  ): Promise<CategoryUpdateSuccessResponseDto> {
    const categoryToUpdate = await this.categoryRepository.findOneOrFail({
      where: { id: category.id, user: { id: userId } },
    });
    const savedCategory = await this.categoryRepository.save({
      ...categoryToUpdate,
      ...category,
    });
    return plainToInstance(CategoryUpdateSuccessResponseDto, savedCategory);
  }

  async categoryDelete(userId: number, id: number) {
    const category = await this.categoryRepository.findOneOrFail({
      where: { id, user: { id: userId } },
    });

    await this.updateActivitiesOnCategoryDelete(id, userId);

    await this.categoryRepository.remove(category);
  }

  private async updateActivitiesOnCategoryDelete(
    categoryId: number,
    userId: number,
  ) {
    const resources = await this.resourceRepository.find({
      where: { category: { id: categoryId }, user: { id: userId } },
      relations: ['category', 'user'],
    });

    for (const resource of resources) {
      resource.category = null;
      await this.activityRepository.save(resource);
    }
  }

  async initDefaultCategories(
    userId: number,
  ): Promise<CategoryCreateSuccessResponseDto[]> {
    const defaultCategories = [
      {
        name: 'Productive',
        type: ActivityType.Productive,
      },
      {
        name: 'Neutral',
        type: ActivityType.Neutral,
      },
      {
        name: 'Distracting',
        type: ActivityType.Distracting,
      },
    ];

    for (const category of defaultCategories) {
      await this.categoryCreate(userId, category);
    }

    return this.categoryFindAllByUser(userId);
  }

  async resetCategories(userId: number, payload: { password: string }) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user || !checkPassword(payload.password, user.password)) {
      throw new UnauthorizedException('Login failed');
    }

    return await this.categoryRepository.delete({ user: { id: userId } });
  }
}
