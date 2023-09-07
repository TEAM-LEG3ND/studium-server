import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { X_ACCOUNT_ID_HEADER } from '../../common/account/universal-account-id.decorator';

export function SwaggerUniversalAccountId() {
  return applyDecorators(
    ApiHeader({
      name: X_ACCOUNT_ID_HEADER,
      description: 'account id from API Gateway',
    }),
  );
}
