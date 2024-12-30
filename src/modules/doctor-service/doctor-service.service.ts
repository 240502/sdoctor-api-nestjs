import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';

@Injectable()
export class DoctorServiceService {
  constructor(private db: DatabaseHelper) {}

  async getAllDoctorService(): Promise<any> {
    try {
      const sql = 'GetAllDoctorService';
      const [results] = await this.db.callProcedure(sql, []);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
