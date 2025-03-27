import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity, ResourceEntity } from '@TimeTracker/entities';
import { ActivityType } from '@/types/activity.types';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;

  @Column()
  name: string;

  @Column({
    enum: ActivityType,
    default: ActivityType.Neutral,
  })
  type: ActivityType;

  @OneToMany(() => ResourceEntity, (resource) => resource.category)
  resources: ResourceEntity[];
}
