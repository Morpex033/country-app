import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryColumn()
  countryCode: string;

  @Column({ type: 'text', name: 'name' })
  name: string;
}
