import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoices } from 'src/models';
import {
  InvoiceCreateDto,
  InvoiceResponseDto,
  InvoiceUpdateDto,
} from './dto';
@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get('get-by-appointment-id/:appointmentId')
  async getInvoiceByAppointmentId(
    @Param('appointmentId') appointmentId: number,
  ): Promise<InvoiceResponseDto | null> {
    try {
      const invoice =
        await this.invoiceService.getInvoiceByAppointmentId(
          appointmentId,
        );
      if (invoice) {
        return invoice;
      } else
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
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

  @Post('create')
  async createInvoice(
    @Body() invoice: InvoiceCreateDto,
  ): Promise<any> {
    try {
      const newInvoice =
        await this.invoiceService.createInvoice(invoice);
      return {
        message: 'created successfully',
        result: newInvoice,
      };
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('/update')
  async updateInvoice(
    @Body() invoice: InvoiceUpdateDto,
  ): Promise<any> {
    try {
      await this.updateInvoice(invoice);
      return {
        message: 'updated successfully',
        result: true,
      };
    } catch (err: any) {
      throw new HttpException(
        { message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:id')
  async declareInvoice(@Param('id') id: number): Promise<any> {
    try {
      await this.invoiceService.deleteInvoice(id);
      return { message: 'Deleted successfully', result: true };
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get-recent')
  async getRecentInvoice(): Promise<any> {
    try {
      const results = await this.invoiceService.getRecentInvoice();
      if (results) {
        return results;
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
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('get-total-revenue')
  async getTotalRevenueByDateInNowWeek(
    @Body()
    body: {
      startWeek: Date;
      endWeek: Date;
      doctorId: number;
    },
  ): Promise<any> {
    try {
      const { startWeek, endWeek, doctorId } = body;
      const results =
        await this.invoiceService.getTotalRevenueByDateInNowWeek(
          startWeek,
          endWeek,
          doctorId,
        );
      if (results === 0) {
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
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('view')
  async viewInvoice(
    @Body()
    body: {
      pageIndex: number;
      pageSize: number;
      status: string;
    },
  ): Promise<any> {
    try {
      const { pageIndex, pageSize, status } = body;
      const results = await this.invoiceService.viewInvoice(
        pageIndex,
        pageSize,
        status,
      );
      if (Array.isArray(results) && results.length > 0) {
        return {
          pageIndex: pageIndex,
          pageSize: pageSize,
          totalItems: results[0].recordCount,
          pageCount: Math.ceil(results[0].recordCount / pageSize),
          data: results,
        };
      } else {
        throw new HttpException(
          {
            message: 'Không tồn tại bản ghi nào!',
            statusCode: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Put('update-status/')
  async updateInvoiceStatus(
    @Body() body: { id: number; status: string },
  ): Promise<any> {
    try {
      const { id, status } = body;

      await this.invoiceService.updateInvoiceStatus(id, status);
      return { message: 'updated successfully' };
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
