"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsModule = void 0;
const common_1 = require("@nestjs/common");
const logs_service_1 = require("./logs.service");
const logs_controller_1 = require("./logs.controller");
const mongoose_1 = require("@nestjs/mongoose");
const schema_1 = require("./schema");
let LogsModule = class LogsModule {
};
LogsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: schema_1.Log.name, schema: schema_1.LogSchema }])],
        providers: [logs_service_1.LogsService],
        controllers: [logs_controller_1.LogsController],
    })
], LogsModule);
exports.LogsModule = LogsModule;
//# sourceMappingURL=logs.module.js.map