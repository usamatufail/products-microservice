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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_1 = require("./schema");
let CategoriesService = class CategoriesService {
    constructor(model) {
        this.model = model;
    }
    async createCategory(category) {
        return await this.model.create(category);
    }
    async getCategories() {
        return await this.model.find().exec();
    }
    async getCategoryById(categoryId) {
        return await this.model.findById(categoryId);
    }
    async updateCategoryById(categoryId, updatedDocument) {
        var _a, _b;
        try {
            const updated = await this.model.findOneAndUpdate({ _id: categoryId }, updatedDocument, { new: true });
            if (!updated) {
                throw new common_1.NotFoundException();
            }
            return updated;
        }
        catch (err) {
            const status = ((_a = err === null || err === void 0 ? void 0 : err.reason) === null || _a === void 0 ? void 0 : _a.message)
                ? common_1.HttpStatus.NOT_ACCEPTABLE
                : err === null || err === void 0 ? void 0 : err.status;
            throw new common_1.HttpException({ message: ((_b = err === null || err === void 0 ? void 0 : err.reason) === null || _b === void 0 ? void 0 : _b.message) || err.message }, status);
        }
    }
    async deleteCategoryById(categoryId) {
        const find = await this.model.findById(categoryId);
        if (!find) {
            throw new common_1.NotFoundException('Category not found');
        }
        await this.model.findByIdAndDelete(categoryId).exec();
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map