import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UniversalAccountId = string | null | undefined;

export const X_ACCOUNT_ID_HEADER = 'x-account-id';

export const UniversalAccountIdHeader = createParamDecorator(
  (data, ctx: ExecutionContext): string | null | undefined => {
    return ctx.switchToHttp().getRequest().headers[X_ACCOUNT_ID_HEADER];
  },
);
