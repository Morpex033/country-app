import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', name: 'countryCode' })
  countryCode: string;

  @Column({ type: 'int', name: 'year' })
  year: number;

  @Column({ type: 'text', name: 'name' })
  name: string;

  @ManyToMany(() => User, (user) => user.holidays)
  users: User[];
}
