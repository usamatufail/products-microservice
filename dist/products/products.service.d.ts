/// <reference types="multer" />
/// <reference types="multer-gridfs-storage" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/aggregate" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/callback" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/collection" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/connection" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/cursor" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/document" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/error" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/expressions" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/helpers" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/middlewares" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/indexes" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/models" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/mongooseoptions" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/pipelinestage" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/populate" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/query" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/schemaoptions" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/schematypes" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/session" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/types" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/utility" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/validation" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/virtuals" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="multer-gridfs-storage/node_modules/mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { ImageUploadService } from '../image-upload/image-upload.service';
import { PartiallyUpdateProductDto, CreateProductDto, FullyUpdateProductDto, ProductVariantDto, PartiallyUpdateProductVariantDto } from './dto';
import { Product, ProductsDocument } from './schema';
import { ProductVariant } from './schema/product-variant.schema';
export declare class ProductsService {
    private readonly model;
    private readonly imageUpload;
    constructor(model: Model<ProductsDocument>, imageUpload: ImageUploadService);
    create(dto: CreateProductDto): Promise<Product>;
    getAll(search: string, page: number, limit: number): Promise<{
        products: Product[];
        totalPages: number;
        currentPage: number;
    }>;
    getById(id: string): Promise<Product>;
    partiallyUpdateVariantById(id: string, variantId: string, dto: PartiallyUpdateProductVariantDto): Promise<ProductVariant[]>;
    deleteVariantById(id: string, variantId: string): Promise<ProductVariant[]>;
    replaceVariantsById(id: string, dto: ProductVariantDto[]): Promise<ProductVariant[]>;
    fullyUpdateById(id: string, dto: FullyUpdateProductDto): Promise<Product>;
    partiallyUpdateById(id: string, dto: PartiallyUpdateProductDto): Promise<Product>;
    deleteById(id: string): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadImages(images: Express.Multer.File[], id: string): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateImages(images: Express.Multer.File[], id: string): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateImage(file: Express.Multer.File, id: string, imageId: string): Promise<import("./schema/product-image.schema").ProductImage[]>;
    deleteImageById(id: string, imageId: string): Promise<import("./schema/product-image.schema").ProductImage[]>;
}
