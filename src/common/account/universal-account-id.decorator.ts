import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const X_ACCOUNT_ID_HEADER = 'x-account-id';

export const UniversalAccountId = createParamDecorator((data, ctx: ExecutionContext): string | null | undefined => {
  return ctx.switchToHttp().getRequest().headers[X_ACCOUNT_ID_HEADER];
});
