import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * getCurrentPlayerByContext
 * @param context ExecutionContext
 * @returns Player
 */
export const getCurrentPlayerByContext = (context: ExecutionContext) => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }
};

export const CurrentPlayer = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentPlayerByContext(context),
);
