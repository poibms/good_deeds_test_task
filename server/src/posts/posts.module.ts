import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Posts, PostsSchema } from './posts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Posts.name, schema: PostsSchema }]),
  ],
})
export class PostsModule {}
