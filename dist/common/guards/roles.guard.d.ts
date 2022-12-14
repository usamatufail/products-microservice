import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private config;
    private audience;
    constructor(reflector: Reflector, config: ConfigService);
    canActivate(context: ExecutionContext): boolean;
}
