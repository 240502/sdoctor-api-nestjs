import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { plainToInstance } from 'class-transformer';
import { AppointmentStatusResponse } from './dto';
@Injectable()
export class AppointmentStatusService {
  constructor(private db: DatabaseHelper) {}
  async getAllAppointmentStatus(): Promise<
    AppointmentStatusResponse[] | null
  > {
    try {
      const procedureName = 'GetAllAppointmentStatus';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(AppointmentStatusResponse, results);
      } else return null;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
