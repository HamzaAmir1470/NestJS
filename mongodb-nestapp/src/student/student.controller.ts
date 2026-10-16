import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service.js';
import { Student } from './student.schema.js';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  
  @Post()
  async addStudent(@Body() data: Partial<Student>) {
    return this.studentService.createStudent(data);
  }
}
