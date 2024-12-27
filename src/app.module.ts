import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
import { DoctorService } from './modules/doctor/doctor.service';
import { DoctorModule } from './modules/doctor/doctor.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'sdoctor',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
    RoleModule,
    DoctorModule,
    MailerModule,
    AppointmentModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
