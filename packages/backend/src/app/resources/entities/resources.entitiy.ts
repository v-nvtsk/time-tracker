import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CategoryEntity, UserEntity } from '@TimeTracker/entities';

@Entity('resource')
export class ResourceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.activities)
  user: UserEntity;

  @Column({ unique: true })
  uri: string;

  @ManyToOne(() => CategoryEntity, (category) => category.resources)
  category: CategoryEntity | null;
}
