import { Prop, Schema as Entity, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

export type PostsDocument = Posts & Document;

@Entity()
export class Posts {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Schema.Types.ObjectId, ref: 'User' })
  ownerId: any;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
