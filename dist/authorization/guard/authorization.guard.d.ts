import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AuthorizationGuard implements CanActivate {
    private config;
    private audience;
    private issuer;
    constructor(config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
