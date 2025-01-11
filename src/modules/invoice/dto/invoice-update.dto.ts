import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InvoiceCreateDto } from './invoice-create.dto';

export class InvoiceUpdateDto extends InvoiceCreateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  status: string;
}
