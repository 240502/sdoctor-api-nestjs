import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import {
  AppointmentCreateDto,
  AppointmentFilterDto,
  AppointmentResponseDto,
} from './dto';
import { AuthGuard } from 'src/common/guards';
import { SocketGateway } from 'src/common/shared/base.gateway';

@Controller('/appointment')
export class AppointmentController {
  constructor(
    private appointmentService: AppointmentService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Post('/create')
  async createAppointment(
    @Body() appointment: AppointmentCreateDto,
  ): Promise<any> {
    try {
      const result: AppointmentResponseDto =
        await this.appointmentService.createAppointment(appointment);
      if (result) {
        const eventName = 'newAppointment';
        this.socketGateway.emitToAll(eventName, result);
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

  @Get('/get-total-patient-in-day/:doctorId')
  async getTotalPatientInDay(
    @Param('doctorId') doctorId: number,
  ): Promise<any> {
    try {
      const results: AppointmentResponseDto[] =
        await this.appointmentService.getTotalPatientInDay(doctorId);
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
  @Put('/update-appointment-status')
  @UseGuards(AuthGuard)
  async updateAppointmentStatus(
    @Body()
    body: {
      id: number;
      status: number;
      reason: string;
    },
  ): Promise<any> {
    try {
      const { id, status, reason } = body;
      await this.appointmentService.updateAppointmentStatus(
        id,
        status,
        reason,
      );
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('/get-total-examined-patient-in-day/:doctorId')
  async getTotalExaminedPatientInDay(
    @Param('doctorId') doctorId: number,
  ): Promise<any> {
    try {
      const results: AppointmentResponseDto[] =
        await this.appointmentService.getTotalExaminedPatientInDay(
          doctorId,
        );
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

  @Post('get-appointments-by-status')
  async getAppointmentsByStatus(
    @Body()
    body: {
      pageIndex: number;
      pageSize: number;
      doctorId: number;
      status: number;
    },
  ): Promise<any> {
    try {
      const { pageIndex, pageSize, doctorId, status } = body;
      const appointments: AppointmentResponseDto[] =
        await this.appointmentService.getAppointmentsByStatus(
          pageIndex,
          pageSize,
          doctorId,
          status,
        );

      if (appointments) {
        return {
          pageIndex: pageIndex,
          pageSize: pageSize,
          pageCount: Math.ceil(
            appointments[0].recordCount / pageSize,
          ),
          totalItems: appointments[0].recordCount,
          data: appointments,
          doctorId: doctorId,
          status: status,
        };
      }
    } catch (err: any) {
      const statusCode: number = err?.status;
      throw new HttpException({ message: err.message }, statusCode);
    }
  }

  @Post('/statistics-appointments-by-day')
  @UseGuards(AuthGuard)
  async statisticsAppointmentsByDay(
    @Body()
    body: {
      startWeek: Date;
      endWeek: Date;
      doctorId: number;
    },
  ): Promise<any> {
    try {
      const { startWeek, endWeek, doctorId } = body;
      const results =
        await this.appointmentService.statisticsAppointmentsByDay(
          startWeek,
          endWeek,
          doctorId,
        );
      return results;
    } catch (err: any) {
      throw new HttpException(
        { message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
