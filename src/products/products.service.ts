import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageUploadService } from '../image-upload/image-upload.service';
import {
  PartiallyUpdateProductDto,
  CreateProductDto,
  FullyUpdateProductDto,
  ProductVariantDto,
  PartiallyUpdateProductVariantDto,
} from './dto';
import { Product, ProductsDocument } from './schema';
import { ProductVariant } from './schema/product-variant.schema';
import { createBatchPromises, imageObjectsGenerator } from './utils';
import { filterProducts } from './utils/filter-products.util';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductsDocument>,
    private readonly imageUpload: ImageUploadService,
  ) {}

  // Create Product
  async create(dto: CreateProductDto): Promise<Product> {
    const product = await new this.model({
      ...dto,
    }).save();
    delete product.images;
    return product;
  }

  // Get All Products
  async getAll(search?: string, page?: number, limit?: number): Promise<{ products: Product[]; totalPages: number; currentPage: number }> {
    let products: Product[];
    if (search) {
      const productDocs = await this.model
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('categories')
        .populate('productType');
      products = filterProducts(search, productDocs);
    } else {
      products = await this.model
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .populate('categories')
        .populate('productType');
    }

    // get total documents in the Posts collection
    const count = await this.model.count();
    return {
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      products,
    };
  }

  // Get Product by Id
  async getById(id: string): Promise<Product> {
    const product = await this.model.findById(id).populate('categories').populate('productType');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // Partially Update Variant By Id
  async partiallyUpdateVariantById(id: string, variantId: string, dto: PartiallyUpdateProductVariantDto): Promise<ProductVariant[]> {
    const product = await this.model.findById(id).populate('categories').populate('productType');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const productVariant = product?.variants?.find((variant: any) => `${variant._id}` === variantId);
    if (!productVariant) {
      throw new NotFoundException('Variant not found');
    }
    product.variants = product.variants?.map((variant: any) => {
      if (`${variant._id}` === variantId) {
        return { ...productVariant, ...dto };
      } else {
        return variant;
      }
    });
    await product.save();
    return product.variants;
  }

  // Delete Variant By Id
  async deleteVariantById(id: string, variantId: string): Promise<ProductVariant[]> {
    const product = await this.model.findById(id).populate('categories').populate('productType');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const productVariant = product?.variants?.find((variant: any) => `${variant._id}` === variantId);
    if (!productVariant) {
      throw new NotFoundException('Variant not found');
    }
    product.variants = product.variants.filter((variant: any) => `${variant._id}` !== variantId);
    await product.save();
    return product.variants;
  }

  // Replace Variant By Id
  async replaceVariantsById(id: string, dto: ProductVariantDto[]): Promise<ProductVariant[]> {
    const product = await this.model.findById(id).populate('categories').populate('productType');
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const filter = { _id: id };
    const updated = await this.model.findOneAndUpdate(filter, { variants: dto }, { new: true });
    return updated.variants;
  }

  // Fully Update Product by Id
  async fullyUpdateById(id: string, dto: FullyUpdateProductDto): Promise<Product> {
    const product = await this.model.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    delete product.images;
    return await this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  // Partially Update Product by Id
  async partiallyUpdateById(id: string, dto: PartiallyUpdateProductDto): Promise<Product> {
    const product = await this.model.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    delete product.images;
    return await this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  // Delete Product by Id
  async deleteById(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  // Upload Images
  async uploadImages(images: Express.Multer.File[], id: string) {
    try {
      const product = await this.model.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      if (images?.length > 4) {
        throw new BadRequestException('You cannot upload more than 4 images');
      }
      const uploadedImages = await Promise.all(createBatchPromises(images, id, this.imageUpload.uploadImage));
      const updated = await this.model.findByIdAndUpdate(id, { images: imageObjectsGenerator(uploadedImages) }, { new: true });
      return updated;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // Update Images
  async updateImages(images: Express.Multer.File[], id: string) {
    try {
      const product = await this.model.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      if (images.length > 4) {
        throw new BadRequestException('You cannot upload more than 4 images');
      }
      if (!product.images.length) {
        throw new NotFoundException('No images found, please upload images first.');
      }
      // Remove Previous
      const removePromises = product.images.map((image) => {
        return this.imageUpload.deleteImage(image.public_id);
      });
      await Promise.all(removePromises);
      // Add new images
      const uploadedImages = await Promise.all(createBatchPromises(images, id, this.imageUpload.uploadImage));
      const updated = await this.model.findByIdAndUpdate(id, { images: imageObjectsGenerator(uploadedImages) }, { new: true });
      return updated;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // Update Image By Id
  async updateImage(file: Express.Multer.File, id: string, imageId: string) {
    try {
      const product = await this.model.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      const image = product.images.find((image: any) => {
        return `${image._id}` === imageId;
      });
      if (!image) {
        throw new NotFoundException('No image found, please check if Id is correct or upload images first.');
      }
      // Remove Previous
      await this.imageUpload.deleteImage(image.public_id);
      // Upload New Image
      const res = await this.imageUpload.uploadImage(id, file);

      product.images = product.images?.map((image: any) => {
        if (`${image._id}` === imageId) {
          return { ...image, public_id: res.public_id, url: res.secure_url, label: res.tags[1] };
        } else {
          return image;
        }
      });
      product.save();
      return product.images;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  // Delete Image By Id
  async deleteImageById(id: string, imageId: string) {
    try {
      const product = await this.model.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      const image = product.images.find((image: any) => {
        return `${image._id}` === imageId;
      });
      if (!image) {
        throw new NotFoundException('No image found, please check if Id is correct or upload images first.');
      }
      // Remove Previous
      await this.imageUpload.deleteImage(image.public_id);
      // Remove Image from Document
      product.images = product.images?.filter((image: any) => `${image._id}` !== imageId);
      product.save();
      return product.images;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
