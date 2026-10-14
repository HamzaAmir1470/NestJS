import { IsInt } from 'class-validator/types/decorator/typechecker/IsInt.js';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString.js';

export class CreateCustomerDto {
  @IsString()
  name: string;
  @IsInt()
  age: number;
}
