import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from 'src/models/Appointment';

@Controller('/appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post('/create')
  async createAppointment(@Body() appointment: Appointment): Promise<any> {
    try {
      const result =
        await this.appointmentService.createAppointment(appointment);
      console.log(appointment);
      if (result) {
        return result;
      }
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/view')
  async ViewAppointment(
    @Body()
    body: {
      pageIndex: number;
      pageSize: number;
      phone: string;
      statusId: number;
    },
  ): Promise<any> {
    try {
      const { pageIndex, pageSize, phone, statusId } = body;
      const results = await this.appointmentService.ViewAppointments(
        pageIndex,
        pageSize,
        phone,
        statusId,
      );
      if (results) {
        return {
          pageIndex: pageIndex,
          pageSize: pageSize,
          data: results,
          phone: phone,
          statusId: statusId,
        };
      }
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/get-by-id/:id')
  async getAppointmentById(@Param('id') id: number): Promise<any> {
    try {
      const result = await this.appointmentService.getAppointmentById(id);
      if (result) {
        return result;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/get-appointment-at-invoice')
  async getAppointmentAtInvoice(
    @Body()
    body: {
      patientName: string;
      doctorName: string;
      patientPhone: string;
      appointmentDate: Date;
    },
  ): Promise<any> {
    try {
      const { patientName, doctorName, patientPhone, appointmentDate } = body;
      const result = await this.appointmentService.getAppointmentAtInvoice(
        patientName,
        doctorName,
        patientPhone,
        appointmentDate,
      );
      if (result) {
        return result;
      }
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('/update-valuation/:appointmentId')
  async updateIsValuation(
    @Param('appointmentId') appointmentId: number,
  ): Promise<any> {
    try {
      await this.appointmentService.updateIsValuate(appointmentId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Update successfully',
      };
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/get-appointment-in-day/:doctorId')
  async getAppointmentInDay(@Param('doctorId') doctorId: number): Promise<any> {
    try {
      const results =
        await this.appointmentService.getAppointmentInDay(doctorId);
      if (results) {
        return results;
      } else {
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, message: 'Not found' },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
