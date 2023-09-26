import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export type UniversalAccountId = string;

export const X_ACCOUNT_ID_HEADER = 'x-account-id';

export const UniversalAccountIdHeader = createParamDecorator((data, ctx: ExecutionContext): string => {
  const xAccountId = ctx.switchToHttp().getRequest().headers[X_ACCOUNT_ID_HEADER];
  if (xAccountId === undefined || xAccountId === null) {
    throw new UnauthorizedException('No x-account-id provided');
  }
  return xAccountId;
});
