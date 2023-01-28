import { IsString, MinLength, MaxLength } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}
