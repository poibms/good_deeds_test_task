import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Posts } from 'src/posts/posts.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 'USER' })
  role: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' })
  posts: Posts[];
}

export const UserSchema = SchemaFactory.createForClass(User);
