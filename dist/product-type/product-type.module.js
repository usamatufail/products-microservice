"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTypeModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_type_controller_1 = require("./product-type.controller");
const product_type_service_1 = require("./product-type.service");
const schema_1 = require("./schema");
const schema_2 = require("../logs/schema");
let ProductTypeModule = class ProductTypeModule {
};
ProductTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: schema_1.ProductType.name, schema: schema_1.ProductTypeSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: schema_2.Log.name, schema: schema_2.LogSchema }]),
        ],
        controllers: [product_type_controller_1.ProductTypeController],
        providers: [product_type_service_1.ProductTypeService],
    })
], ProductTypeModule);
exports.ProductTypeModule = ProductTypeModule;
//# sourceMappingURL=product-type.module.js.map