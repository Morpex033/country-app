import { ApiProperty } from '@nestjs/swagger';
import { HolidayDto } from './holiday.dto';

export class HolidayEntityDto {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  name: string;

  constructor(holiday: HolidayDto) {
    this.countryCode = holiday.countryCode;
    this.year = parseInt(holiday.date.split('-')[0]);
    this.name = holiday.name;
  }
}
