import {
  Controller,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Comment } from 'src/models';
import { CommentService } from './comment.service';
@Controller('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
  ) {}
  async createComment(
    comment: Comment,
  ): Promise<any> {
    try {
      const result =
        await this.commentService.createComment(
          comment,
        );
      if (result) {
        return {
          message: 'Created successfully',
          result: result,
        };
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Thêm không thành công!',
          },
          HttpStatus.BAD_REQUEST,
        );
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
}
