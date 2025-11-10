import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: any): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(userId?: string): Promise<Order[]> {
    const query = userId ? { user: userId } : {};
    return this.orderModel
      .find(query)
      .populate('items.product')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Order> {
    return this.orderModel
      .findById(id)
      .populate('items.product')
      .populate('user', 'name email')
      .exec();
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async markAsPaid(id: string): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(
        id,
        { isPaid: true, paidAt: new Date() },
        { new: true },
      )
      .exec();
  }

  async markAsDelivered(id: string): Promise<Order> {
    return this.orderModel
      .findByIdAndUpdate(
        id,
        { isDelivered: true, deliveredAt: new Date(), status: 'delivered' },
        { new: true },
      )
      .exec();
  }
}
