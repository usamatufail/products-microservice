import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
export declare class AuthorizationGuard implements CanActivate {
    private reflector;
    private config;
    private issuer;
    constructor(reflector: Reflector, config: ConfigService);
    canActivate(context: ExecutionContext): Promise<any>;
}
