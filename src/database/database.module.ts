import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProvider } from './database.provider';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...databaseProvider, autoLoadEntities: true }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
