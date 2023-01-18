import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';
import { shouldBypassAuth } from '../decorators';
import { Role } from '../enums';

@Injectable()
export class GQLRolesGuard implements CanActivate {
  private audience: string;
  constructor(private reflector: Reflector, private config: ConfigService) {
    this.audience = this.config.get<string>('AUTH_AUDIENCE');
  }
  canActivate(ctx: GraphQLExecutionContext): boolean {
    const context = GqlExecutionContext.create(ctx);
    if (shouldBypassAuth(context, this.reflector)) {
      return true;
    }
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
    if (!requireRoles) {
      return true;
    }
    const req = context.getContext().req;
    const reqRoles = requireRoles?.some((role) => req?.user[`${this.audience}/roles`]?.includes(role));

    // Check if role exists then proceed otherwise throw exception
    if (reqRoles || shouldBypassAuth(context, this.reflector)) {
      return true;
    } else {
      throw new ForbiddenException('Not authorized to perform this action.');
    }
  }
}
