import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerMiddleware } from './middleware/logger/logger.middleware.js';
import { DatabaseController } from './database/database.controller.js';
import { DatabaseService } from './database/database.service.js';
import { ConfigModule } from '@nestjs/config';
import { EvService } from './ev/ev.service.js';
import { EvController } from './ev/ev.controller.js';

@Module({
  imports: [
    EmployeeModule,
    CategoryModule,
    StudentModule,
    CustomerModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [
    AppController,
    UserController,
    ProductController,
    MynameController,
    UserRolesController,
    ExceptionController,
    DatabaseController,
    EvController,
  ],
  providers: [AppService, ProductService, CustomerService, DatabaseService, EvService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
