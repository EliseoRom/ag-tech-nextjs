import { NextResponse } from "next/server";
import { requestIsBlocked } from "@/lib/security";

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

export function middleware(request) {
  if (requestIsBlocked(request)) {
    return new NextResponse(BLOCKED_HTML, {
      status: 404,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-DNS-Prefetch-Control", "off");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
