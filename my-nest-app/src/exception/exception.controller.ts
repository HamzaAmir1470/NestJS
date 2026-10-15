import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../filter/http-exception/http-exception.filter.js';

@Controller('exception')
@UseFilters(HttpExceptionFilter)
export class ExceptionController {
  @Get('hello/:id')
  getHello(@Param('id', ParseIntPipe) id: number): string {
    return `message : Hello, ${id}!`;
  }
}
