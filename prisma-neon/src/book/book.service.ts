import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookInput } from './dto/create-book.input.js';
import { UpdateBookInput } from './dto/update-book.input.js';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateBookInput) {
    return this.prisma.book.create({
      data,
    });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: string) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdateBookInput) {
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
