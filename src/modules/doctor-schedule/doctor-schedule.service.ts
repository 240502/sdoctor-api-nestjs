import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import {
  DoctorSchedule,
  DoctorScheduleDetail,
  Time,
} from 'src/models';
import {
  DoctorScheduleCreateDto,
  DoctorScheduleResponseDto,
  DoctorScheduleUpdateDto,
} from './dto';
import { DoctorScheduleDetailResponseDto } from '../doctor-schedule-detail/dto';
@Injectable()
export class DoctorScheduleService {
  constructor(private db: DatabaseHelper) {}

  async createSchedule(
    schedule: DoctorScheduleCreateDto,
  ): Promise<DoctorScheduleResponseDto> {
    try {
      const procedureName = 'CreateSchedule';
      const results = await this.db.callProcedure(procedureName, [
        schedule.doctorId,
        schedule.date,
        JSON.stringify(schedule.doctorScheduleDetails),
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const listScheduleDetails: DoctorScheduleDetailResponseDto[] =
          [];
        for (let i = 0; i < results.length; i++) {
          let ScheduleDetail: DoctorScheduleDetailResponseDto = {
            id: results[i].schedule_detail_id,
            scheduleId: results[i].schedule_id,
            timeId: results[i].time_id,
            available: results[i].available,
            startTime: results[i].start_time,
            endTime: results[i].end_time,
          };
          listScheduleDetails.push(ScheduleDetail);
        }
        const schedule: DoctorScheduleResponseDto = {
          id: results[0].id,
          doctorId: results[0].doctor_id,
          date: results[0].date,
          createdAt: results[0].created_at,
          updatedAt: results[0].updated_at,
          doctorScheduleDetails: listScheduleDetails,
        };
        return schedule;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateSchedule(
    doctorScheduleUpdateDto: DoctorScheduleUpdateDto,
  ): Promise<any> {
    try {
      const procedureName = 'UpdateSchedule';
      await this.db.callProcedure(procedureName, [
        doctorScheduleUpdateDto.id,
        JSON.stringify(doctorScheduleUpdateDto.scheduleDetails),
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async deleteSchedule(
    id: number,
    scheduleDetails: any,
  ): Promise<any> {
    try {
      const procedureName = 'DeleteSchedule';
      await this.db.callProcedure(procedureName, [
        id,
        scheduleDetails,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async viewSchedule(
    date: Date,
    doctorId: number,
    viewType: string,
  ): Promise<DoctorScheduleResponseDto | null> {
    try {
      const procedureName = 'ViewSchedule';
      const results = await this.db.callProcedure(procedureName, [
        doctorId,
        date,
        viewType,
      ]);

      if (Array.isArray(results) && results.length > 0) {
        const listScheduleDetails: DoctorScheduleDetailResponseDto[] =
          [];
        for (let i = 0; i < results.length; i++) {
          let ScheduleDetail: DoctorScheduleDetailResponseDto = {
            id: results[i].schedule_detail_id,
            scheduleId: results[i].schedule_id,
            timeId: results[i].time_id,
            available: results[i].available,
            startTime: results[i].start_time,
            endTime: results[i].end_time,
          };
          listScheduleDetails.push(ScheduleDetail);
        }
        const schedule: DoctorScheduleResponseDto = {
          id: results[0].id,
          doctorId: results[0].doctor_id,
          date: results[0].date,
          createdAt: results[0].created_at,
          updatedAt: results[0].updated_at,
          doctorScheduleDetails: listScheduleDetails,
        };
        return schedule;
      } else return null;
    } catch (err: any) {
      throw err;
    }
  }
}
