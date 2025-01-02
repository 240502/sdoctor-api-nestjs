import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethodController } from './payment-method.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  providers: [PaymentMethodService, DatabaseHelper],
  controllers: [PaymentMethodController],
})
export class PaymentMethodModule {}
