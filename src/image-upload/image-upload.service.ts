import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class ImageUploadService {
  public async uploadImage(
    id: string,
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { tags: `${id}, ${file?.fieldname}` },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  public async deleteImage(
    public_id: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.uploader.destroy(public_id);
  }
}
