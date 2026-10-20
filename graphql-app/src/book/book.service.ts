import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './model/book.model.js';
import { CreateBookInput } from './dto/create.book.input.js';
import { NotFoundException } from '@nestjs/common';
import { UpdateBookInput } from './dto/update-book.input.js';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(input: CreateBookInput): Promise<Book> {
    const createdBook = new this.bookModel(input);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, input: UpdateBookInput): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, input, {
      new: true,
    });

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return updatedBook;
  }

  async remove(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id);
    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return deletedBook;
  }
}
