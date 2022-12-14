import { Module } from '@nestjs/common';
import { ImageUploadProvider } from './image-upload.provider';
import { ImageUploadService } from './image-upload.service';

@Module({
  providers: [ImageUploadProvider, ImageUploadService],
  exports: [ImageUploadProvider, ImageUploadService],
})
export class ImageUploadModule {}
