import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(error, user) {
    if (error && error.status === 409) {
      throw error;
    }

    if (error || !user) {
      throw new HttpException('', HttpStatus.FORBIDDEN);
    }

    return user;
  }
}
