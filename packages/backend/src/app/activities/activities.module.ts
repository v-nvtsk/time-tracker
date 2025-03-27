import { Module } from '@nestjs/common';
import { ActivityController } from './activities.controller';
import { ActivityService } from './activities.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ActivityEntity,
  UserEntity,
  CategoryEntity,
  ResourceEntity,
} from '@TimeTracker/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityEntity,
      UserEntity,
      CategoryEntity,
      ResourceEntity,
    ]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
