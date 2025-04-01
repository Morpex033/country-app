import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  flag: string;

  @ApiProperty()
  iso2: string;

  @ApiProperty()
  iso3: string;
}
