import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
  private students = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 22 },
    { id: 3, name: 'Michael Johnson', age: 19 },
    { id: 4, name: 'Emily Davis', age: 21 },
  ];

  getAllStudents() {
    return this.students;
  }

  getStudentById(id: number) {
    const student = this.students.find((student) => student.id === id);
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  //   POST
  createStudent(data: { name: string; age: number }) {
    const newStudent = {
      id: this.students.length + 1,
      name: data.name,
      age: data.age,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  //   PUT
  updateStudent(id: number, data: { name: string; age: number }) {
    const index = this.students.findIndex((student) => student.id === id);
    if (index === -1) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    this.students[index] = { id, ...data };
    return this.students[index];
  }
  //   PATCH
  patchStudent(id: number, data: Partial<{ name: string; age: number }>) {
    const student = this.getStudentById(id);
    Object.assign(student, data);
    return student;
  }
  //   Delete
  deleteStudent(id: number) {
    const index = this.students.findIndex((student) => student.id === id);

    if (index === -1) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    const deleted = this.students.splice(index, 1);
    return {
      message: `Student with id ${id} deleted successfully`,
      student: deleted[0],
    };
  }
}
