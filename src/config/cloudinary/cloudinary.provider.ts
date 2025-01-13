import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ckeditor_uploads', // Tên folder trên Cloudinary
    format: async () => 'png', // Định dạng file (png, jpg,...)
    public_id: (req, file) => file.originalname.split('.')[0], // Đặt tên file
  } as any, // Thêm "as any" để tránh lỗi TypeScript
});
