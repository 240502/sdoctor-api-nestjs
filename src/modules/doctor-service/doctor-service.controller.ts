import {
  Controller,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DoctorServiceService } from './doctor-service.service';

@Controller('doctor-service')
export class DoctorServiceController {
  constructor(private doctorServiceService: DoctorServiceService) {}
  async getAllDoctorServices(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const result =
        await this.doctorServiceService.getAllDoctorService();
      if (result) {
        return result;
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
