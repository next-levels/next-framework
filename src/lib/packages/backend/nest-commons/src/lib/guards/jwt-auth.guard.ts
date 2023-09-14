import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    request.isJwtProtected = true;
    return super.canActivate(context);
  }

  override handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
