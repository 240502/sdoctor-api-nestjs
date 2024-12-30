import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';

@Injectable()
export class HomeMenuService {
  constructor(private db: DatabaseHelper) {}
  async getHomeMenu(): Promise<any> {
    try {
      const sql = 'GetHomeMenu';
      const results = await this.db.callProcedure(sql, []);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
