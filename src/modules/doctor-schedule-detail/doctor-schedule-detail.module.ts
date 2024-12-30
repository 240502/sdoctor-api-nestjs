import { Module } from '@nestjs/common';
import { DoctorScheduleDetailService } from './doctor-schedule-detail.service';
import { DoctorScheduleDetailController } from './doctor-schedule-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorScheduleDetail } from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorScheduleDetail])],
  providers: [DoctorScheduleDetailService, DatabaseHelper],
  controllers: [DoctorScheduleDetailController],
})
export class DoctorScheduleDetailModule {}
