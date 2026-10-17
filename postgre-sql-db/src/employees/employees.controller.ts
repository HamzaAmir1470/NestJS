import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { Employee } from './employees.entity.js';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() body: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(body);
  }
  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.getAll();
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number): Promise<Employee | null> {
    return this.employeeService.getById(id);
  }
}
