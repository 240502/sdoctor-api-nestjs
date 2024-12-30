import { Module } from '@nestjs/common';
import { AppointmentStatusService } from './appointment-status.service';
import { AppointmentStatusController } from './appointment-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentStatus } from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentStatus])],
  providers: [AppointmentStatusService, DatabaseHelper],
  controllers: [AppointmentStatusController],
})
export class AppointmentStatusModule {}
