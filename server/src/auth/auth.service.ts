import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './../user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    authCredentialsDto = { ...authCredentialsDto, password: hashedPassword };

    return await this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // return await this.genAccesToken(user);
      return user;
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
