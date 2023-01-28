import { UserUpdateDto } from './dto/user-update.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { User } from './user.schema';
import { Schema } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  async updateUser(
    id: Schema.Types.ObjectId,
    userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    return await this.usersRepository.updateUser(id, userUpdateDto);
  }

  async deleteUser(id: Schema.Types.ObjectId): Promise<{ message: string }> {
    return await this.usersRepository.deleteUser(id);
  }

  async getAllUsers() {
    const users = await this.usersRepository.getAllUsers();
    return users;
  }

  async addFriend(friendId: any, user: User): Promise<any> {
    return await this.usersRepository.addFriend(friendId, user);
  }
}
