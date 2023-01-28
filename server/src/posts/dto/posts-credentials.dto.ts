import { IsString, MinLength, MaxLength } from 'class-validator';

export class PostsCredsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  title?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(80)
  description?: string;
}
