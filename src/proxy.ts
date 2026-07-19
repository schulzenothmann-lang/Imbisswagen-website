import { NextResponse, type NextRequest } from "next/server";

import { ACCESS_COOKIE_NAME } from "@/lib/access";

export function proxy(request: NextRequest) {
  const password = process.env.SITE_PASSWORD;

  // Kein Passwort konfiguriert (z. B. lokale Entwicklung) → Gate deaktiviert.
  if (!password) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  if (cookie === password) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/warteraum";
  url.search = "";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|warteraum|favicon.ico|robots.txt|sitemap.xml|images|videos|.*\\.(?:svg|png|jpg|jpeg|mp4|ico)$).*)",
  ],
};
