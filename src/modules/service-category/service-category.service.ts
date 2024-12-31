import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';

@Injectable()
export class ServiceCategoryService {
  constructor(private db: DatabaseHelper) {}
  async getAll(): Promise<any> {
    try {
      const sql = 'GetAllServiceCategory';
      const results = await this.db.callProcedure(sql, []);
      if (results.length > 0 && Array.isArray(results)) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
