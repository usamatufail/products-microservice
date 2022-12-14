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
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor(logModel) {
        this.logModel = logModel;
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const userAgent = request.get('user-agent') || '';
        const { ip, method, path: url, user } = request;
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)((res) => {
            const response = context.switchToHttp().getResponse();
            const { statusCode } = response;
            const contentLength = response.get('content-length');
            const requestTime = `${Date.now() - now}ms`;
            this.insertMongo(method, url, statusCode, contentLength, userAgent, ip, requestTime, res, user === null || user === void 0 ? void 0 : user.user_id);
        }), (0, operators_1.catchError)((err) => {
            this.logger.error(err);
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
    async insertMongo(method, url, responseStatus, contentLength, userAgent, ip, requestTime, responseBody, userId) {
        const logInfo = {
            method,
            url,
            responseStatus,
            contentLength,
            userAgent,
            ip,
            requestTime,
            responseBody,
            userId,
        };
        const createdLog = new this.logModel(logInfo);
        return createdLog.save();
    }
};
LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Log')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=log.interceptor.js.map