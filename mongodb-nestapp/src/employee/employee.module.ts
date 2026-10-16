import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service.js';
import { EmployeeController } from './employee.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './schemas/employee.schema.js';
import { Profile, ProfileSchema } from './schemas/profile.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
