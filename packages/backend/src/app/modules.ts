import { ActivityModule } from './activities/activities.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/categories.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './users/users.module';

export const TimeTrackerModules = [
  AuthModule,
  ActivityModule,
  CategoryModule,
  UsersModule,
  ResourcesModule,
];
