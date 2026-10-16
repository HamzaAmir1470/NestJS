import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser() {
    return this.userService.createUser();
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
