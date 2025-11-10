import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return this.usersService.findById(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  updateProfile(@CurrentUser() user: any, @Body() updateDto: any) {
    return this.usersService.update(user.userId, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
