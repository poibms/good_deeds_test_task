import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './../user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.schema';
import { JwtPayload } from './dto/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    authCredentialsDto = { ...authCredentialsDto, password: hashedPassword };

    const user = await this.usersRepository.createUser(authCredentialsDto);
    return await this.genAccesToken(user);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const user = await this.usersRepository.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return await this.genAccesToken(user);
      // return user;
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }

  private async genAccesToken(user: User): Promise<{ accessToken: string }> {
    const payload: JwtPayload = { username: user.username };
    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
