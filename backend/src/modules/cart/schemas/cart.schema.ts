import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({
    type: [{
      product: { type: Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      size: String,
      color: String,
    }],
    default: [],
  })
  items: {
    product: Types.ObjectId;
    quantity: number;
    size?: string;
    color?: string;
  }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
