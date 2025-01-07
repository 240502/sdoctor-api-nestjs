import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import {
  AppointmentCreateDto,
  AppointmentFilterDto,
  AppointmentResponseDto,
} from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppointmentService {
  constructor(private db: DatabaseHelper) {}

  async createAppointment(
    appointment: AppointmentCreateDto,
  ): Promise<AppointmentResponseDto | null> {
    try {
      const procedureName = 'OrderAppointment';
      const data = await this.db.callProcedure(procedureName, [
        appointment.doctorId,
        appointment.appointmentDate,
        appointment.patientName,
        appointment.patientPhone,
        appointment.patientEmail,
        appointment.birthday,
        appointment.province,
        appointment.district,
        appointment.commune,
        appointment.examinationReason,
        appointment.timeId,
        appointment.gender,
        appointment.doctorName,
        appointment.price,
        appointment.timeValue,
        appointment.location,
        appointment.serviceId,
        appointment.serviceName,
      ]);

      if (Array.isArray(data) && data.length > 0) {
        const appointment = plainToInstance(
          AppointmentResponseDto,
          data[0],
        );
        return appointment;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async ViewAppointments(
    body: AppointmentFilterDto,
  ): Promise<AppointmentResponseDto[] | null> {
    try {
      const procedureName = 'ViewAppointment';
      const results = await this.db.callProcedure(procedureName, [
        body.pageIndex,
        body.pageSize,
        body.phone,
        body.statusId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const appointments: AppointmentResponseDto[] =
          plainToInstance(AppointmentResponseDto, results);
        return appointments;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getAppointmentById(
    id: number,
  ): Promise<AppointmentResponseDto | null> {
    try {
      const procedureName = 'GetAppointmentById';
      const results = this.db.callProcedure(procedureName, [id]);
      if (Array.isArray(results) && results.length > 0) {
        const appointment = plainToInstance(
          AppointmentResponseDto,
          results[0],
        );
        return appointment;
      } else {
        return null;
      }
    } catch (err: any) {
      console.log(err.message);
    }
  }
  async getAppointmentAtInvoice(
    patientName: string,
    doctorName: string,
    patientPhone: string,
    appointmentDate: Date,
  ): Promise<AppointmentResponseDto | null> {
    try {
      const procedureName = 'GetAppointmentAtInvoice';
      const results = await this.db.callProcedure(procedureName, [
        patientName,
        doctorName,
        patientPhone,
        appointmentDate,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const appointment = plainToInstance(
          AppointmentResponseDto,
          results[0],
        );
        return appointment;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updateIsValuate(appointmentId: number): Promise<any> {
    try {
      const procedureName = 'UpdateIsEvaluate';
      await this.db.callProcedure(procedureName, [appointmentId]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getAppointmentInDay(
    doctorId: number,
  ): Promise<AppointmentResponseDto[] | null> {
    try {
      const procedureName = 'GetAppointmentInDay';
      const results = await this.db.callProcedure(procedureName, [
        doctorId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const appointments: AppointmentResponseDto[] =
          plainToInstance(AppointmentResponseDto, results);
        return appointments;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateAppointmentStatus(
    id: number,
    status: number,
    reason: string,
  ): Promise<any> {
    try {
      const procedureName = 'UpdateAppointmentStatus';
      await this.db.callProcedure(procedureName, [
        id,
        status,
        reason,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
