import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { DoctorServiceResDto } from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DoctorServiceService {
  constructor(private db: DatabaseHelper) {}

  async getAllDoctorService(): Promise<DoctorServiceResDto[]> {
    try {
      const sql = 'GetAllDoctorService';
      const results = await this.db.callProcedure(sql, []);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(DoctorServiceResDto, results);
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
