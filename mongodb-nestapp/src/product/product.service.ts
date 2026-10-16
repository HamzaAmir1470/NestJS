import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find();
  }

  async createProduct(): Promise<Product> {
    const product = new this.productModel({
      title: 'Gaming Laptop',
      tag: [
        { name: 'Electronics' },
        { name: 'Computers' },
        { name: 'Gaming' },
      ],
    });
    return product.save();
  }
}
