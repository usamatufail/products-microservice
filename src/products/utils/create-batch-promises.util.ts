import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export const createBatchPromises = (
  array: Express.Multer.File[],
  id: string,
  promiseFn: (id: string, file: Express.Multer.File) => Promise<UploadApiResponse | UploadApiErrorResponse>,
) => {
  return array.map((arrEl) => promiseFn(id, arrEl));
};
