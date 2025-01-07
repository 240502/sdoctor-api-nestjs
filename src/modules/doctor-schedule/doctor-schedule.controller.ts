import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DoctorScheduleService } from './doctor-schedule.service';
import {
  DoctorScheduleCreateDto,
  DoctorScheduleResponseDto,
  DoctorScheduleUpdateDto,
} from './dto';
@Controller('doctor-schedule')
export class DoctorScheduleController {
  constructor(private doctorScheduleService: DoctorScheduleService) {}

  @Post('create')
  async createSchedule(
    @Body() doctorSchedule: DoctorScheduleCreateDto,
  ): Promise<any> {
    try {
      const result: DoctorScheduleResponseDto =
        await this.doctorScheduleService.createSchedule(
          doctorSchedule,
        );
      if (result) {
        return result;
      } else {
        throw new HttpException(
          { statusCode: HttpStatus.NOT_FOUND, message: 'Not found!' },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update')
  async updateSchedule(
    @Body() body: DoctorScheduleUpdateDto,
  ): Promise<any> {
    try {
      await this.doctorScheduleService.updateSchedule(body);
      return { message: 'Updated successfully' };
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:id')
  async deleteSchedule(@Param('id') id: number): Promise<any> {
    try {
      await this.deleteSchedule(id);
      return {
        message: 'Deleted successfully',
      };
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('view')
  async viewSchedule(
    @Body() body: { date: Date; doctorId: number },
  ): Promise<any> {
    try {
      const { date, doctorId } = body;
      const result = await this.doctorScheduleService.viewSchedule(
        date,
        doctorId,
      );
      if (result) {
        return result;
      } else
        throw new HttpException(
          {
            message: 'Không tồn tại bản ghi nào!',
            statusCode: HttpStatus.NOT_FOUND,
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
