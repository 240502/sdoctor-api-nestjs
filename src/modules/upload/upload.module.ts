import {
  Module,
  MiddlewareConsumer,
  NestModule,
} from '@nestjs/common';
import * as multer from 'multer';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { cloudinaryStorage } from 'src/config/cloudinary/cloudinary.provider';
import { MulterMiddleware } from 'src/common/middlewares/multer.middleware';
@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // Nơi lưu tạm file
      storage: multer.memoryStorage(), // Lưu file vào bộ nhớ
    }),
    MulterModule.register({
      storage: cloudinaryStorage,
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MulterMiddleware) // Áp dụng middleware
      .forRoutes('upload'); // Áp dụng cho route 'upload'
  }
}
