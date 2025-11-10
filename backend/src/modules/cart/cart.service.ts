import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async getCart(userId: string): Promise<Cart> {
    let cart = await this.cartModel
      .findOne({ user: userId })
      .populate('items.product')
      .exec();

    if (!cart) {
      cart = await this.cartModel.create({ user: userId, items: [] });
    }

    return cart;
  }

  async addItem(userId: string, item: any): Promise<Cart> {
    let cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      cart = await this.cartModel.create({ user: userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (i) => i.product.toString() === item.productId && i.size === item.size && i.color === item.color,
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += item.quantity || 1;
    } else {
      cart.items.push({
        product: item.productId,
        quantity: item.quantity || 1,
        size: item.size,
        color: item.color,
      });
    }

    await cart.save();
    return this.cartModel.findById(cart._id).populate('items.product').exec();
  }

  async updateItem(userId: string, itemId: string, quantity: number): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId });
    
    const item = cart.items.find((i) => i['_id'].toString() === itemId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
    }

    return this.cartModel.findById(cart._id).populate('items.product').exec();
  }

  async removeItem(userId: string, itemId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId });
    
    cart.items = cart.items.filter((i) => i['_id'].toString() !== itemId);
    await cart.save();

    return this.cartModel.findById(cart._id).populate('items.product').exec();
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ user: userId });
    cart.items = [];
    return cart.save();
  }
}
