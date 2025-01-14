import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseHelper } from 'src/common/database/helper';
import { PostCategoryResDto } from './dto';

@Injectable()
export class PostCategoryService {
  constructor(private db: DatabaseHelper) {}
  async getAllPostCategories(): Promise<PostCategoryResDto[] | null> {
    try {
      const sql = 'GetAllCategoryPost';
      const results = await this.db.callProcedure(sql, []);
      if (results.length > 0 && Array.isArray(results)) {
        return plainToInstance(PostCategoryResDto, results);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
