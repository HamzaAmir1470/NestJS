import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { Employee } from './employees.entity.js';
import { SupabaseAuthGuard } from '../auth/supabase-auth/supabase-auth.guard.js';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() body: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(body);
  }
  @UseGuards(SupabaseAuthGuard)
  @Get()
  async getAllEmployees(): Promise<Employee[]> {
    return this.employeeService.getAll();
  }

  @Get('search')
  async searchEmployees(
    @Query('name') name?: string,
    @Query('department') department?: string,
  ): Promise<Employee[]> {
    return this.employeeService.search({ name, department });
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number): Promise<Employee | null> {
    return this.employeeService.getById(id);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() body: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeeService.update(id, body);
  }

  @Delete(':id')
  async deleteEmployee(
    @Param('id') id: number,
  ): Promise<{ message: string; employee: Employee | void }> {
    return this.employeeService.delete(id);
  }
}
