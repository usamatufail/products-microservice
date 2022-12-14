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
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const schema_1 = require("./schema");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(model) {
        this.model = model;
    }
    intercept(context, next) {
        var _a, _b;
        const req = (_a = context === null || context === void 0 ? void 0 : context.switchToHttp()) === null || _a === void 0 ? void 0 : _a.getRequest();
        const { statusCode } = (_b = context === null || context === void 0 ? void 0 : context.switchToHttp()) === null || _b === void 0 ? void 0 : _b.getResponse();
        const { originalUrl, method, params, query, body, headers, user } = req;
        const requestTime = new Date();
        const request = {
            originalUrl,
            method,
            params,
            query,
            body,
            headers,
        };
        return next.handle().pipe((0, rxjs_1.tap)((data) => {
            const response = { statusCode, data };
            this.insertMongo(originalUrl, request, response, requestTime, user);
        }));
    }
    async insertMongo(endpoint, request, response, requestTime, user) {
        const logInfo = {
            endpoint,
            request,
            response,
            requestTime,
            user: (user === null || user === void 0 ? void 0 : user.id) ? user === null || user === void 0 ? void 0 : user.id : 'public',
        };
        const createdLog = new this.model(logInfo);
        return createdLog.save();
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schema_1.Log.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=logs.middleware.js.map