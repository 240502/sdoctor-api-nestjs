import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { MajorService } from './major.service';

@Controller('major')
export class MajorController {
  constructor(private majorService: MajorService) {}

  @Get('get-common')
  async getCommonMajor(): Promise<any> {
    try {
      const result = await this.majorService.getCommonMajor();
      if (result.length > 0 && Array.isArray(result)) {
        return result;
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
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get-all')
  async getAllMajor(): Promise<any> {
    try {
      const result = await this.majorService.getAllMajor();
      if (result.length > 0 && Array.isArray(result)) {
        return result;
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
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get-by-id/:id')
  async getMajorById(@Param('id') id: number): Promise<void> {
    try {
      const result = await this.majorService.getMajorById(id);
      if (result) {
        return result;
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
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('view')
  async viewMajor(
    @Body() body: { pageIndex: number; pageSize: number },
  ): Promise<any> {
    try {
      const { pageIndex, pageSize } = body;
      const results = await this.majorService.viewMajor(
        pageIndex,
        pageSize,
      );
      if (results) {
        return {
          pageIndex: pageIndex,
          pageSize: pageSize,
          data: results,
          totalItems: results[0].RecordCount,
          pageCount: Math.ceil(results[0].RecordCount / pageSize),
        };
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
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
}
