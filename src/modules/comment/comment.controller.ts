import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentCreateDto, CommentReposeDto } from './dto';
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('create')
  async createComment(
    @Body() comment: CommentCreateDto,
  ): Promise<any> {
    try {
      const result: CommentReposeDto =
        await this.commentService.createComment(comment);
      if (result) {
        return {
          message: 'Created successfully',
          result: result,
        };
      }
    } catch (err: any) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('get-comment-by-doctor-id')
  async getCommentByDoctorId(
    @Body()
    body: {
      pageIndex: number;
      pageSize: number;
      doctorId: number;
    },
  ): Promise<any> {
    try {
      const { pageIndex, pageSize, doctorId } = body;
      const results: CommentReposeDto[] =
        await this.commentService.getCommentByDoctorId(
          pageIndex,
          pageSize,
          doctorId,
        );
      if (results) {
        return {
          pageIndex: pageIndex,
          pageSize: pageSize,
          data: results,
          doctorId: doctorId,
          totalItems: results[0].recordCount,
          pageCount: Math.ceil(results[0].recordCount / pageSize),
        };
      }
    } catch (err: any) {
      // Nếu lỗi là một HttpException, trả về lỗi gốc mà không ghi đè
      const statusCode: number = err.status;
      throw new HttpException({ message: err.message }, statusCode);
    }
  }
}
