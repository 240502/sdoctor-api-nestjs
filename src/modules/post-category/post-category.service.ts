import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';

@Injectable()
export class PostCategoryService {
  constructor(private db: DatabaseHelper) {}
  async getAllPostCategories(): Promise<any> {
    try {
      const sql = 'GetAllCategoryPost';
      const results = await this.db.callProcedure(sql, []);
      if (results.length > 0 && Array.isArray(results)) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
