import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from '../book.service.js';
import { Book } from '../model/book.model.js';
import { CreateBookInput } from '../dto/create.book.input.js';
import { UpdateBookInput } from '../dto/update-book.input.js';
import { Args } from '@nestjs/graphql';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book], { name: 'getAllBooks' })
  async books(): Promise<Book[]> {
    return this.bookService.findAll();
  }
  @Query(() => Book, { name: 'getBook' })
  async book(@Args('id', { type: () => String }) id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book, { name: 'createBook' })
  async createBook(
    @Args('input', { type: () => CreateBookInput }) input: CreateBookInput,
  ) {
    return this.bookService.create(input);
  }

  @Mutation(() => Book, { name: 'updateBook' })
  async updateBook(
    @Args('input', { type: () => UpdateBookInput }) input: UpdateBookInput,
  ) {
    return this.bookService.update(input.id, input);
  }

  @Mutation(() => Book, { name: 'deleteBook' })
  async deleteBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}
