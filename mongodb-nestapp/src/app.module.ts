import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StudentModule } from './student/student.module.js';
import { UserModule } from './user/user.module.js';
import { EmployeeModule } from './employee/employee.module.js';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    StudentModule,
    UserModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
