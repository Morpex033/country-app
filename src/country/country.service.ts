import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../database/entity/country.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CountryInfoRequestDto } from './dto/country-info-request.dto';
import { CountryDto } from './dto/country.dto';
import { BordersDto } from './dto/borders.dto';
import { CountryInfoDto } from './dto/country-info.dto';
import { ImageRequestDto } from './dto/image-request.dto';
import { ImageDto } from './dto/image.dto';
import { PopulationRequestDto } from './dto/population-request.dto';
import { PopulationDto } from './dto/population.dto';

@Injectable()
export class CountryService implements OnModuleInit {
  private readonly logger = new Logger(CountryService.name);

  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async onModuleInit() {
    await this.fetchCountry();
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  private async fetchCountry(): Promise<void> {
    try {
      const url: string = process.env.COUNTRY_URL || '';
      const response = await fetch(url);

      if (!response.ok) throw new InternalServerErrorException();

      const countries = (await response.json()) as Country[];

      for (const country of countries) {
        await this.countryRepository.save(country);
      }
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Failed to fetch country');
    }
  }

  async getAllCountries(): Promise<CountryDto[]> {
    try {
      const countries = await this.countryRepository.find();

      return countries.map((country) => new CountryDto(country));
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Failed to get countries');
    }
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfoDto> {
    try {
      const borders = await this.getCountryBorders(countryCode);

      const image = await this.getCountryImage(countryCode);

      const population = await this.getCountryPopulation(image.iso3);

      return new CountryInfoDto(borders, population, image.flag);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Failed to get countries info');
    }
  }

  private async getCountryBorders(countryCode: string): Promise<BordersDto[]> {
    try {
      const existCountry = await this.countryRepository.findOne({
        where: { countryCode },
      });

      if (!existCountry)
        throw new NotFoundException(
          `Country with this code ${countryCode} not found`,
        );

      const url: string =
        process.env.COUNTRY_INFO_URL + `/${countryCode}` || '';
      const response = await fetch(url);

      if (!response.ok) throw new InternalServerErrorException();

      const countryBorders = (await response.json()) as CountryInfoRequestDto;

      return countryBorders.borders;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Failed to get country bordes');
    }
  }

  private async getCountryImage(countryCode: string): Promise<ImageDto> {
    try {
      const existCountry = await this.countryRepository.findOne({
        where: { countryCode },
      });

      if (!existCountry)
        throw new NotFoundException(
          `Country with this code ${countryCode} not found`,
        );

      const url: string = process.env.COUNTRY_IMAGES_URL || '';
      const response = await fetch(url);

      if (!response.ok) throw new InternalServerErrorException();

      const countryImages: ImageRequestDto =
        (await response.json()) as ImageRequestDto;

      const image = countryImages.data.find(
        (image) => image.iso2 === countryCode,
      );

      if (!image) throw new NotFoundException('Flag not found');

      return image;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Failed to get country image');
    }
  }

  private async getCountryPopulation(iso3: string): Promise<PopulationDto[]> {
    try {
      const url: string = process.env.COUNTRY_POPULATION_URL || '';
      const response = await fetch(url);

      if (!response.ok) throw new InternalServerErrorException();

      const countryImages: PopulationRequestDto =
        (await response.json()) as PopulationRequestDto;

      const data = countryImages.data.find((country) => country.iso3 === iso3);

      if (!data) throw new NotFoundException('Flag not found');

      return data.populationCounts;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(
        'Failed to get country population data',
      );
    }
  }
}
