import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private paymentMethodService: PaymentMethodService) {}

  @Get('get-all')
  async getAllPaymentMethod(): Promise<any> {
    try {
      const data =
        await this.paymentMethodService.getAllPaymentMethod();
      if (data) {
        return data;
      } else {
        throw new HttpException(
          { message: 'Không có bản ghi nào!' },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new HttpException(
        { message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
