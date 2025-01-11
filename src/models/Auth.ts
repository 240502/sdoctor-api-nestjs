import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  isEmpty,
} from 'class-validator';

export class AccountCreateModel {
  @IsNotEmpty()
  userId: number | null;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginModel {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
