import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';

@Controller('service-category')
export class ServiceCategoryController {
  constructor(
    private categoryServicesService: ServiceCategoryService,
  ) {}

  @Get('get-all')
  async getAll(): Promise<any> {
    try {
      const result = await this.categoryServicesService.getAll();
      if (result.length > 0 && Array.isArray(result)) {
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
        {
          message: err.message,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
