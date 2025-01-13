// src/common/middlewares/multer.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  private upload;

  constructor() {
    this.upload = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    }).single('file'); // Tên trường trong form là 'file'
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: 'File upload error', error: err });
      }
      next();
    });
  }
}
