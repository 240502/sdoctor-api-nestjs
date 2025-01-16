import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Bật CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Địa chỉ frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Các phương thức được phép
    allowedHeaders: 'Content-Type, Authorization', // Các header được phép
  });

  // Middleware
  app.use(bodyParser.json());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Đảm bảo tự động chuyển đổi các giá trị từ chuỗi sang số
      whitelist: true, // Chỉ cho phép các thuộc tính đã định nghĩa trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có thuộc tính không hợp lệ
    }),
  );

  // Lắng nghe server trên một cổng
  const port = process.env.PORT || 9999;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

bootstrap();
