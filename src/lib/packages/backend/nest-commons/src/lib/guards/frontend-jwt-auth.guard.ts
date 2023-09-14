import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FrontendJwtAuthGuard extends AuthGuard('frontend-jwt') {
  override canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    request.isJwtFrontendProtected = true;
    return super.canActivate(context);
  }

  override handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
