import { UserUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from './user.schema';
import { Schema } from 'mongoose';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Put('/')
  updateUser(
    @Body() userUpdateDto: UserUpdateDto,
    @GetUser() user: User,
  ): Promise<{ accessToken: string; updatedUser: User }> {
    return this.userService.updateUser(user._id, userUpdateDto);
  }

  @Delete('/')
  deleteUser(@GetUser() user: User): Promise<{ message: string }> {
    return this.userService.deleteUser(user._id);
  }

  @Get('/')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put('/addfriend')
  addFriend(@Body() friend: any, @GetUser() user: User) {
    return this.userService.addFriend(friend.friendId, user);
  }
}
