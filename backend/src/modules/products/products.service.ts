import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: any): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(filters?: any): Promise<Product[]> {
    const query: any = { isActive: true };
    
    if (filters?.category) {
      query.category = filters.category;
    }
    
    if (filters?.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
      ];
    }

    let productsQuery = this.productModel.find(query);

    // Sorting
    if (filters?.sortBy === 'price-low') {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (filters?.sortBy === 'price-high') {
      productsQuery = productsQuery.sort({ price: -1 });
    } else if (filters?.sortBy === 'rating') {
      productsQuery = productsQuery.sort({ rating: -1 });
    } else {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }

    return productsQuery.exec();
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id).populate('seller', 'name email').exec();
  }

  async update(id: string, updateProductDto: any): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    ).exec();
  }

  async addReview(productId: string, review: any): Promise<Product> {
    const product = await this.productModel.findById(productId);
    
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    
    return product.save();
  }
}
