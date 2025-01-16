import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { CommentCreateDto, CommentReposeDto } from './dto';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class CommentService {
  constructor(private db: DatabaseHelper) {}

  async createComment(comment: CommentCreateDto): Promise<any> {
    try {
      const procedureName = 'CreateComment';
      const results = await this.db.callProcedure(procedureName, [
        comment.content,
        comment.fullName,
        comment.doctorId,
        comment.starCount,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(CommentReposeDto, results[0]);
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getCommentByDoctorId(
    pageIndex: number,
    pageSize: number,
    doctorId: number,
    type: string,
  ): Promise<CommentReposeDto[] | null> {
    try {
      const procedureName = 'GetCommentByDoctorId';
      const results = await this.db.callProcedure(procedureName, [
        pageIndex,
        pageSize,
        doctorId,
        type,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(CommentReposeDto, results);
      }
    } catch (err: any) {
      console.log(err);
      if (err.err_code) {
        // Ném lại lỗi từ helper
      }
      throw new Error(err.message);
    }
  }
}
