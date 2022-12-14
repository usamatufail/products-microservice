import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { shouldBypassAuth } from '../decorators';
import { Role } from '../enums';

@Injectable()
export class RolesGuard implements CanActivate {
  private audience: string;
  constructor(private reflector: Reflector, private config: ConfigService) {
    this.audience = this.config.get<string>('AUTH_AUDIENCE');
  }
  canActivate(context: ExecutionContext): boolean {
    if (shouldBypassAuth(context, this.reflector)) {
      return true;
    }
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
    if (!requireRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const reqRoles = requireRoles.some((role) => user[`${this.audience}/roles`].includes(role));

    // Check if role exists then proceed otherwise throw exception
    if (reqRoles || shouldBypassAuth(context, this.reflector)) {
      return true;
    } else {
      throw new ForbiddenException('Not authorized to perform this action.');
    }
  }
}
