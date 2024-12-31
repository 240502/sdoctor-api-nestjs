import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { Notifications } from 'src/models';
@Injectable()
export class NotificationsService {
  constructor(private db: DatabaseHelper) {}

  async getNotificationByUserId(
    userId: number,
  ): Promise<Notifications[] | null> {
    try {
      const procedureName = 'GetNotificationByUserId';
      const results = await this.db.callProcedure(procedureName, [
        userId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
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
    notification: Notifications,
  ): Promise<Notifications | null> {
    try {
      const procedureName = 'CreateNotification';
      const results = await this.db.callProcedure(procedureName, [
        notification.userId,
        notification.message,
        notification.appointmentId,
      ]);
      if (results) {
        return results;
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
