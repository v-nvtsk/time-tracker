import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
import {
  CategoryEntity,
  UserEntity,
  ActivityEntity,
  ResourceEntity,
} from '@TimeTracker/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity,
      UserEntity,
      ActivityEntity,
      ResourceEntity,
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
