import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export const imageObjectsGenerator = (images: (UploadApiResponse | UploadApiErrorResponse)[]) => {
  return images.map((image) => ({
    public_id: image.public_id,
    url: image.secure_url,
    label: image.tags[1],
  }));
};
