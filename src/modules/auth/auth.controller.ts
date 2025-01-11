import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountCreateModel, LoginModel } from 'src/models';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() auth: LoginModel): Promise<any> {
    try {
      const result = await this.authService.signIn(auth);
      return result;
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('signup')
  async signUp(@Body() auth: AccountCreateModel): Promise<any> {
    try {
      await this.authService.signUp(auth);
      return {
        message: 'sign up successfully',
      };
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
