import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { Role } from 'src/models/Role';
@Injectable()
export class RoleService {
  constructor(private readonly helper: DatabaseHelper) {}

  async getAllRole(): Promise<Role[] | null> {
    try {
      const procedureName = 'GetAllRole';
      const results = await this.helper.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
