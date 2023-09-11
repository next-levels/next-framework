import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['nxt-model-lang'];
  }
);
