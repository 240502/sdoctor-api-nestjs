import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { DoctorScheduleService } from './doctor-schedule.service';
import {
  DoctorScheduleCreateDto,
  DoctorScheduleResponseDto,
  DoctorScheduleUpdateDto,
} from './dto';
import { AuthGuard } from 'src/common/guards';
@Controller('doctor-schedule')
export class DoctorScheduleController {
  constructor(private doctorScheduleService: DoctorScheduleService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createSchedule(
    @Body() doctorSchedule: DoctorScheduleCreateDto,
  ): Promise<any> {
    try {
      const result: DoctorScheduleResponseDto =
        await this.doctorScheduleService.createSchedule(
          doctorSchedule,
        );
      if (result) {
        return { message: 'Created successfully', result: result };
      }
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
      console.log(body);
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
}
