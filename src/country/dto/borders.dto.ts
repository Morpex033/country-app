import { ApiProperty } from '@nestjs/swagger';

export class BordersDto {
  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  commonName: string;

  @ApiProperty()
  officialName: string;

  @ApiProperty()
  region: string;
}
