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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypesController = void 0;
const common_1 = require("@nestjs/common");
const product_type_service_1 = require("./product-type.service");
const dto_1 = require("./dto");
let ProductTypesController = class ProductTypesController {
    constructor(service) {
        this.service = service;
    }
    async createCategory(category) {
        return this.service.createCategory(category);
    }
    async getCategories() {
        return this.service.getCategories();
    }
    async getCategoryById(categoryId) {
        return this.service.getCategoryById(categoryId);
    }
    async updateCategoryById(categoryId, category) {
        return this.service.updateCategoryById(categoryId, category);
    }
    async deleteCategoryById(categoryId) {
        return this.service.deleteCategoryById(categoryId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof dto_1.CategoryDto !== "undefined" && dto_1.CategoryDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ProductTypesController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductTypesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductTypesController.prototype, "getCategoryById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof dto_1.CategoryDto !== "undefined" && dto_1.CategoryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ProductTypesController.prototype, "updateCategoryById", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductTypesController.prototype, "deleteCategoryById", null);
ProductTypesController = __decorate([
    (0, common_1.Controller)('product-types'),
    __metadata("design:paramtypes", [product_type_service_1.CategoriesService])
], ProductTypesController);
exports.ProductTypesController = ProductTypesController;
//# sourceMappingURL=product-type.controller.js.map