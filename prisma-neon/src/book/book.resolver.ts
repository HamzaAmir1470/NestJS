import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './model/book.model.js';
import { BookService } from './book.service.js';
import { CreateBookInput } from './dto/create-book.input.js';
import { UpdateBookInput } from './dto/update-book.input.js';

@Resolver(() => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => [Book])
  getAllBooks() {
    return this.bookService.findAll();
  }

  @Query(() => Book)
  getBook(@Args('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  createBook(@Args('data') data: CreateBookInput) {
    return this.bookService.create(data);
  }

  @Mutation(() => Book)
  updateBook(@Args('id') id: string, @Args('data') data: UpdateBookInput) {
    return this.bookService.update(id, data);
  }

  @Mutation(() => Book)
  deleteBook(@Args('id') id: string) {
    return this.bookService.delete(id);
  }
}
