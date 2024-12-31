import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostCategoryService } from './post-category.service';

@Controller('post-category')
export class PostCategoryController {
  constructor(private postCategoryService: PostCategoryService) {}

  @Get('get-all')
  async getAllPostCategory(): Promise<any> {
    try {
      const results =
        await this.postCategoryService.getAllPostCategories();
      return results;
    } catch (err) {
      throw new HttpException(
        { message: err.message, statusCode: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
