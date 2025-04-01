import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entity/user.entity';
import { Holiday } from '../database/entity/holiday.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Holiday])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
