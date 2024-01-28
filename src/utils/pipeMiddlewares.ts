import { NextRequest, NextResponse } from "next/server";

export type MiddlewareCallbackReturnType =
  | Promise<NextResponse | void | undefined>
  | NextResponse
  | void
  | undefined;

type MiddlewareCallback = (
  request: NextRequest
) => MiddlewareCallbackReturnType;

export function pipeMiddlewares(middlewares: MiddlewareCallback[]) {
  return async function middlewareHandler(request: NextRequest) {
    for (const middleware of middlewares) {
      const response = await middleware(request);

      if (response) {
        return response;
      }
    }
  };
}
