import { Module } from '@nestjs/common';
import { PostCategoryService } from './post-category.service';
import { PostCategoryController } from './post-category.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCategory } from 'src/models';
@Module({
  imports: [TypeOrmModule.forFeature([PostCategory])],
  providers: [PostCategoryService, DatabaseHelper],
  controllers: [PostCategoryController],
})
export class PostCategoryModule {}
