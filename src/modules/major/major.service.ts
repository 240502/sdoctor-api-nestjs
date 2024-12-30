import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';

@Injectable()
export class MajorService {
  constructor(private db: DatabaseHelper) {}
  async getCommonMajor(): Promise<any> {
    try {
      const sql = 'GetCommonMajor';
      const [results] = await this.db.callProcedure(sql, []);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getAllMajor(): Promise<any> {
    try {
      const sql = 'GetAllMajor';
      const [results] = await this.db.callProcedure(sql, []);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getMajorById(id: number): Promise<any> {
    try {
      const sql = 'GetMajorById';
      const [results] = await this.db.callProcedure(sql, [id]);
      if (Array.isArray(results) && results.length > 0) {
        return results[0];
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async viewMajor(pageIndex: number, pageSize: number): Promise<any> {
    try {
      const sql = 'ViewMajors';
      const [results] = await this.db.callProcedure(sql, [
        pageIndex,
        pageSize,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
