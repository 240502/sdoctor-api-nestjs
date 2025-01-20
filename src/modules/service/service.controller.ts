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
  UseGuards,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import {
  ServiceCreateDto,
  ServiceFilterDto,
  ServiceResDto,
  ServiceUpdateDto,
} from './dto';
import { AuthModule } from '../auth/auth.module';

@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}
  @Post('create')
  @UseGuards(AuthModule)
  async createService(
    @Body() service: ServiceCreateDto,
  ): Promise<any> {
    try {
      const result: ServiceResDto =
        await this.serviceService.createService(service);
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
  @UseGuards(AuthModule)
  async updateService(
    @Body() service: ServiceUpdateDto,
  ): Promise<any> {
    try {
      const result = await this.serviceService.updateService(service);
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
  @UseGuards(AuthModule)
  async deleteService(@Param('id') id: number): Promise<any> {
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
  async updateServiceViews(@Param('id') id: number): Promise<any> {
    try {
      await this.serviceService.updateServiceViews(id);
      return {
        message: 'Updated successfully',
        result: true,
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Get('get-by-id/:id')
  async getServiceById(@Param('id') id: number): Promise<any> {
    try {
      const result = await this.serviceService.getServiceById(id);
      if (result) return result;
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
    body: ServiceFilterDto,
  ): Promise<any> {
    try {
      const results: ServiceResDto[] =
        await this.serviceService.viewService(body);
      if (Array.isArray(results) && results.length > 0) {
        return {
          pageIndex: body.pageIndex,
          pageCount: results[0].recordCount / body.pageSize,
          pageSize: body.pageSize,
          data: results,
          name: body.name,
          startPrice: body.startPrice,
          endPrice: body.endPrice,
          clinicId: body.clinicId,
          categoryId: body.categoryId,
        };
      }
    } catch (err: any) {
      console.log(err.status);
      throw new HttpException({ message: err.message }, err.status);
    }
  }

  @Get('get-common')
  async getCommonService(): Promise<any> {
    try {
      const results: ServiceResDto[] =
        await this.serviceService.getCommonService();
      if (results.length > 0 && Array.isArray(results)) {
        return results;
      } else
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Not found!',
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
