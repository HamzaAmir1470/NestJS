import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    {
      id: 1,
      name: 'Mobile',
      description: 'Description for Product 1',
      price: 10.99,
    },
    {
      id: 2,
      name: 'Laptop',
      description: 'Description for Product 2',
      price: 19.99,
    },
    {
      id: 3,
      name: 'Tablet',
      description: 'Description for Product 3',
      price: 15.99,
    },
  ];

  getAllProducts() {
    return this.products;
  }
  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
