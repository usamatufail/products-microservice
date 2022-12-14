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
exports.LogSchema = exports.Log = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Log = class Log {
};
__decorate([
    (0, mongoose_1.Prop)({ isRequired: true }),
    __metadata("design:type", String)
], Log.prototype, "method", void 0);
__decorate([
    (0, mongoose_1.Prop)({ isRequired: true }),
    __metadata("design:type", String)
], Log.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ isRequired: true }),
    __metadata("design:type", Number)
], Log.prototype, "responseStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], Log.prototype, "responseBody", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Log.prototype, "contentLength", void 0);
__decorate([
    (0, mongoose_1.Prop)({ isRequired: true }),
    __metadata("design:type", String)
], Log.prototype, "userAgent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ isRequired: true }),
    __metadata("design:type", String)
], Log.prototype, "ip", void 0);
__decorate([
    (0, mongoose_1.Prop)({ isRequired: true }),
    __metadata("design:type", String)
], Log.prototype, "responseTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ isRequired: true }),
    __metadata("design:type", String)
], Log.prototype, "userId", void 0);
Log = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Log);
exports.Log = Log;
exports.LogSchema = mongoose_1.SchemaFactory.createForClass(Log);
//# sourceMappingURL=log.schema.js.map