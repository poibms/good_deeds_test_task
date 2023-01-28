import { Prop, Schema as Entity, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema } from 'mongoose';
import { Posts } from 'src/posts/posts.schema';

export type UserDocument = User & Document;

@Entity()
export class User {
  _id: Schema.Types.ObjectId;

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
