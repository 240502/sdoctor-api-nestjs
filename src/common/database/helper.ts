import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseHelper {
  constructor(private readonly dataSource: DataSource) {}

  async callProcedure(
    procedureName: string,
    inputParams: any[],
  ): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      let placeholders: any = '';
      if (inputParams.length > 0) {
        placeholders = inputParams.map(() => '?').join(',');
      }
      const sql = `CALL ${procedureName}(${placeholders}${placeholders.length > 0 ? ',' : ' '}@err_code,@err_msg)`;
      const results = await queryRunner.query(sql, inputParams);
      const [errorResults] = await queryRunner.query(
        `SELECT @err_code AS err_code ,@err_msg AS err_msg`,
      );
      const { err_code, err_msg } = errorResults;
      if (err_code === '0') {
        return results[0];
      } else {
        throw new Error(err_msg);
      }
    } catch (err: any) {
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }
}
