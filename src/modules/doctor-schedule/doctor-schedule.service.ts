import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import {
  DoctorSchedule,
  DoctorScheduleDetail,
  Time,
} from 'src/models';
@Injectable()
export class DoctorScheduleService {
  constructor(private db: DatabaseHelper) {}

  async createSchedule(
    schedule: DoctorSchedule,
  ): Promise<DoctorSchedule> {
    try {
      const procedureName = 'CreateSchedule';
      const results = await this.db.callProcedure(procedureName, [
        schedule.doctorId,
        schedule.date,
        JSON.stringify(schedule.doctorScheduleDetails),
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const listScheduleDetails: DoctorScheduleDetail[] = [];
        for (let i = 0; i < results.length; i++) {
          let time: Time = {
            id: results[i].time_id,
            startTime: results[i].start_time,
            endTime: results[i].end_time,
            interval: null,
            appointments: null,
            doctorScheduleDetails: null,
            serviceScheduleDetails: null,
          };
          let ScheduleDetail: DoctorScheduleDetail = {
            id: results[i].schedule_detail_id,
            scheduleId: results[i].schedule_id,
            timeId: results[i].time_id,
            available: results[i].available,
            time: time,
            schedule: null,
          };
          listScheduleDetails.push(ScheduleDetail);
        }
        const schedule: DoctorSchedule = {
          id: results[0].id,
          doctorId: results[0].doctor_id,
          date: results[0].date,
          createdAt: results[0].created_at,
          updatedAt: results[0].updated_at,
          doctor: null,
          doctorScheduleDetails: listScheduleDetails,
        };
        return schedule;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateSchedule(id: number, scheduleDetails): Promise<any> {
    try {
      const procedureName = 'UpdateSchedule';
      await this.db.callProcedure(procedureName, [
        id,
        JSON.stringify(scheduleDetails),
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
  async viewSchedule(date: Date, doctorId: number): Promise<any> {
    try {
      const procedureName = 'ViewSchedule';
      const results = await this.db.callProcedure(procedureName, [
        date,
        doctorId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const listScheduleDetails: DoctorScheduleDetail[] = [];
        for (let i = 0; i < results.length; i++) {
          let time: Time = {
            id: results[i].time_id,
            startTime: results[i].start_time,
            endTime: results[i].end_time,
            interval: null,
            appointments: null,
            doctorScheduleDetails: null,
            serviceScheduleDetails: null,
          };
          let ScheduleDetail: DoctorScheduleDetail = {
            id: results[i].schedule_detail_id,
            scheduleId: results[i].schedule_id,
            timeId: results[i].time_id,
            available: results[i].available,
            time: time,
            schedule: null,
          };
          listScheduleDetails.push(ScheduleDetail);
        }
        const schedule: DoctorSchedule = {
          id: results[0].id,
          doctorId: results[0].doctor_id,
          date: results[0].date,
          createdAt: results[0].created_at,
          updatedAt: results[0].updated_at,
          doctor: null,
          doctorScheduleDetails: listScheduleDetails,
        };
        return schedule;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
