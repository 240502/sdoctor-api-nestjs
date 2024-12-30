import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';

@Injectable()
export class DoctorScheduleDetailService {
  constructor(private db: DatabaseHelper) {}

  async updateAvailableScheduleDetails(
    scheduleDetailId: number,
  ): Promise<any> {
    try {
      const procedureName = 'UpdateAvailableScheduleDetails';
      await this.db.callProcedure(procedureName, [scheduleDetailId]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getScheduleDetailsByScheduleId(
    scheduleId: number,
  ): Promise<any> {
    try {
      const sql = 'getScheduleDetailsByScheduleId';
      const [results] = await this.db.callProcedure(sql, [
        scheduleId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}