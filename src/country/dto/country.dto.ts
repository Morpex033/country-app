import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../../database/entity/country.entity';

export class CountryDto {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  name: string;

  constructor(country: Country) {
    this.countryCode = country.countryCode;
    this.name = country.name;
  }
}
