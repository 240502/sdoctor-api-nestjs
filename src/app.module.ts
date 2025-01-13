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
import { HomeMenuModule } from './modules/home-menu/home-menu.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { MajorModule } from './modules/major/major.module';
import { PaymentMethodModule } from './modules/payment-method/payment-method.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PatientProfileModule } from './modules/patient-profile/patient-profile.module';
import { PostCategoryModule } from './modules/post-category/post-category.module';
import { ServiceCategoryModule } from './modules/service-category/service-category.module';
import { TimeModule } from './modules/time/time.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from './modules/upload/upload.module';
import { CloudinaryModule } from './config/cloudinary/cloudinary.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Trỏ đến thư mục public ở ngoài src
    }),
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
    HomeMenuModule,
    InvoiceModule,
    MajorModule,
    PaymentMethodModule,
    NotificationsModule,
    PatientProfileModule,
    PostCategoryModule,
    ServiceCategoryModule,
    TimeModule,
    UploadModule,
    CloudinaryModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
