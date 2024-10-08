import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import constants from '../config/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const is_post_url =
      request.route.path === '/url' && request.method == 'POST';

    if (!token && !is_post_url)
      throw new UnauthorizedException(
        'Unauthorized - Invalid or missing token',
      );

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: constants.JWT_SECRET,
      });
      request['user'] = payload;
    } catch (err) {
      if (err.message == 'jwt expired' || !is_post_url) {
        throw new UnauthorizedException(
          'Unauthorized - Invalid or missing token',
        );
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
