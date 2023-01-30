import { UserUpdateDto } from './dto/user-update.dto';
import { AuthCredentialsDto } from './../auth/dto/auth-credentials.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Schema } from 'mongoose';

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
    return await newUser.save();
  }

  async getUserByUsername(username: string): Promise<User> {
    const candidate = await this.userModel.findOne({ username });
    return candidate;
  }

  async countUsers(): Promise<number> {
    const count = await this.userModel.count();
    return count;
  }

  async updateUser(
    id: Schema.Types.ObjectId,
    userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    await this.userModel.findByIdAndUpdate(id, {
      ...userUpdateDto,
    });

    const updatedUser = await this.getUserById(id);
    return updatedUser;
  }

  async getUserById(id: Schema.Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(id, '-password -field');

    if (!user) {
      throw new BadRequestException(`There is no user with such id: ${id}`);
    }

    return user;
  }

  async deleteUser(id: Schema.Types.ObjectId): Promise<{ message: string }> {
    await this.userModel.findByIdAndDelete(id);
    return { message: 'successfully deleted' };
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find({}, '-password -field');
  }

  async addFriend(friendId: Schema.Types.ObjectId, user: User): Promise<User> {
    try {
      const checkUser = await this.getUserById(user._id);

      if (checkUser.friends.find((friend) => friend == friendId)) {
        throw new BadRequestException('This user is already your friend');
      }

      const currentUser = await this.userModel.findByIdAndUpdate(
        { _id: user._id },
        { $push: { friends: friendId } },
      );

      const friend = await this.userModel.findByIdAndUpdate(
        { _id: friendId },
        { $push: { friends: user._id } },
      );

      return await this.userModel.findById(user._id);
    } catch (e) {
      throw new BadRequestException('This user is already your friend');
    }
  }
}
