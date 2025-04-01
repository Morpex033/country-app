import { ApiProperty } from '@nestjs/swagger';

export class PopulationDto {
  @ApiProperty()
  year: number;

  @ApiProperty()
  value: number;
}
