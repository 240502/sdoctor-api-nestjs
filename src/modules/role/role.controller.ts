import {
  Controller,
  Get,
  Injectable,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('get-all')
  async getAllRole(): Promise<any> {
    try {
      const result = await this.roleService.getAllRole();
      if (result) {
        return result;
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Không tồn tại bản ghi nào',
        };
      }
    } catch (err: any) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}
