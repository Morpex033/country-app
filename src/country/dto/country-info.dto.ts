import { ApiProperty } from '@nestjs/swagger';
import { BordersDto } from './borders.dto';
import { PopulationDto } from './population.dto';

export class CountryInfoDto {
  @ApiProperty({ type: BordersDto, isArray: true })
  borders: BordersDto[];

  @ApiProperty({ type: PopulationDto, isArray: true })
  population: PopulationDto[];

  @ApiProperty()
  flag: string;

  constructor(
    borders: BordersDto[],
    population: PopulationDto[],
    flag: string,
  ) {
    this.borders = borders;
    this.population = population;
    this.flag = flag;
  }
}
