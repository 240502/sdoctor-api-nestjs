import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';

@Injectable()
export class TimeService {
  constructor(private db: DatabaseHelper) {}
  async getTimeById(id: number): Promise<any> {
    try {
      const sql = 'GetTimeById';
      const results = await this.db.callProcedure(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getTimeByTimeType(type: string): Promise<any> {
    try {
      const sql = 'getTimeByTimeType';
      const results = await this.db.callProcedure(sql, [type]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
