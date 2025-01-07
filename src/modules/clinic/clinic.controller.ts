import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClinicService } from './clinic.service';
import {
  ClinicCreateDto,
  ClinicUpdateDto,
  ClinicResponseDto,
} from './dto';
import { ClinicFilterDto } from './dto/clinic-filter.dto';

@Controller('clinic')
export class ClinicController {
  constructor(private clinicService: ClinicService) {}

  @Post('create')
  async createClinic(@Body() clinic: ClinicCreateDto) {
    try {
      const result: ClinicResponseDto =
        await this.clinicService.createClinic(clinic);
      return {
        message: 'Created successfully',
        result: result,
      };
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

  @Put('update-views/:id')
  async updateClinicViews(@Param('id') id: number) {
    try {
      await this.clinicService.updateClinicViews(id);
      return {
        message: 'Updated successfully',
      };
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

  @Put('update')
  async updateClinic(@Body() clinic: ClinicUpdateDto) {
    try {
      await this.clinicService.updateClinic(clinic);
      return {
        message: 'Updated successfully',
      };
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
  @Delete('delete/:id')
  async deleteClinic(id: number) {
    try {
      await this.clinicService.deleteClinic(id);
      return {
        message: 'Deleted successfully',
      };
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
  async viewClinic(
    @Body()
    body: ClinicFilterDto,
  ) {
    try {
      const results: ClinicResponseDto[] =
        await this.clinicService.viewClinic(body);
      if (results) {
        return {
          pageIndex: body.pageIndex,
          pageSize: body.pageSize,
          pageCount: results[0].recordCount / body.pageSize,
          data: results,
          location: body.location,
          name: body.name,
        };
      } else {
        throw new HttpException(
          {
            message: 'Not found',
            statusCode: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_GATEWAY,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get-by-id/:id')
  async getClinicById(@Param('id') id: number): Promise<any> {
    try {
      const results: ClinicResponseDto =
        await this.clinicService.getClinicById(id);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
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
  @Get('get-common')
  async getCommonClinic(): Promise<any> {
    try {
      const results: ClinicResponseDto[] =
        await this.clinicService.getCommonClinic();
      if (results.length > 0 && Array.isArray(results)) {
        return results;
      } else {
        throw new HttpException(
          {
            message: 'Không tồn tại bản ghi nào!',
            statusCode: HttpStatus.NOT_FOUND,
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
