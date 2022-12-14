import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
export declare const createBatchPromises: (array: Express.Multer.File[], id: string, promiseFn: (id: string, file: Express.Multer.File) => Promise<UploadApiResponse | UploadApiErrorResponse>) => Promise<UploadApiResponse | UploadApiErrorResponse>[];
