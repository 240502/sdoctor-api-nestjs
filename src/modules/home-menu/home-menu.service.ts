import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { HomeMenuResDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class HomeMenuService {
  constructor(private db: DatabaseHelper) {}
  async getHomeMenu(): Promise<HomeMenuResDto[] | null> {
    try {
      const sql = 'GetHomeMenu';
      const results = await this.db.callProcedure(sql, []);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(HomeMenuResDto, results);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
