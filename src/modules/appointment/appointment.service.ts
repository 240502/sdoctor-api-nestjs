import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { Appointment } from 'src/models/Appointment';

@Injectable()
export class AppointmentService {
  constructor(private db: DatabaseHelper) {}

  async createAppointment(
    appointment: Appointment,
  ): Promise<Appointment | null> {
    try {
      const procedureName = 'OrderAppointment';
      const results = await this.db.callProcedure(procedureName, [
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
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async ViewAppointments(
    pageIndex: number,
    pageSize: number,
    phone: string,
    statusId: number,
  ): Promise<Appointment[] | null> {
    try {
      const procedureName = 'ViewAppointment';
      const results = await this.db.callProcedure(procedureName, [
        pageIndex,
        pageSize,
        phone,
        statusId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getAppointmentById(id: number): Promise<Appointment | null> {
    try {
      const procedureName = 'GetAppointmentBYId';
      const results = this.db.callProcedure(procedureName, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
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
  ): Promise<Appointment | null> {
    try {
      const procedureName = 'GetAppointmentAtInvoice';
      const results = await this.db.callProcedure(procedureName, [
        patientName,
        doctorName,
        patientPhone,
        appointmentDate,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
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
  async getAppointmentInDay(doctorId: number): Promise<Appointment[] | null> {
    try {
      const procedureName = 'GetAppointmentInDay';
      const results = await this.db.callProcedure(procedureName, [doctorId]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
