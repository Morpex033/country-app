import { ApiProperty } from '@nestjs/swagger';
import { BordersDto } from './borders.dto';

export class CountryInfoRequestDto {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  commonName: string;

  @ApiProperty()
  officialName: string;

  @ApiProperty()
  region: string;

  @ApiProperty({ type: BordersDto, isArray: true })
  borders: BordersDto[];
}
