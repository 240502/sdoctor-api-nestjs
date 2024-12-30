import {
  Controller,
  Post as PostMethod,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from 'src/models';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @PostMethod('create')
  async createPost(@Body() post: Post): Promise<any> {
    try {
      const result = await this.postService.createPost(post);
      if (result) {
        return {
          message: 'Created successfully',
          result: result,
        };
      }
    } catch (err: any) {
      throw new HttpException(
        {
          message: err.message,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update')
  async updatePost(@Body() post: Post): Promise<any> {
    try {
      const result = await this.postService.updatePost(post);
      if (result) {
        return {
          message: 'Updated successfully',
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

  @Delete('delete/:id')
  async deletePost(@Param('id') id: number): Promise<any> {
    try {
      await this.postService.deletePost(id);
      return {
        message: 'Deleted successfully',
      };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  @Put('confirm/:id')
  async confirmPost(@Param('id') id: number): Promise<any> {
    try {
      await this.postService.confirmPost(id);
      return {
        message: 'Updated successfully',
      };
    } catch (err: any) {
      throw new HttpException(
        {
          message: err.message,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @PostMethod('view')
  async viewPost(
    @Body()
    body: {
      searchContent: string;
      categoryId: number;
      pageIndex: number;
      pageSize: number;
      status: string;
      authorId: number;
    },
  ): Promise<any> {
    try {
      const {
        searchContent,
        categoryId,
        pageIndex,
        pageSize,
        status,
        authorId,
      } = body;
      const results = await this.postService.viewPost(
        searchContent,
        categoryId,
        pageIndex,
        pageSize,
        status,
        authorId,
      );
      if (results) {
        return {
          pageIndex: pageIndex,
          pageSize: pageSize,
          data: results,
          pageCount: results[0].RecordCount / pageSize,
          totalItems: results[0].RecordCount,
          status: status,
          authorId: authorId,
          searchContent: searchContent,
        };
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new HttpException(
        {
          message: err.message,
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get-common')
  async getCommonPost(): Promise<any> {
    try {
      const results = await this.postService.getCommonPost();
      if (results) {
        return results;
      } else
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get-new-posts')
  async getNewPosts(): Promise<any> {
    try {
      const results = await this.postService.getNewPosts();
      if (results) {
        return results;
      } else
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update-views/:id')
  async updatePostViews(@Param('id') id: number): Promise<any> {
    try {
      await this.postService.updatePostViews(id);
      return {
        message: 'Updated successfully',
      };
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('get-by-id/:id')
  async getPostById(id: number): Promise<any> {
    try {
      const result = await this.postService.getPostById(id);
      if (result) {
        return result;
      } else {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Không tồn tại bản ghi nào!',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err: any) {
      throw new HttpException(
        { statusCode: HttpStatus.BAD_REQUEST, message: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @PostMethod('get-related-post')
  async getRelatedPost(
    @Body()
    body: {
      id: number;
      categoryId: number;
      pageIndex: number;
      pageSize: number;
    },
  ): Promise<any> {
    try {
      const { id, categoryId, pageIndex, pageSize } = body;
      const results = await this.postService.getRelatePost(
        id,
        categoryId,
        pageIndex,
        pageSize,
      );
      if (results) {
        return {
          pageIndex: pageIndex,
          pageSize: pageSize,
          totalItems: results[0].RecordCount,
          data: results,
          categoryId: categoryId,
          id: id,
        };
      }
    } catch (err: any) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
