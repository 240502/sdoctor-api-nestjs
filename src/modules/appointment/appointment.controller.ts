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
import { AppointmentGateway } from './gateway';
import {
  AppointmentCreateDto,
  AppointmentFilterDto,
  AppointmentResponseDto,
} from './dto';

@Controller('/appointment')
export class AppointmentController {
  constructor(
    private appointmentService: AppointmentService,
    private readonly appointmentGateway: AppointmentGateway,
  ) {}

  @Post('/create')
  async createAppointment(
    @Body() appointment: AppointmentCreateDto,
  ): Promise<any> {
    try {
      const result: AppointmentResponseDto =
        await this.appointmentService.createAppointment(appointment);
      if (result) {
        this.appointmentGateway.notifyToAllClient(result);
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
    body: AppointmentFilterDto,
  ): Promise<any> {
    try {
      const results: AppointmentResponseDto[] =
        await this.appointmentService.ViewAppointments(body);
      if (results) {
        return {
          pageIndex: body.pageIndex,
          pageSize: body.pageSize,
          data: results,
          phone: body.phone,
          statusId: body.statusId,
          pageCount: Math.ceil(
            results[0].recordCount / body.pageSize,
          ),
          totalItems: results[0].recordCount,
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
      const result: AppointmentResponseDto =
        await this.appointmentService.getAppointmentById(id);
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
      const {
        patientName,
        doctorName,
        patientPhone,
        appointmentDate,
      } = body;
      const result: AppointmentResponseDto =
        await this.appointmentService.getAppointmentAtInvoice(
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
  async getAppointmentInDay(
    @Param('doctorId') doctorId: number,
  ): Promise<any> {
    try {
      const results: AppointmentResponseDto[] =
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
