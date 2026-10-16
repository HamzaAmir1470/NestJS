import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema.js';
import { Profile } from './schemas/profile.schema.js';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createEmployee(): Promise<Employee> {
    const profile = await this.profileModel.create({
      age: 30,
      qualification: 'Bachelor',
    });
    const employee = await this.employeeModel.create({
      name: 'John Doe',
      profile: profile._id,
    });
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().populate('profile').exec();
  }
}
