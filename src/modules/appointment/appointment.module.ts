import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/models';
import { AuthModule } from '../auth/auth.module';
import { SocketModule } from 'src/common/shared/socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    AuthModule,
    SocketModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, DatabaseHelper],
})
export class AppointmentModule {}
