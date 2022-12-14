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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const product_variant_dto_1 = require("./product-variant.dto");
const objectId_validator_1 = require("../../common/validators/objectId.validator");
const product_image_dto_1 = require("./product-image.dto");
const product_variant_schema_1 = require("../schema/product-variant.schema");
const product_image_schema_1 = require("../schema/product-image.schema");
class ProductDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [product_variant_dto_1.ProductVariantDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => product_variant_schema_1.ProductVariant),
    __metadata("design:type", product_variant_schema_1.ProductVariant)
], ProductDto.prototype, "variants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: product_variant_dto_1.ProductVariantDto }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => product_variant_schema_1.ProductVariant),
    __metadata("design:type", product_variant_schema_1.ProductVariant)
], ProductDto.prototype, "mainVariant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(objectId_validator_1.ObjectIdValidator),
    __metadata("design:type", String)
], ProductDto.prototype, "productType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.Validate)(objectId_validator_1.ObjectIdValidator, { each: true }),
    __metadata("design:type", Array)
], ProductDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [product_image_dto_1.ProductImageDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => product_image_schema_1.ProductImage),
    __metadata("design:type", Array)
], ProductDto.prototype, "images", void 0);
exports.ProductDto = ProductDto;
//# sourceMappingURL=product.dto.js.map