import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop({ type: [String], default: [] })
  sizes: string[];

  @Prop({ type: [String], default: [] })
  colors: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  seller: Types.ObjectId;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  numReviews: number;

  @Prop({ type: [Object], default: [] })
  reviews: {
    user: Types.ObjectId;
    name: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
