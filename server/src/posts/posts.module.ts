import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from './posts.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
