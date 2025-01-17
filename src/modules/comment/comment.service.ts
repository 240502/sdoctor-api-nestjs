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
        comment.dateBooking,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        const dateFormatted = results[0].created_at
          ? results[0].created_at.toString().split('Z')[0]
          : null;
        return plainToInstance(CommentReposeDto, {
          ...results[0],
          created_at: dateFormatted,
        });
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
  ): Promise<CommentReposeDto[] | null> {
    try {
      const procedureName = 'GetCommentByDoctorId';
      const results = await this.db.callProcedure(procedureName, [
        pageIndex,
        pageSize,
        doctorId,
      ]);
      const formattedResults: any[] = results.map((result: any) => {
        return {
          ...result,
          created_at: result.created_at
            ? result.created_at.toString().split('Z')[0]
            : null,
        };
      });
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(CommentReposeDto, formattedResults);
      }
    } catch (err: any) {
      throw err;
    }
  }
}
