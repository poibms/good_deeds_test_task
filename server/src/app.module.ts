import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: 'mongodb+srv://good_deeds:good_deeds12345678@cluster0.otjxjdy.mongodb.net/?retryWrites=true&w=majority',
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
