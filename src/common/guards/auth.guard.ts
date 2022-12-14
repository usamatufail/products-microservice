import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwksClient from 'jwks-rsa';
import { verify } from 'jwt-promisify';
import { JwtHeader, SignCallback } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { shouldBypassAuth } from '../decorators';
import { Reflector } from '@nestjs/core';

const AUTHORIZATION_HEADER = 'authorization';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private issuer: string;
  constructor(private reflector: Reflector, private config: ConfigService) {
    this.issuer = this.config.get<string>('AUTH0_DOMAIN');
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    if (shouldBypassAuth(context, this.reflector)) {
      return true;
    }
    const req = context.getArgByIndex(0);
    try {
      const client = jwksClient({
        jwksUri: `${this.issuer}.well-known/jwks.json`,
      });

      function getKey(header: JwtHeader, callback: SignCallback) {
        client.getSigningKey(header.kid, function (err, key: any) {
          const signingKey = key?.publicKey || key?.rsaPublicKey;
          callback(null, signingKey);
        });
      }

      const token = req.headers[AUTHORIZATION_HEADER].split(' ')[1];
      const decoded = await verify(token, getKey as any);

      if (decoded?.user_id) {
        req.user = decoded;
        return true;
      } else {
        throw new UnauthorizedException('Not authorized');
      }
    } catch (e) {
      throw new UnauthorizedException('Not authorized');
    }
  }
}
