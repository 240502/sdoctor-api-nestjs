import { Injectable } from '@nestjs/common';
import { DatabaseHelper } from 'src/common/database/helper';
import { Post } from 'src/models';

@Injectable()
export class PostService {
  constructor(private db: DatabaseHelper) {}
  async createPost(post: Post): Promise<any> {
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
        return results[0];
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async updatePost(post: Post): Promise<any> {
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
        return results[0];
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
  async viewPost(
    searchContent: string,
    categoryId: number,
    pageIndex: number,
    pageSize: number,
    status: string,
    authorId: number,
  ): Promise<any> {
    try {
      const procedureName = 'ViewPost';
      const results = await this.db.callProcedure(procedureName, [
        searchContent,
        categoryId,
        pageIndex,
        pageSize,
        status,
        authorId,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getCommonPost(): Promise<any> {
    try {
      const procedureName = 'GetCommonPost';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  async getNewPosts(): Promise<any> {
    try {
      const procedureName = 'GetNewPosts';
      const results = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(results) && results.length > 0) {
        return results;
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
  async getPostById(id: number): Promise<any> {
    try {
      const procedureName = 'GetPostById';
      const result = await this.db.callProcedure(procedureName, []);
      if (Array.isArray(result) && result.length > 0) {
        return result[0];
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
  ): Promise<any> {
    try {
      const procedureName = 'GetRelatedPost';
      const results = await this.db.callProcedure(procedureName, [
        id,
        categoryId,
        pageIndex,
        pageSize,
      ]);
      if (Array.isArray(results) && results.length > 0) {
        return results;
      } else return null;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
