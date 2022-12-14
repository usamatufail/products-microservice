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
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_transformer_1 = require("class-transformer");
const mongoose_2 = require("mongoose");
const schema_1 = require("../../categories/schema");
const schema_2 = require("../../product-type/schema");
const product_image_schema_1 = require("./product-image.schema");
const product_variant_schema_1 = require("./product-variant.schema");
let Product = class Product {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, isUnique: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: product_variant_schema_1.ProductVariantSchema, required: true }),
    (0, class_transformer_1.Type)(() => product_variant_schema_1.ProductVariant),
    __metadata("design:type", product_variant_schema_1.ProductVariant)
], Product.prototype, "mainVariant", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: schema_2.ProductType.name,
        required: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "productType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [
            {
                type: mongoose_2.default.Schema.Types.ObjectId,
                ref: schema_1.Category.name,
            },
        ],
        required: true,
    }),
    (0, class_transformer_1.Type)(() => schema_1.Category),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: product_image_schema_1.ProductImageSchema }]),
    (0, class_transformer_1.Type)(() => product_image_schema_1.ProductImage),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [product_variant_schema_1.ProductVariantSchema] }),
    (0, class_transformer_1.Type)(() => product_variant_schema_1.ProductVariant),
    __metadata("design:type", Array)
], Product.prototype, "variants", void 0);
Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
exports.ProductSchema.index({ '$**': 'text' });
//# sourceMappingURL=products.schema.js.map