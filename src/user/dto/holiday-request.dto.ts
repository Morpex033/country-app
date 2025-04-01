import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class HolidayRequestDto {
  @ApiProperty()
  @IsString()
  countryCode: string;

  @IsNumber()
  @ApiProperty()
  year: number;

  @ApiProperty({ isArray: true })
  @IsArray()
  @IsString({ each: true })
  holidays: string[];
}
