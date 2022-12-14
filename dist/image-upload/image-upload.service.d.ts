/// <reference types="multer" />
/// <reference types="multer-gridfs-storage" />
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare class ImageUploadService {
    uploadImage(id: string, file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
    deleteImage(public_id: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
