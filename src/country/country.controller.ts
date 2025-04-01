import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryCodePipe } from '../common/pipes/country-code.pipe';
import { CountryDto } from './dto/country.dto';
import { CountryInfoDto } from './dto/country-info.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiResponse({ type: CountryDto, isArray: true })
  @Get()
  countries(): Promise<CountryDto[]> {
    return this.countryService.getAllCountries();
  }

  @ApiResponse({ type: CountryInfoDto })
  @Get('/:countryCode')
  countryInfo(
    @Param('countryCode', CountryCodePipe) countryCode: string,
  ): Promise<CountryInfoDto> {
    return this.countryService.getCountryInfo(countryCode);
  }
}
