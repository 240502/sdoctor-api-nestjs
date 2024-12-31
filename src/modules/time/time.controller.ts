import {
  Controller,
  Param,
  Get,
  HttpException,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { TimeService } from './time.service';

@Controller('time')
export class TimeController {
  constructor(private timeService: TimeService) {}

  @Get('get-by-id')
  async getTimeById(@Param('id') id: number): Promise<void> {
    try {
      const result = await this.timeService.getTimeById(id);
      if (result) {
        return result;
      } else
        throw new HttpException(
          {
            message: 'Không tồn tại bản ghi',
            data: id,
          },
          HttpStatus.NOT_FOUND,
        );
    } catch (err: any) {
      throw new HttpException(
        {
          message: err.message,
          data: id,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('get-by-type')
  async getTimeByTimeType(
    @Body() body: { timeType: string },
  ): Promise<void> {
    try {
      const { timeType } = body;
      const result =
        await this.timeService.getTimeByTimeType(timeType);
      if (result) {
        return result;
      } else
        throw new HttpException(
          {
            message: 'Không tồn tại bản ghi',
            data: timeType,
          },
          HttpStatus.NOT_FOUND,
        );
    } catch (err: any) {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
