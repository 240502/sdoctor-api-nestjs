import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { Service } from 'src/models';

@Controller('service')
export class ServiceController {
  constructor(
    private serviceService: ServiceService,
  ) {}
  @Post('create')
  async createService(
    @Body() service: Service,
  ): Promise<any> {
    try {
      const result =
        await this.serviceService.createService(
          service,
        );
      if (result)
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

  @Put('update')
  async updateService(
    @Body() service: Service,
  ): Promise<any> {
    try {
      const result =
        await this.serviceService.updateService(
          service,
        );
      if (result)
        return {
          message: 'Updated successfully',
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

  @Delete('delete/:id')
  async deleteService(
    @Param('id') id: number,
  ): Promise<any> {
    try {
      await this.serviceService.deleteService(id);
      return {
        message: 'Deleted successfully',
        result: true,
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Put('update-views/:id')
  async updateServiceViews(
    @Param('id') id: number,
  ): Promise<any> {
    try {
      await this.serviceService.updateServiceViews(
        id,
      );
      return {
        message: 'Updated successfully',
        result: true,
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Get('get-by-id/:id')
  async getServiceById(
    @Param('id') id: number,
  ): Promise<any> {
    try {
      const result =
        await this.serviceService.getServiceById(
          id,
        );
      if (result)
        return {
          result,
        };
      else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Post('view')
  async viewService(
    @Body()
    body: {
      pageIndex: number;
      pageSize: number;
      clinicId: number;
      categoryId: number;
      startPrice: number;
      endPrice: number;
      name: string;
    },
  ): Promise<any> {
    try {
      const {
        pageIndex,
        pageSize,
        clinicId,
        categoryId,
        startPrice,
        endPrice,
        name,
      } = body;
      const results =
        await this.serviceService.viewService(
          pageIndex,
          pageSize,
          clinicId,
          categoryId,
          startPrice,
          endPrice,
          name,
        );
      if (
        Array.isArray(results) &&
        results.length > 0
      ) {
        return {
          pageIndex: pageIndex,
          pageCount:
            results[0].RecordCount / pageSize,
          pageSize: pageSize,
          data: results,
          name: name,
          startPrice: startPrice,
          endPrice: endPrice,
          clinicId: clinicId,
          categoryId: categoryId,
        };
      } else return null;
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get-common')
  async getCommonService(): Promise<any> {
    try {
      const results =
        await this.serviceService.getCommonService();
      if (
        results.length > 0 &&
        Array.isArray(results)
      ) {
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
        { message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
