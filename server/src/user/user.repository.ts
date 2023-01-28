import { UserUpdateDto } from './dto/user-update.dto';
import { AuthCredentialsDto } from './../auth/dto/auth-credentials.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';

import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username } = authCredentialsDto;

    const user = await this.getUserByUsername(username);

    if (user) {
      throw new ConflictException('Username already exist');
    }

    const usersCount = await this.countUsers();

    if (usersCount === 0) {
      const admin = {
        ...authCredentialsDto,
        role: 'ADMIN',
      };
      const newUser = new this.userModel(admin);
      return newUser.save();
    }
    const newUser = new this.userModel(authCredentialsDto);
    return newUser.save();
  }

  async getUserByUsername(username: string): Promise<User> {
    const candidate = await this.userModel.findOne({ username });
    return candidate;
  }

  async countUsers(): Promise<any> {
    const count = await this.userModel.count();
    return count;
  }

  async updateUser(
    id: Schema.Types.ObjectId,
    userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, {
      ...userUpdateDto,
    });
    return updatedUser;
  }

  async deleteUser(id: Schema.Types.ObjectId): Promise<{ message: string }> {
    await this.userModel.findByIdAndDelete(id);
    return { message: 'successfully deleted' };
  }
}
