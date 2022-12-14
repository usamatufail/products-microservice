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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const decorators_1 = require("../decorators");
let RolesGuard = class RolesGuard {
    constructor(reflector, config) {
        this.reflector = reflector;
        this.config = config;
        this.audience = this.config.get('AUTH_AUDIENCE');
    }
    canActivate(context) {
        if ((0, decorators_1.shouldBypassAuth)(context, this.reflector)) {
            return true;
        }
        const requireRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
        if (!requireRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        const reqRoles = requireRoles.some((role) => user[`${this.audience}/roles`].includes(role));
        if (reqRoles || (0, decorators_1.shouldBypassAuth)(context, this.reflector)) {
            return true;
        }
        else {
            throw new common_1.ForbiddenException('Not authorized to perform this action.');
        }
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, config_1.ConfigService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map