import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FrontendAuthGuard extends AuthGuard('local-frontend') {
  override handleRequest(error, user) {
    if (error) {
      throw error;
    }

    if (error || !user) {
      throw new HttpException('', HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
