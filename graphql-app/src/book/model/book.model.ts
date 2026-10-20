import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Book extends Document {
  // Expose the native Mongoose _id as a GraphQL ID string safely via a getter
  @Field(() => ID, { name: '_id' })
  get id(): string {
    return this._id.toHexString();
  }

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop({ required: true })
  @Field()
  author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);