import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CountryModule } from './country/country.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DatabaseModule,
    CountryModule,
    ScheduleModule.forRoot(),
    UserModule,
  ],
})
export class AppModule {}
