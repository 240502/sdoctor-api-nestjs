import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    try {
      const result: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'ckeditor_uploads' },
            (error, result) => {
              if (error) {
                console.error('Cloudinary Upload Error:', error);
                reject(error);
              } else if (result) {
                console.log(
                  `Successfully uploaded: ${result.secure_url}`,
                );

                resolve(result);
              } else {
                reject('No result from Cloudinary');
              }
            },
          );
          stream.end(file.buffer);
        },
      );

      return {
        url: result.secure_url, // URL của file trên Cloudinary
        public_id: result.public_id, // ID file
      };
    } catch (err: any) {
      console.error('Error during file upload:', err);
      throw new BadRequestException('File upload failed');
    }
  }
}
