import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({
    type: [{
      product: { type: Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
      size: String,
      color: String,
    }],
    required: true,
  })
  items: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
  }[];

  @Prop({ type: Object, required: true })
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] })
  status: string;

  @Prop()
  paymentMethod: string;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop()
  paidAt: Date;

  @Prop({ default: false })
  isDelivered: boolean;

  @Prop()
  deliveredAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
