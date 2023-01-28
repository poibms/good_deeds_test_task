import { AuthCredentialsDto } from './../auth/dto/auth-credentials.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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

    const newUser = new this.userModel(authCredentialsDto);
    return newUser.save();
  }

  async getUserByUsername(username: string): Promise<User> {
    const candidate = await this.userModel.findOne({ username });
    return candidate;
  }
}
