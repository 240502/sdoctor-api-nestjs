import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { InvoiceService } from '../invoice/invoice.service';
import { InvoiceResponseDto } from '../invoice/dto';
import * as dayjs from 'dayjs';
import axios from 'axios';
import * as CryptoJS from 'crypto-js'; // npm install crypto-js
import { Request, Response } from 'express';

const config: any = {
  app_id: '2553',
  key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
  key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};

@Controller('payment')
export class PaymentController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('create')
  async createPayment(@Body() invoice: any): Promise<any> {
    try {
      const embed_data = {
        redirecturl: 'http://localhost:5173/patient/appointment',
      };

      const items = [invoice];
      const transID = Math.floor(Math.random() * 1000000);
      const app_trans_id = `${dayjs().format('YYMMDD')}_${transID}`;

      const order = {
        app_id: config.app_id,
        app_trans_id,
        app_user: 'user123',
        app_time: Date.now(),
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: invoice.amount,
        callback_url:
          'https://b25d-14-247-77-136.ngrok-free.app/payment/callback',
        description: `Thanh toán phí hẹn khám`,
        bank_code: '',
        mac: '',
      };

      const data =
        config.app_id +
        '|' +
        order.app_trans_id +
        '|' +
        order.app_user +
        '|' +
        order.amount +
        '|' +
        order.app_time +
        '|' +
        order.embed_data +
        '|' +
        order.item;

      order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

      const result = await axios.post(config.endpoint, null, {
        params: order,
      });
      console.log('result =', result.data);
      return result.data;
    } catch (err: any) {
      throw new HttpException(
        { message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('callback')
  async callBack(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const result: any = {};
    try {
      const { data: dataStr, mac: reqMac } = req.body;

      const mac = CryptoJS.HmacSHA256(
        dataStr,
        config.key2,
      ).toString();
      console.log('mac =', mac);

      if (reqMac !== mac) {
        result.return_code = -1;
        result.return_message = 'mac not equal';
      } else {
        const dataJson = JSON.parse(dataStr);
        const items = JSON.parse(dataJson.item);
        const invoiceId = items[0]?.id;

        console.log(
          "update order's status = success where app_trans_id =",
          dataJson['app_trans_id'],
        );

        await this.invoiceService.updateInvoiceStatus(
          invoiceId,
          'Đã thanh toán',
        );

        result.return_code = 1;
        result.return_message = 'success';
      }
    } catch (ex: any) {
      console.error('Error:', ex.message);
      result.return_code = 0;
      result.return_message = ex.message;
    }

    res.json(result);
  }
}
