import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/models';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, DatabaseHelper],
  controllers: [PostController],
})
export class PostModule {}
