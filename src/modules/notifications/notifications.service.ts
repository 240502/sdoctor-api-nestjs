import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { Notifications } from 'src/models';
import { NotificationResDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { NotificationCreateDto } from './dto/notification-create.dto';
@Injectable()
export class NotificationsService {
  constructor(private db: DatabaseHelper) {}

  async getNotificationByUserId(
    userId: number,
  ): Promise<NotificationResDto[] | null> {
    try {
      const procedureName = 'GetNotificationsByUserId';
      const results = await this.db.callProcedure(procedureName, [
        userId,
      ]);
      const formatResults: any[] = results.map((item: any) => {
        return {
          ...item,
          createdAt: item.created_at.toString().split('Z')[0],
        };
      });
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(NotificationResDto, formatResults);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async markAsRead(id: number): Promise<any> {
    try {
      const procedureName = 'markAsRead';
      await this.db.callProcedure(procedureName, [id]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async markAllRead(userId: number): Promise<any> {
    try {
      const procedureName = 'markAllRead';
      await this.db.callProcedure(procedureName, [userId]);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async createNotification(
    notification: NotificationCreateDto,
  ): Promise<NotificationResDto | null> {
    try {
      const procedureName = 'CreateNotification';
      const results = await this.db.callProcedure(procedureName, [
        notification.userId,
        notification.message,
        notification.appointmentId,
      ]);
      if (results) {
        return plainToInstance(NotificationResDto, results[0]);
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async deleteNotification(id: number): Promise<any> {
    try {
      const procedureName = 'DeleteNotification';
      await this.db.callProcedure(procedureName, [id]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
