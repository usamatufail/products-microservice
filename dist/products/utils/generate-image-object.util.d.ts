import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare const imageObjectsGenerator: (images: (UploadApiResponse | UploadApiErrorResponse)[]) => {
    public_id: any;
    url: any;
    label: any;
}[];
