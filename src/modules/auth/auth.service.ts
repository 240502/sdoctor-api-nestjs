import { Injectable } from '@nestjs/common';
import {
  AccountCreateModel,
  Functions,
  LoginModel,
  User,
} from 'src/models';
import * as argon from 'argon2';
import { DatabaseHelper } from 'src/common/database/helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private databaseHelper: DatabaseHelper,
  ) {}

  async generateToken(payload: {
    userId: number;
    email: string;
  }): Promise<string> {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async signIn(auth: LoginModel): Promise<any> {
    try {
      const procedureName = 'Login';
      const results = await this.databaseHelper.callProcedure(
        procedureName,
        [auth.email],
      );
      if (results.length === 0) {
        throw new Error('Email không tồn tại!');
      }
      const isPasswordValid = await argon.verify(
        results[0].password,
        auth.password,
      );
      if (!isPasswordValid) {
        const payload = {
          userId: results[0].user_id,
          email: results[0].email,
        };
        const token = await this.generateToken(payload);
        let functions: Functions[] = [];
        for (let i = 0; i < results.length; i++) {
          let model: Functions = {
            id: Number(results[i].function_id),
            functionName: results[i].function_name,
            createdAt: null,
            updatedAt: null,
            parentId: null,
            icon: results[i].icon,
            sort: null,
            link: results[i].link,
          };
          functions.push(model);
        }
        const user: User = {
          userId: results[0].user_id,
          fullName: results[0].full_name,
          image: results[0].image,
          phone: results[0].phone,
          gender: results[0].gender,
          city: results[0].city,
          district: results[0].district,
          commune: results[0].commune,
          email: results[0].email,
          password: results[0].password,
          roleId: results[0].role_id,
          createdAt: results[0].created_at,
          updatedAt: results[0].updated_at,
          birthday: results[0].birthday,
          functions: functions,
          token: token,
          doctorId: results[0].doctor_id,
          active: results[0].active,
          doctors: null,
          notifications: [],
          role: null,
        };
        return user;
      } else {
        throw new Error('Mật khẩu không chính xác!');
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async signUp(auth: AccountCreateModel): Promise<any> {
    try {
      const hash = await argon.hash(auth.password);
      const procedureName = 'CreateAccount';
      await this.databaseHelper.callProcedure(procedureName, [
        auth.userId,
        hash,
      ]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
