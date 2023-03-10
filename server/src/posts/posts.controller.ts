import { User } from 'src/user/user.schema';
import { PostsCredsDto } from './dto/posts-credentials.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { Posts } from './posts.schema';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { PostsUpdateDto } from './dto/posts-update.dto';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/')
  createPost(
    @Body() postsCredsDto: PostsCredsDto,
    @GetUser() user: User,
  ): Promise<Posts> {
    return this.postsService.createPost(user._id, postsCredsDto);
  }

  @Put('/')
  uodatePost(
    @Body() postsUpdateDto: PostsUpdateDto,
    @GetUser() user: User,
  ): Promise<Posts> {
    return this.postsService.updatePost(user._id, postsUpdateDto);
  }

  @Get('/')
  getUserPosts(): Promise<Posts[]> {
    return this.postsService.getUserPost();
  }

  @Delete('/:postsid')
  deletePost(
    @Param('postsid') postId: any,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.postsService.deletePost(postId, user._id);
  }
}
