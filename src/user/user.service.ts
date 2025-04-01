import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { Holiday } from '../database/entity/holiday.entity';
import { HolidayRequestDto } from './dto/holiday-request.dto';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { HolidayDto } from './dto/holiday.dto';
import { HolidayEntityDto } from './dto/holiday-entity.dto';
import { UserDto } from './dto/user.dto';

dotenvConfig({ path: '.env' });

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
  ) {}

  async addHolidaysToUser(
    id: string,
    request: HolidayRequestDto,
  ): Promise<UserDto> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.holidays', 'holidays')
        .where('user.id = :id', { id })
        .getOne();

      if (!user) throw new NotFoundException('User not found');

      const url =
        join(
          process.env.HOLIDAYS_URL as string,
          request.year.toString(),
          request.countryCode,
        ) || '';
      const response = await fetch(url);

      if (!response.ok) throw new InternalServerErrorException('Incorrect url');

      const holidays = (await response.json()) as HolidayDto[];

      const searchPattern = request.holidays.join('|');

      const result = holidays.filter(
        (holiday) =>
          searchPattern.match(holiday.name) ||
          searchPattern.match(holiday.localName),
      );

      for (const holiday of result) {
        const savedHoliday = await this.holidayRepository.save(
          new HolidayEntityDto(holiday),
        );
        user.holidays.push(savedHoliday);
        await this.userRepository.save(user);
      }

      return new UserDto(user);
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(
        'Failed to add holidays into calendar',
      );
    }
  }
}
