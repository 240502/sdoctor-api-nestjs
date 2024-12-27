import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('/send-booking-success')
  async sendBookingSuccessMail(
    @Body()
    body: {
      patientName: string;
      email: string;
      doctorName: string;
      time: string;
      date: string;
      location: string;
      status: string;
      fee: number;
      serviceName: string;
    },
  ) {
    try {
      const {
        patientName,
        email,
        doctorName,
        time,
        date,
        location,
        status,
        fee,
        serviceName,
      } = body;

      await this.mailerService.sendBookingSuccessMail(
        patientName,
        email,
        doctorName,
        time,
        date,
        location,
        status,
        fee,
        serviceName,
      );
      return { message: 'Email sent successfully' };
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
}