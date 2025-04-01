import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../database/entity/user.entity';
import { HolidayEntityDto } from './holiday-entity.dto';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: HolidayEntityDto, isArray: true })
  holidays: HolidayEntityDto[];

  constructor(user: User) {
    this.id = user.id;
    this.holidays = user.holidays;
  }
}
