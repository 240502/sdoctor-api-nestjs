import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { Invoices } from 'src/models';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Invoices])],
  providers: [InvoiceService, DatabaseHelper],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
