import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { Invoices } from 'src/models';
import {
  InvoiceCreateDto,
  InvoiceResponseDto,
  InvoiceUpdateDto,
} from './dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class InvoiceService {
  constructor(private db: DatabaseHelper) {}

  async getInvoiceByAppointmentId(
    appointmentId: number,
  ): Promise<InvoiceResponseDto | null> {
    try {
      const procedureName = 'GetInvoiceByAppointmentId';
      const results = await this.db.callProcedure(procedureName, [
        appointmentId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(InvoiceResponseDto, results[0]);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async createInvoice(
    invoice: InvoiceCreateDto,
  ): Promise<InvoiceResponseDto> {
    try {
      const procedureName = 'CreateInvoice';
      const newInvoice = await this.db.callProcedure(procedureName, [
        invoice.appointmentId,
        invoice.doctorId,
        invoice.serviceId,
        invoice.amount,
        invoice.amount,
        invoice.paymentMethod,
        invoice.patientName,
        invoice.patientPhone,
      ]);
      return plainToInstance(InvoiceResponseDto, newInvoice);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async updateInvoice(invoice: InvoiceUpdateDto): Promise<any> {
    try {
      const procedureName = 'UpdateInvoices';
      await this.db.callProcedure(procedureName, [
        invoice.id,
        invoice.serviceId,
        invoice.amount,
        invoice.status,
        invoice.paymentMethod,
        invoice.patientName,
        invoice.patientPhone,
      ]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteInvoice(id: number): Promise<any> {
    try {
      const procedureName = 'DeleteInvoice';
      await this.db.callProcedure(procedureName, [id]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getRecentInvoice(): Promise<InvoiceResponseDto[] | null> {
    try {
      const procedureName = 'GetRecentInvoice';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(InvoiceResponseDto, results);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async getTotalRevenueByDateInNowWeek(
    startWeek: Date,
    endWeek: Date,
    doctorId: number,
  ): Promise<any> {
    try {
      const procedureName = 'GetTotalRevenueByDateInNowWeek';
      const results = await this.db.callProcedure(procedureName, [
        startWeek,
        endWeek,
        doctorId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async viewInvoice(
    pageIndex: number,
    pageSize: number,
    status: string,
  ): Promise<InvoiceResponseDto[]> {
    try {
      const procedureName = 'ViewInvoice';
      const results = await this.db.callProcedure(procedureName, [
        pageIndex,
        pageSize,
        status,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(InvoiceResponseDto, results);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updateInvoiceStatus(
    id: number,
    status: string,
  ): Promise<any> {
    try {
      const procedureName = 'UpdateInvoiceStatus';
      await this.db.callProcedure(procedureName, [id, status]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
