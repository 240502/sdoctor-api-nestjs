import {
  Controller,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppointmentStatusService } from './appointment-status.service';
import { AppointmentStatusResponse } from './dto';

@Controller('appointment-status')
export class AppointmentStatusController {
  constructor(
    private appointmentStatusService: AppointmentStatusService,
  ) {}

  async getAllAppointmentStatus(): Promise<any> {
    try {
      const results: AppointmentStatusResponse[] =
        await this.appointmentStatusService.getAllAppointmentStatus();
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
