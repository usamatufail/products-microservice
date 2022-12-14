"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const event_emitter_1 = require("@nestjs/event-emitter");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const product_type_module_1 = require("./product-type/product-type.module");
const image_upload_module_1 = require("./image-upload/image-upload.module");
const logs_module_1 = require("./logs/logs.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot({
                wildcard: true,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [
                    config_1.ConfigModule.forRoot({
                        envFilePath: '.env',
                    }),
                ],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    uri: config.get('MONGODB_URI'),
                }),
            }),
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            product_type_module_1.ProductTypeModule,
            image_upload_module_1.ImageUploadModule,
            logs_module_1.LogsModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map