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
const jwksClient = require("jwks-rsa");
const jwt_promisify_1 = require("jwt-promisify");
const config_1 = require("@nestjs/config");
const decorators_1 = require("../decorators");
const core_1 = require("@nestjs/core");
const AUTHORIZATION_HEADER = 'authorization';
let AuthorizationGuard = class AuthorizationGuard {
    constructor(reflector, config) {
        this.reflector = reflector;
        this.config = config;
        this.issuer = this.config.get('AUTH0_DOMAIN');
    }
    async canActivate(context) {
        if ((0, decorators_1.shouldBypassAuth)(context, this.reflector)) {
            return true;
        }
        const req = context.getArgByIndex(0);
        try {
            const client = jwksClient({
                jwksUri: `${this.issuer}.well-known/jwks.json`,
            });
            function getKey(header, callback) {
                client.getSigningKey(header.kid, function (err, key) {
                    const signingKey = (key === null || key === void 0 ? void 0 : key.publicKey) || (key === null || key === void 0 ? void 0 : key.rsaPublicKey);
                    callback(null, signingKey);
                });
            }
            const token = req.headers[AUTHORIZATION_HEADER].split(' ')[1];
            const decoded = await (0, jwt_promisify_1.verify)(token, getKey);
            if (decoded === null || decoded === void 0 ? void 0 : decoded.user_id) {
                req.user = decoded;
                return true;
            }
            else {
                throw new common_1.UnauthorizedException('Not authorized');
            }
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Not authorized');
        }
    }
};
AuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, config_1.ConfigService])
], AuthorizationGuard);
exports.AuthorizationGuard = AuthorizationGuard;
//# sourceMappingURL=auth.guard.js.map