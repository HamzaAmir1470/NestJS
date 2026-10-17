import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Library } from './schemas/library.schema.js';
import { Book } from './schemas/book.schema.js';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Library.name) private libraryModel: Model<Library>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  async createLibrary(name: string): Promise<Library> {
    const book1 = await this.bookModel.create({
      title: 'Js ka champion',
      author: 'John Doe',
    });
    const book2 = await this.bookModel.create({
      title: 'HTML ka champion',
      author: 'John Doe',
    });
    const library = await this.libraryModel.create({
      name: 'Central Library',
      books: [book1._id, book2._id],
    });
    return library;
  }

  async getLibraries(): Promise<Library[]> {
    return this.libraryModel.find().populate('books').exec();
  }
}
