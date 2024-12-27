import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Bật CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Địa chỉ frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Các phương thức được phép
    allowedHeaders: 'Content-Type, Authorization', // Các header được phép
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
  );
  await app.listen(process.env.PORT ?? 9999);
}
bootstrap();
