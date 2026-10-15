import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles/roles.guard.js';
import { Role } from '../guards/roles/roles.enums.js';
import { Roles } from '../guards/roles/roles.decorator.js';

@Controller('user-roles')
export class UserRolesController {
  @Get('admin-data')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  getAdminData() {
    return { message: 'This data is only accessible to Admins.' };
  }
  @Get('user-data')
  getUserData() {
    return { message: 'This data is accessible to all users.' };
  }
}
