import { Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct() {
    return this.productService.createProduct();
  }

  @Get()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }
}
