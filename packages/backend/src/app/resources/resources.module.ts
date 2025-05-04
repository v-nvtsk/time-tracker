import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CategoryEntity,
  UserEntity,
  ResourceEntity,
} from '@TimeTracker/entities';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, UserEntity, ResourceEntity]),
  ],
  controllers: [ResourcesController, ResourcesController],
  providers: [ResourcesService, UsersService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
