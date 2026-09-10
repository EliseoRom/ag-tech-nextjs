import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_blocked", "/api/", "/.env", "/admin"],
      },
      {
        userAgent: [
          "GPTBot",
          "CCBot",
          "Bytespider",
          "PetalBot",
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
