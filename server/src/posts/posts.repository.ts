import { PostsCredsDto } from './dto/posts-credentials.dto';
import { Posts, PostsDocument } from 'src/posts/posts.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { PostsUpdateDto } from './dto/posts-update.dto';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Posts.name) private postsModel: Model<PostsDocument>,
  ) {}

  async createPost(
    userId: Schema.Types.ObjectId,
    postsCredsDto: PostsCredsDto,
  ): Promise<Posts> {
    try {
      const newPost = new this.postsModel({
        ...postsCredsDto,
        ownerId: userId,
      });
      return await newPost.save();
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async updatePost(
    userId: Schema.Types.ObjectId,
    postsUpdateDto: PostsUpdateDto,
  ) {
    try {
      const post = await this.postsModel.findOneAndUpdate(
        {
          _id: postsUpdateDto._id,
          ownerId: userId,
        },
        { ...postsUpdateDto },
      );
      if (!post) {
        throw new BadRequestException();
      }
      const updatedPost = await this.postsModel.findOne({
        _id: postsUpdateDto._id,
        ownerId: userId,
      });
      return updatedPost;
    } catch (e) {
      throw new BadRequestException('There is no post with such id');
    }
  }

  async getUserPosts(userId: Schema.Types.ObjectId): Promise<Posts[]> {
    return await this.postsModel.find({ ownerId: userId });
  }
}
