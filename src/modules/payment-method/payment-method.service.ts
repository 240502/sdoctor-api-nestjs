import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { PaymentMethod } from 'src/models';

@Injectable()
export class PaymentMethodService {
  constructor(private db: DatabaseHelper) {}
  async getAllPaymentMethod(): Promise<PaymentMethod[] | null> {
    try {
      const sql = 'GetAllPaymentMethod';
      const res = await this.db.callProcedure(sql, []);
      if (Array.isArray(res) && res.length > 0) {
        return res;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
