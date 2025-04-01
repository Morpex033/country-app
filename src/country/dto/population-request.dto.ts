import { ApiProperty } from '@nestjs/swagger';
import { PopulationDto } from './population.dto';

export class PopulationRequestDto {
  @ApiProperty()
  err: boolean;

  @ApiProperty()
  msg: string;

  @ApiProperty()
  data: {
    country: string;
    code: string;
    iso3: string;
    populationCounts: PopulationDto[];
  }[];
}
