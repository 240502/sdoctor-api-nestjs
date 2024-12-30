import { Module } from '@nestjs/common';
import { DoctorScheduleService } from './doctor-schedule.service';
import { DoctorScheduleController } from './doctor-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorSchedule, DoctorScheduleDetail } from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorSchedule, DoctorScheduleDetail]),
  ],
  providers: [DoctorScheduleService, DatabaseHelper],
  controllers: [DoctorScheduleController],
})
export class DoctorScheduleModule {}
