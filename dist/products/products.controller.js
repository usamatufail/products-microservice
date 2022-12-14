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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("../common");
const dto_1 = require("./dto");
const products_service_1 = require("./products.service");
const utils_1 = require("./utils");
let ProductsController = class ProductsController {
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    getAll(search = '', page = 1, limit = 10) {
        return this.service.getAll(search, page, limit);
    }
    getById(id) {
        return this.service.getById(id);
    }
    fullyUpdateById(id, dto) {
        return this.service.fullyUpdateById(id, dto);
    }
    partiallyUpdateById(id, dto) {
        return this.service.partiallyUpdateById(id, dto);
    }
    deleteById(id) {
        return this.service.deleteById(id);
    }
    partiallyUpdateVariantById(id, variantId, dto) {
        return this.service.partiallyUpdateVariantById(id, variantId, dto);
    }
    deleteVariantById(id, variantId) {
        return this.service.deleteVariantById(id, variantId);
    }
    replaceVariantsById(id, dto) {
        return this.service.replaceVariantsById(id, dto);
    }
    async uploadImage(req, id) {
        return this.service.uploadImages(req.files, id);
    }
    async updateImages(req, id) {
        return this.service.updateImages(req.files, id);
    }
    async updateImage(file, id, imageId) {
        return this.service.updateImage(file, id, imageId);
    }
    deleteImageById(id, imageId) {
        return this.service.deleteImageById(id, imageId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Creates a new product' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Gets All Products' }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        type: Number,
        example: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        type: String,
        description: 'Search products by categories, tags, name, variants, and createdAt etc. <br /> In order to search for date use date in one of these formats: `MM/DD/YYYY`, or `MM-DD-YYYY`',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        example: 10,
    }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Gets product by Id' }),
    __param(0, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Fully updates a product per id' }),
    __param(0, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.FullyUpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "fullyUpdateById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Partially updates a product per id' }),
    __param(0, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.PartiallyUpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "partiallyUpdateById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Deletes a product per id' }),
    __param(0, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteById", null);
__decorate([
    (0, common_1.Patch)(':id/variants/:variantId'),
    (0, swagger_1.ApiOperation)({ summary: 'Partially update a variant from a product per id' }),
    __param(0, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('variantId', common_2.ParseObjectIdPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, dto_1.PartiallyUpdateProductVariantDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "partiallyUpdateVariantById", null);
__decorate([
    (0, common_1.Delete)(':id/variants/:variantId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiOperation)({ summary: 'Deletes a variant of a product per id' }),
    __param(0, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('variantId', common_2.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteVariantById", null);
__decorate([
    (0, common_1.Put)(':id/variants'),
    (0, swagger_1.ApiOperation)({ summary: 'Batch update/replace variants for a product id' }),
    (0, swagger_1.ApiBody)({ type: [dto_1.ProductVariantDto] }),
    __param(0, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "replaceVariantsById", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload images in newly created product' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(utils_1.fileOptions),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Put)(':id/images'),
    (0, swagger_1.ApiOperation)({ summary: 'Batch Updates images in a Product' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(utils_1.fileOptions),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateImages", null);
__decorate([
    (0, common_1.Put)(':id/images/:imageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update image in a Product by Id' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(utils_1.singleFileOptions),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __param(2, (0, common_1.Param)('imageId', common_2.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Delete)(':id/image/:imageId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an image of a product per id' }),
    __param(0, (0, common_1.Param)('id', common_2.ParseObjectIdPipe)),
    __param(1, (0, common_1.Param)('imageId', common_2.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteImageById", null);
ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_2.Roles)(common_2.Role.ADMIN),
    (0, common_1.UseGuards)(common_2.AuthorizationGuard, common_2.RolesGuard),
    (0, common_1.Controller)('products'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseInterceptors)(common_2.LoggingInterceptor),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map