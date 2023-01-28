import { AuthModule } from './../auth/auth.module';
import { UsersRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersRepository, UserService],
  exports: [UsersRepository],
  controllers: [UserController],
})
export class UserModule {}
