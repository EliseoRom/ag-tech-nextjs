import { NextResponse } from "next/server";
import {
  getClientIp,
  isRateLimited,
  requestIsBlocked,
} from "@/lib/security";

const BLOCKED_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex,nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Not found</title>
    <style>
      html,body{margin:0;background:#0A0A0C;color:#FAFAFA;font-family:Inter,system-ui,sans-serif;min-height:100vh}
      main{padding:12vh 8vw;max-width:820px}
      p{color:rgba(250,250,250,.62);max-width:28rem;line-height:1.55}
      a{color:#38BDF8}
    </style>
  </head>
  <body>
    <main>
      <p>404</p>
      <h1>This path is closed.</h1>
      <p>The address does not exist, or the request was blocked.</p>
      <p><a href="/">Back to home</a></p>
    </main>
  </body>
</html>`;

function blockedResponse(status = 404) {
  return new NextResponse(BLOCKED_HTML, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Referrer-Policy": "no-referrer",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    },
  });
}

function applySecurityHeaders(response) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
  response.headers.delete("X-Powered-By");
  return response;
}

function applyCacheHeaders(request, response) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/twitter-image") ||
    pathname === "/og-preview.jpg"
  ) {
    // Stable social preview, but revalidate so crawlers can refresh
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
    );
    return response;
  }

  if (pathname === "/manifest.webmanifest" || pathname === "/icon") {
    response.headers.set(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=604800"
    );
    return response;
  }

  // HTML documents: avoid sticky browser cache of old metadata/UI
  response.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
  );
  response.headers.set("CDN-Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return response;
}

export function middleware(request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return blockedResponse(429);
  }

  if (requestIsBlocked(request)) {
    return blockedResponse(404);
  }

  const response = NextResponse.next();
  applySecurityHeaders(response);
  applyCacheHeaders(request, response);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|woff2?)$).*)",
  ],
};
