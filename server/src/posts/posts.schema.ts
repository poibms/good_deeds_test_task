import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Posts & Document;

@Schema()
export class Posts {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
