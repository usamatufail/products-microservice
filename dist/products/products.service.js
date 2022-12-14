"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const image_upload_service_1 = require("../image-upload/image-upload.service");
const schema_1 = require("./schema");
const utils_1 = require("./utils");
const filter_products_util_1 = require("./utils/filter-products.util");
let ProductsService = class ProductsService {
    constructor(model, imageUpload) {
        this.model = model;
        this.imageUpload = imageUpload;
    }
    async create(dto) {
        const product = await new this.model(Object.assign({}, dto)).save();
        delete product.images;
        return product;
    }
    async getAll(search, page, limit) {
        let products;
        if (search) {
            const productDocs = await this.model
                .find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .populate('categories')
                .populate('productType');
            products = (0, filter_products_util_1.filterProducts)(search, productDocs);
        }
        else {
            products = await this.model
                .find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .populate('categories')
                .populate('productType');
        }
        const count = await this.model.count();
        return {
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            products,
        };
    }
    async getById(id) {
        const product = await this.model.findById(id).populate('categories').populate('productType');
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async partiallyUpdateVariantById(id, variantId, dto) {
        var _a, _b;
        const product = await this.model.findById(id).populate('categories').populate('productType');
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const productVariant = (_a = product === null || product === void 0 ? void 0 : product.variants) === null || _a === void 0 ? void 0 : _a.find((variant) => `${variant._id}` === variantId);
        if (!productVariant) {
            throw new common_1.NotFoundException('Variant not found');
        }
        product.variants = (_b = product.variants) === null || _b === void 0 ? void 0 : _b.map((variant) => {
            if (`${variant._id}` === variantId) {
                return Object.assign(Object.assign({}, productVariant), dto);
            }
            else {
                return variant;
            }
        });
        await product.save();
        return product.variants;
    }
    async deleteVariantById(id, variantId) {
        var _a;
        const product = await this.model.findById(id).populate('categories').populate('productType');
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const productVariant = (_a = product === null || product === void 0 ? void 0 : product.variants) === null || _a === void 0 ? void 0 : _a.find((variant) => `${variant._id}` === variantId);
        if (!productVariant) {
            throw new common_1.NotFoundException('Variant not found');
        }
        product.variants = product.variants.filter((variant) => `${variant._id}` !== variantId);
        await product.save();
        return product.variants;
    }
    async replaceVariantsById(id, dto) {
        const product = await this.model.findById(id).populate('categories').populate('productType');
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const filter = { _id: id };
        const updated = await this.model.findOneAndUpdate(filter, { variants: dto }, { new: true });
        return updated.variants;
    }
    async fullyUpdateById(id, dto) {
        const product = await this.model.findById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        delete product.images;
        return await this.model.findByIdAndUpdate(id, dto, { new: true });
    }
    async partiallyUpdateById(id, dto) {
        const product = await this.model.findById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        delete product.images;
        return await this.model.findByIdAndUpdate(id, dto, { new: true });
    }
    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }
    async uploadImages(images, id) {
        try {
            const product = await this.model.findById(id);
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            if ((images === null || images === void 0 ? void 0 : images.length) > 4) {
                throw new common_1.BadRequestException('You cannot upload more than 4 images');
            }
            const uploadedImages = await Promise.all((0, utils_1.createBatchPromises)(images, id, this.imageUpload.uploadImage));
            const updated = await this.model.findByIdAndUpdate(id, { images: (0, utils_1.imageObjectsGenerator)(uploadedImages) }, { new: true });
            return updated;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async updateImages(images, id) {
        try {
            const product = await this.model.findById(id);
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            if (images.length > 4) {
                throw new common_1.BadRequestException('You cannot upload more than 4 images');
            }
            if (!product.images.length) {
                throw new common_1.NotFoundException('No images found, please upload images first.');
            }
            const removePromises = product.images.map((image) => {
                return this.imageUpload.deleteImage(image.public_id);
            });
            await Promise.all(removePromises);
            const uploadedImages = await Promise.all((0, utils_1.createBatchPromises)(images, id, this.imageUpload.uploadImage));
            const updated = await this.model.findByIdAndUpdate(id, { images: (0, utils_1.imageObjectsGenerator)(uploadedImages) }, { new: true });
            return updated;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async updateImage(file, id, imageId) {
        var _a;
        try {
            const product = await this.model.findById(id);
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            const image = product.images.find((image) => {
                return `${image._id}` === imageId;
            });
            if (!image) {
                throw new common_1.NotFoundException('No image found, please check if Id is correct or upload images first.');
            }
            await this.imageUpload.deleteImage(image.public_id);
            const res = await this.imageUpload.uploadImage(id, file);
            product.images = (_a = product.images) === null || _a === void 0 ? void 0 : _a.map((image) => {
                if (`${image._id}` === imageId) {
                    return Object.assign(Object.assign({}, image), { public_id: res.public_id, url: res.secure_url, label: res.tags[1] });
                }
                else {
                    return image;
                }
            });
            product.save();
            return product.images;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async deleteImageById(id, imageId) {
        var _a;
        try {
            const product = await this.model.findById(id);
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            const image = product.images.find((image) => {
                return `${image._id}` === imageId;
            });
            if (!image) {
                throw new common_1.NotFoundException('No image found, please check if Id is correct or upload images first.');
            }
            await this.imageUpload.deleteImage(image.public_id);
            product.images = (_a = product.images) === null || _a === void 0 ? void 0 : _a.filter((image) => `${image._id}` !== imageId);
            product.save();
            return product.images;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        image_upload_service_1.ImageUploadService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map