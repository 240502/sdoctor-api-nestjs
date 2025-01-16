import {
  Controller,
  HttpStatus,
  HttpException,
  Get,
  Put,
  Delete,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notifications } from 'src/models';
import { NotificationResDto } from './dto';
import { SocketGateway } from 'src/common/shared/base.gateway';
import { NotificationCreateDto } from './dto/notification-create.dto';
@Controller('notifications')
export class NotificationsController {
  constructor(
    private notificationService: NotificationsService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Get('get-by-user-id/:userId')
  async getNotificationByUserId(
    @Param('userId') userId: number,
  ): Promise<any> {
    try {
      const results: NotificationResDto[] =
        await this.notificationService.getNotificationByUserId(
          userId,
        );
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
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('mark-as-read/:id')
  async markAsRead(@Param('id') id: number): Promise<any> {
    try {
      await this.notificationService.markAsRead(id);
      return {
        message: 'Updated successfully',
        result: true,
      };
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('mark-all-read/:userId')
  async markAllRead(@Param('userId') userId: number): Promise<any> {
    try {
      await this.notificationService.markAllRead(userId);
      return {
        message: 'Updated successfully',
        result: true,
      };
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('create')
  async createNotification(
    @Body() notification: NotificationCreateDto,
  ): Promise<any> {
    try {
      const result: NotificationResDto =
        await this.notificationService.createNotification(
          notification,
        );
      if (result) {
        const roomName = `user:${result.userId}`;
        this.socketGateway.emitToRoom(
          roomName,
          'newNotification',
          result,
        );
        return { message: 'Created successfully', result: result };
      }
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('delete/:id')
  async deleteNotification(@Param('id') id: number): Promise<any> {
    try {
      await this.notificationService.deleteNotification(id);
      return { message: 'Deleted successfully', result: true };
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
