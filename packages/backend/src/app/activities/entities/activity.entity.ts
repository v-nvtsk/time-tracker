import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity, ResourceEntity } from '@TimeTracker/entities';
import { ActivityType } from '@/types/activity.types';

@Entity('activity')
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.activities)
  user: UserEntity;

  @ManyToOne(() => ResourceEntity)
  resource: ResourceEntity;

  @Column({
    enum: ActivityType,
    nullable: true,
    default: ActivityType.Neutral,
  })
  type: string;

  @Column()
  timeSpent: number;

  @Column()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
