import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseHelper } from 'src/common/database/helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/models';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService, DatabaseHelper],
  controllers: [CommentController],
})
export class CommentModule {}
