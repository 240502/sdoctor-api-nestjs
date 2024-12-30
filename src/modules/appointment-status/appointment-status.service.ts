import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { AppointmentStatus } from 'src/models';
@Injectable()
export class AppointmentStatusService {
  constructor(private db: DatabaseHelper) {}
  async getAllAppointmentStatus(): Promise<
    AppointmentStatus[] | null
  > {
    try {
      const procedureName = 'GetAllAppointmentStatus';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
