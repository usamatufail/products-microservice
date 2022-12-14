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
exports.ProductTypeController = void 0;
const common_1 = require("@nestjs/common");
const product_type_service_1 = require("./product-type.service");
const dto_1 = require("./dto");
const swagger_1 = require("@nestjs/swagger");
const common_2 = require("../common");
let ProductTypeController = class ProductTypeController {
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return this.service.create(dto);
    }
    async getAll() {
        return this.service.getAll();
    }
    async getById(id) {
        return this.service.getById(id);
    }
    async updateById(id, dto) {
        return this.service.updateById(id, dto);
    }
    async deleteById(id) {
        return this.service.deleteById(id);
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ProductTypeDto]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ProductTypeDto]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "updateById", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductTypeController.prototype, "deleteById", null);
ProductTypeController = __decorate([
    (0, swagger_1.ApiTags)('Product Type'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_2.Roles)(common_2.Role.ADMIN),
    (0, common_1.UseGuards)(common_2.AuthorizationGuard, common_2.RolesGuard),
    (0, common_1.UseInterceptors)(common_2.LoggingInterceptor),
    (0, common_1.Controller)('product-type'),
    __metadata("design:paramtypes", [product_type_service_1.ProductTypeService])
], ProductTypeController);
exports.ProductTypeController = ProductTypeController;
//# sourceMappingURL=product-type.controller.js.map