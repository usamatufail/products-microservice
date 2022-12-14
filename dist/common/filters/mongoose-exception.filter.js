"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseException = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const responseCreator = (response, request, error) => {
    return response.status(common_1.HttpStatus.BAD_REQUEST).json({
        error,
        timestamp: new Date().toISOString(),
        path: request.url,
    });
};
let MongooseException = class MongooseException {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        console.log(exception.message);
        return responseCreator(response, request, exception === null || exception === void 0 ? void 0 : exception.message);
    }
};
MongooseException = __decorate([
    (0, common_1.Catch)(mongoose_1.Error)
], MongooseException);
exports.MongooseException = MongooseException;
//# sourceMappingURL=mongoose-exception.filter.js.map