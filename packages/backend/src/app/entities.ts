import { ActivityEntity } from './activities/entities/activity.entity';
import { CategoryEntity } from './categories/entities/category.entity';
import { UserEntity } from './users/entities/user.entity';
import { ResourceEntity } from './resources/entities/resources.entitiy';

export const TimeTrackerEntities = [
  ActivityEntity,
  UserEntity,
  CategoryEntity,
  ResourceEntity,
];

export { ActivityEntity, UserEntity, CategoryEntity, ResourceEntity };
