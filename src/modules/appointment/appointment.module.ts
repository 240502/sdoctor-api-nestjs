import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/models';
import { AppointmentGateway } from './gateway/appointment.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), AuthModule],
  controllers: [AppointmentController],
  providers: [AppointmentService, DatabaseHelper, AppointmentGateway],
})
export class AppointmentModule {}
