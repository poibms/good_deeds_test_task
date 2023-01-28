import { Injectable } from '@nestjs/common';
import { PostsCredsDto } from './dto/posts-credentials.dto';
import { PostsRepository } from './posts.repository';
import { Schema } from 'mongoose';
import { Posts } from './posts.schema';
import { PostsUpdateDto } from './dto/posts-update.dto';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostsRepository) {}

  async createPost(
    userId: Schema.Types.ObjectId,
    postsCredsDto: PostsCredsDto,
  ): Promise<Posts> {
    return await this.postsRepository.createPost(userId, postsCredsDto);
  }

  async updatePost(
    userId: Schema.Types.ObjectId,
    postsUpdateDto: PostsUpdateDto,
  ): Promise<Posts> {
    return await this.postsRepository.updatePost(userId, postsUpdateDto);
  }

  async getUserPost(userId: Schema.Types.ObjectId): Promise<Posts[]> {
    return await this.postsRepository.getUserPosts(userId);
  }

  async deletePost(
    postId: any,
    userId: Schema.Types.ObjectId,
  ): Promise<{ message: string }> {
    return await this.postsRepository.deletePost(postId, userId);
  }
}
