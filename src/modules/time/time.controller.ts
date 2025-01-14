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
import { TimeResponseDto } from './dto';

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
  ): Promise<TimeResponseDto[] | null> {
    try {
      const { timeType } = body;
      const result =
        await this.timeService.getTimeByTimeType(timeType);
      if (result) {
        return result;
      }
    } catch (err: any) {
      const statusCode = err?.status;
      throw new HttpException(
        {
          message: err.message,
        },
        statusCode,
      );
    }
  }
}
