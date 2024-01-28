import { setLocalizationConfigurations } from "@mongez/localization";
import { jsxConverter } from "@mongez/react-localization";
import { NextRequest, NextResponse } from "next/server";
import { pipeMiddlewares } from "./utils/pipeMiddlewares";

const locales = ["en", "ar"];

export async function localizationMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    setLocalizationConfigurations({
      converter: jsxConverter,
    });

    return;
  }

  request.nextUrl.pathname = `/${locales[0]}${pathname}`;
  const url = new URL(`/${locales[0]}${pathname}`, request.url);

  return NextResponse.redirect(url);
}

export default pipeMiddlewares([localizationMiddleware]);

export const config = {
  matcher: [
    "/",
    "/about-us",
    "/contact-us",
    "/blog/:path",
    "/properties/:path",
    "/profile/:path",
    "/auth/:path",
    "/privacy-policy",
    "/terms-and-conditions",
  ],
};
