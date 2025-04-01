import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Holiday } from './holiday.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Holiday, (holiday) => holiday.users)
  @JoinTable()
  holidays: Holiday[];
}
