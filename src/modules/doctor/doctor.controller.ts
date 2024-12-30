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
  Query,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from 'src/models/Doctor';

@Controller('doctor')
export class DoctorController {
  constructor(
    private doctorService: DoctorService,
  ) {}
  @Post('/create')
  async createDoctor(
    @Body() doctor: Doctor,
  ): Promise<any> {
    try {
      await this.doctorService.createDoctor(
        doctor,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully',
      };
    } catch (err: any) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: err.message,
      };
    }
  }

  @Post('/view')
  async viewDoctor(
    @Body() data: any,
  ): Promise<any> {
    try {
      const {
        pageIndex,
        pageSize,
        majorId,
        name,
        clinicId,
      } = data;
      const results: Doctor[] =
        await this.doctorService.viewDoctor(
          pageIndex,
          pageSize,
          majorId,
          name,
          clinicId,
        );
      if (results) {
        return {
          pageIndex: pageIndex,
          pageSize: pageSize,
          data: results,
          totalItems: results[0].RecordCount,
          pageCount: Math.ceil(
            results[0].RecordCount / pageSize,
          ),
          majorId: majorId,
          name: name,
          clinicId: clinicId,
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

  @Delete('/delete/:id')
  async deleteDoctor(@Param('id') id: number) {
    try {
      await this.doctorService.deleteDoctor(id);
      throw new HttpException(
        {
          statusCode: HttpStatus.OK,
          message: 'Xóa thành công!',
        },
        HttpStatus.OK,
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
  @Get('/get-by-id/:id')
  async getDoctorById(
    @Param('id') id: number,
  ): Promise<any> {
    try {
      const result =
        await this.doctorService.getDoctorById(
          id,
        );
      if (result) {
        return result;
      }
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: err.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('get-by-user-id/:userId')
  async getDoctorByUserId(
    @Param('userId') userId: number,
  ): Promise<any> {
    try {
      const result =
        await this.doctorService.getDoctorByUserId(
          userId,
        );
      console.log(result);
      if (result) {
        return result;
      }
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          message: err.message,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put('/update-doctor-views/:id')
  async updateDoctorViews(
    @Param('id') id: number,
  ): Promise<void> {
    await this.doctorService.updateDoctorViews(
      id,
    );
    throw new HttpException(
      {
        statusCode: HttpStatus.OK,
        message: 'Success',
      },
      HttpStatus.OK,
    );
  }
  catch(err: any) {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: err.message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  @Post('/get-common-doctor')
  async getCommonDoctor(@Body() data: any) {
    try {
      const { pageIndex, pageSize } = data;
      const results =
        await this.doctorService.getCommonDoctor(
          pageIndex,
          pageSize,
        );
      return {
        pageIndex: pageIndex,
        pageSize: pageSize,
        data: results,
      };
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
