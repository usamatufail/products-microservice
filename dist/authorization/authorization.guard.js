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
exports.AuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const jwks_rsa_1 = require("jwks-rsa");
const jwt_decode_1 = require("jwt-decode");
const util_1 = require("util");
const express_jwt_1 = require("express-jwt");
const config_1 = require("@nestjs/config");
const AUTHORIZATION_HEADER = 'authorization';
let AuthorizationGuard = class AuthorizationGuard {
    constructor(config) {
        this.config = config;
        this.audience = this.config.get('AUTH_AUDIENCE');
        this.issuer = this.config.get('AUTH0_DOMAIN');
    }
    async canActivate(context) {
        const req = context.getArgByIndex(0);
        const res = context.getArgByIndex(1);
        const checkJwt = (0, util_1.promisify)((0, express_jwt_1.expressjwt)({
            secret: (0, jwks_rsa_1.expressJwtSecret)({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${this.issuer}.well-known/jwks.json`,
            }),
            audience: `${this.audience}`,
            issuer: `${this.issuer}`,
            algorithms: ['RS256'],
        }));
        try {
            await checkJwt(req, res);
            const token = req.headers[AUTHORIZATION_HEADER].split(' ')[1];
            const decoded = (0, jwt_decode_1.default)(token);
            req.user = decoded;
            console.log(req.user);
            return true;
        }
        catch (e) {
            throw new common_1.UnauthorizedException(e);
        }
    }
};
AuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthorizationGuard);
exports.AuthorizationGuard = AuthorizationGuard;
//# sourceMappingURL=authorization.guard.js.map