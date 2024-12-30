import { Injectable } from '@nestjs/common';
import { Comment } from 'src/models';
import { DatabaseHelper } from 'src/common/database/helper';
@Injectable()
export class CommentService {
  constructor(private db: DatabaseHelper) {}

  async createComment(
    comment: Comment,
  ): Promise<any> {
    try {
      const procedureName = 'CreateComment';
      const results = await this.db.callProcedure(
        procedureName,
        [
          comment.content,
          comment.fullName,
          comment.doctorId,
          comment.startCount,
        ],
      );
      if (
        Array.isArray(results) &&
        results.length > 0
      ) {
        return results[0];
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
  ): Promise<Comment[] | null> {
    try {
      const procedureName =
        'GetCommentByDoctorId';
      const results = await this.db.callProcedure(
        procedureName,
        [pageIndex, pageSize, doctorId, type],
      );
      if (
        Array.isArray(results) &&
        results.length > 0
      ) {
        return results;
      } else {
        return null;
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
