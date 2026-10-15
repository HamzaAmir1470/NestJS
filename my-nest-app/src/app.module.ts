import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserController } from './user/user.controller.js';
import { ProductService } from './product/product.service.js';
import { ProductController } from './product/product.controller.js';
import { EmployeeModule } from './employee/employee.module.js';
import { CategoryModule } from './category/category.module.js';
import { StudentModule } from './student/student.module.js';
import { CustomerService } from './customer/customer.service.js';
import { CustomerModule } from './customer/customer.module.js';
import { MynameController } from './myname/myname.controller.js';
import { UserRolesController } from './user-roles/user-roles.controller.js';
import { ExceptionController } from './exception/exception.controller.js';

@Module({
  imports: [EmployeeModule, CategoryModule, StudentModule, CustomerModule],
  controllers: [AppController, UserController, ProductController, MynameController, UserRolesController, ExceptionController],
  providers: [AppService, ProductService, CustomerService],
})
export class AppModule {}
