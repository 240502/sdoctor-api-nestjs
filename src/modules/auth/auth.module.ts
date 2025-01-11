import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {
  AccountCreateModel,
  LoginModel,
  Functions,
  User,
} from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: '24-05-2002',
      signOptions: { expiresIn: '72h' },
    }),
    AccountCreateModel,
    LoginModel,
    TypeOrmModule.forFeature([User, Functions]),
  ],
  providers: [AuthService, DatabaseHelper],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
