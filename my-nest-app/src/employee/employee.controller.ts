import { Controller, Get } from '@nestjs/common';

@Controller('employee')
export class EmployeeController {
  @Get()
  getEmployees() {
    return 'This action returns all employee';
  }
}
