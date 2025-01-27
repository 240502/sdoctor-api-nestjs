import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import {
  PostCreateDto,
  PostFilterDto,
  PostResDto,
  PostUpdateDto,
} from './dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostService {
  constructor(private db: DatabaseHelper) {}
  async createPost(post: PostCreateDto): Promise<PostResDto> {
    try {
      const procedureName = 'CreatePost';
      const results = await this.db.callProcedure(procedureName, [
        post.title,
        post.content,
        post.authorId,
        post.categoryId,
        post.featuredImage,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(PostResDto, results[0]);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updatePost(post: PostUpdateDto): Promise<PostResDto> {
    try {
      const procedureName = 'UpdatePost';
      const results = await this.db.callProcedure(procedureName, [
        post.id,
        post.title,
        post.content,
        post.authorId,
        post.categoryId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(PostResDto, results[0]);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async deletePost(id: number): Promise<any> {
    try {
      const procedureName = 'DeletePost';
      await this.db.callProcedure(procedureName, [id]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async confirmPost(id: number): Promise<any> {
    try {
      const procedureName = 'ConfirmPost';
      await this.db.callProcedure(procedureName, [id]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async viewPost(body: PostFilterDto): Promise<PostResDto[] | null> {
    try {
      const procedureName = 'ViewPost';
      const results = await this.db.callProcedure(procedureName, [
        body.searchContent,
        body.categoryId,
        body.pageIndex,
        body.pageSize,
        body.status,
        body.authorId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(PostResDto, results);
      } else return null;
    } catch (err: any) {
      throw err;
    }
  }
  async getCommonPost(): Promise<PostResDto[]> {
    try {
      const procedureName = 'GetCommonPost';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(PostResDto, results);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getNewPosts(): Promise<PostResDto[]> {
    try {
      const procedureName = 'GetNewPosts';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(PostResDto, results);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updatePostViews(id: number): Promise<any> {
    try {
      const procedureName = 'UpdatePostViews';
      await this.db.callProcedure(procedureName, [id]);
      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getPostById(id: number): Promise<PostResDto> {
    try {
      const procedureName = 'GetPostById';
      const result = await this.db.callProcedure(procedureName, [id]);
      if (Array.isArray(result) && result.length > 0) {
        return plainToInstance(PostResDto, result[0]);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getRelatePost(
    id: number,
    categoryId: number,
    pageIndex: number,
    pageSize: number,
  ): Promise<PostResDto[]> {
    try {
      const procedureName = 'GetRelatedPost';
      const results = await this.db.callProcedure(procedureName, [
        id,
        categoryId,
        pageIndex,
        pageSize,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return plainToInstance(PostResDto, results);
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
