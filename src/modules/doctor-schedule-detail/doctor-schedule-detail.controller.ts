import {
  Controller,
  Put,
  Param,
  Get,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { DoctorScheduleDetailService } from './doctor-schedule-detail.service';

@Controller('doctor-schedule-detail')
export class DoctorScheduleDetailController {
  constructor(
    private doctorScheduleDetails: DoctorScheduleDetailService,
  ) {}

  @Get('get-by-schedule-id')
  async getScheduleDetailsByScheduleId(
    @Param('scheduleId') scheduleId: number,
  ): Promise<any> {
    try {
      const results =
        await this.doctorScheduleDetails.getScheduleDetailsByScheduleId(
          scheduleId,
        );
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update-available/:id')
  async updateAvailableScheduleDetails(@Param('id') id: number) {
    try {
      await this.doctorScheduleDetails.updateAvailableScheduleDetails(
        id,
      );
      return { message: 'Updated successfully' };
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
