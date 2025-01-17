import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { InvoiceService } from '../invoice/invoice.service';
import { DatabaseHelper } from 'src/common/database/helper';

@Module({
  providers: [InvoiceService, DatabaseHelper],
  controllers: [PaymentController],
})
export class PaymentModule {}
