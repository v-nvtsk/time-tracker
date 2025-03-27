import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import {
  ResourceCreateRequestDto,
  ResourceSuccessResponseDto,
  ResourceUpdateRequestDto,
  ResourceUpdateSuccessResponseDto,
} from './resources.dto';
import { CategoryEntity, ResourceEntity } from '@TimeTracker/entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private resourceRepository: Repository<ResourceEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    private userService: UsersService,
  ) {}

  async getUser(userId: number) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async findAll(userId: number): Promise<ResourceSuccessResponseDto[]> {
    const user = await this.getUser(userId);
    const result = await this.resourceRepository.find({
      where: { user: { id: user.id } },
      relations: ['category'],
    });
    return plainToInstance(ResourceSuccessResponseDto, result);
  }

  async update(
    userId: number,
    resource: ResourceUpdateRequestDto,
  ): Promise<ResourceUpdateSuccessResponseDto> {
    const user = await this.getUser(userId);
    const resourceToUpdate = await this.resourceRepository.findOneBy({
      uri: resource.uri,
      user: { id: user.id },
    });

    if (!resourceToUpdate) {
      throw new NotFoundException();
    }

    const category = await this.categoryRepository.findOneBy({
      id: resource.categoryId,
    });
    resourceToUpdate.user = user;
    resourceToUpdate.category = category;
    await this.resourceRepository.update(resourceToUpdate.id, resourceToUpdate);

    const updatedResource = await this.resourceRepository.findOne({
      where: { id: resourceToUpdate.id },
      relations: ['category'],
    });

    return plainToInstance(ResourceUpdateSuccessResponseDto, updatedResource);
  }

  async findOne(
    userId: number,
    id: number,
  ): Promise<ResourceSuccessResponseDto> {
    const user = await this.getUser(userId);
    const result = await this.resourceRepository.findOne({
      where: { id, user },
    });
    return plainToInstance(ResourceSuccessResponseDto, result);
  }

  async create(resource: ResourceCreateRequestDto): Promise<ResourceEntity> {
    const record = this.resourceRepository.create(resource);
    const result = await this.resourceRepository.save(record);

    return plainToInstance(ResourceSuccessResponseDto, result);
  }

  async delete(userId: number, id: number): Promise<void> {
    const user = await this.getUser(userId);
    await this.resourceRepository.delete({ id, user: { id: user.id } });
  }
}
