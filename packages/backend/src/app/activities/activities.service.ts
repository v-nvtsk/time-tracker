import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ActivityCreateRequestDto,
  ActivityCreateSuccessResponseDto,
} from './dto/activity-create.dto';
import { plainToInstance } from 'class-transformer';
import { ActivityUpdateRequestDto } from './dto/activity-update.dto';
import {
  ActivityEntity,
  UserEntity,
  CategoryEntity,
  ResourceEntity,
} from '@TimeTracker/entities';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ResourceEntity)
    private resourceRepository: Repository<ResourceEntity>,
  ) {
    dayjs.locale('ru');
  }

  async activityCreate(
    userId: number,
    createDto: ActivityCreateRequestDto,
  ): Promise<ActivityCreateSuccessResponseDto> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    let resource = await this.resourceRepository.findOne({
      where: { uri: createDto.resourceIdentifier },
      relations: ['category'],
    });
    if (!user) {
      throw new BadRequestException();
    }
    if (!resource) {
      resource = this.resourceRepository.create({
        uri: createDto.resourceIdentifier,
        user,
      });
      resource = await this.resourceRepository.save(resource);
    }
    const activity = this.activityRepository.create({
      ...createDto,
      resource,
      user,
    });
    const savedActivity = await this.activityRepository.save(activity);
    return plainToInstance(ActivityCreateSuccessResponseDto, savedActivity);
  }

  async activityFindAll(
    userId: number,
    period?: string,
    startDate?: string,
    endDate?: string,
  ): Promise<ActivityCreateSuccessResponseDto[]> {
    const query = this.activityRepository
      .createQueryBuilder('activity')
      .where('activity.userId = :userId', { userId })
      .leftJoinAndSelect('activity.resource', 'resource')
      .leftJoinAndSelect('resource.category', 'category');

    if (period) {
      const now = dayjs();
      switch (period) {
        case 'today':
          query.andWhere('activity.createdAt >= :start', {
            start: now.startOf('day').toDate(),
          });
          break;
        case 'week':
          query.andWhere('activity.createdAt >= :start', {
            start: now.startOf('week').toDate(),
          });
          break;
        case 'month':
          query.andWhere('activity.createdAt >= :start', {
            start: now.startOf('month').toDate(),
          });
          break;
        case 'year':
          query.andWhere('activity.createdAt >= :start', {
            start: now.startOf('year').toDate(),
          });
          break;
      }
    } else if (startDate && endDate) {
      query.andWhere('activity.createdAt BETWEEN :start AND :end', {
        start: new Date(startDate),
        end: new Date(endDate),
      });
    }

    const activities = await query.getMany();
    return plainToInstance(ActivityCreateSuccessResponseDto, activities);
  }

  async activityFindOne(userId: number, id: number) {
    const activity = await this.activityRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['category', 'user'],
    });
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
    return plainToInstance(ActivityCreateSuccessResponseDto, activity);
  }

  async activityUpdate(userId: number, activity: ActivityUpdateRequestDto) {
    const exists = await this.activityRepository.findOne({
      where: {
        id: activity.id,
        user: { id: userId },
      },
      relations: ['user'],
    });
    if (!exists) {
      throw new NotFoundException('Activity not found');
    }

    await this.activityRepository.update(
      { id: activity.id, user: { id: userId } },
      {
        ...exists,
        ...activity,
        updatedAt: new Date(),
      },
    );

    const updatedActivity = await this.activityRepository.findOne({
      where: { id: activity.id },
      relations: ['user', 'resource'],
    });
    return plainToInstance(ActivityCreateSuccessResponseDto, updatedActivity);
  }

  async activityDelete(userId: number, id: number) {
    const activity = await this.activityRepository.findOne({
      where: { id, user: { id: userId } },
    });
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
    await this.activityRepository.remove(activity);
  }
}
