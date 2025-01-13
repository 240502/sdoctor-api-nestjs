import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  // Log giá trị của CLOUDINARY_API_KEY
  const app = await NestFactory.create(AppModule);
  // Bật CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Địa chỉ frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Các phương thức được phép
    allowedHeaders: 'Content-Type, Authorization', // Các header được phép
  });
  app.use(bodyParser.json());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Đảm bảo tự động chuyển đổi các giá trị từ chuỗi sang số
      whitelist: true, // Chỉ cho phép các thuộc tính đã định nghĩa trong DTO
      forbidNonWhitelisted: true, // Nếu có thuộc tính không hợp lệ, sẽ báo lỗi
    }),
  ); // Nếu có thuộc tính không hợp lệ, sẽ báo lỗi));
  await app.listen(process.env.PORT ?? 9999);
}
bootstrap();
