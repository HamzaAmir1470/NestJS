import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity.js';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  async getAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async getById(id: number): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateData: Partial<Employee>): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    const updatedEmployee = Object.assign(employee, updateData);
    return this.employeeRepository.save(updatedEmployee);
  }

  async delete(
    id: number,
  ): Promise<{ message: string; employee: Employee | void }> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    await this.employeeRepository.remove(employee);
    return {
      message: `Employee with ${id} has been deleted successfully`,
      employee,
    };
  }

  async search(filters: {
    name?: string;
    department?: string;
  }): Promise<Employee[]> {
    const querry = this.employeeRepository.createQueryBuilder('employee');
    if (filters.name) {
      querry.andWhere('employee.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }
    if (filters.department) {
      querry.andWhere('employee.department :dept', {
        department: `%${filters.department}%`,
      });
    }
    return querry.getMany();
  }
}