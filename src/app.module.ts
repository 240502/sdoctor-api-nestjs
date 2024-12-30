import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClinicModule } from './modules/clinic/clinic.module';
import { CommentModule } from './modules/comment/comment.module';
import { ServiceModule } from './modules/service/service.module';
import { PostModule } from './modules/post/post.module';
import { DoctorScheduleModule } from './modules/doctor-schedule/doctor-schedule.module';
import { AppointmentStatusModule } from './modules/appointment-status/appointment-status.module';
import { DoctorScheduleDetailModule } from './modules/doctor-schedule-detail/doctor-schedule-detail.module';
import { DoctorServiceModule } from './modules/doctor-service/doctor-service.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'sdoctor',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RoleModule,
    DoctorModule,
    MailerModule,
    AppointmentModule,
    AuthModule,
    ClinicModule,
    CommentModule,
    ServiceModule,
    PostModule,
    DoctorScheduleModule,
    AppointmentStatusModule,
    DoctorScheduleDetailModule,
    DoctorServiceModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
