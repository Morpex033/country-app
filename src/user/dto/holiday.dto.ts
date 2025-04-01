import { ApiProperty } from '@nestjs/swagger';

export class HolidayDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  localName: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  countryCode: string;
}
