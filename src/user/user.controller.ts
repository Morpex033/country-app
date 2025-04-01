import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { HolidayRequestDto } from './dto/holiday-request.dto';
import { UserDto } from './dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: UserDto })
  @Post('/:userId/calendar/holidays')
  addHolidaysToCalendar(
    @Param('userId', ParseUUIDPipe) id: string,
    @Body() request: HolidayRequestDto,
  ): Promise<UserDto> {
    return this.userService.addHolidaysToUser(id, request);
  }
}
