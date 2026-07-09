import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0A0A0C 0%, #131318 55%, #0A0A0C 100%)",
          color: "#FAFAFA",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#38BDF8",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#38BDF8",
              boxShadow: "0 0 24px rgba(56,189,248,0.8)",
            }}
          />
          {SITE_TAGLINE}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              maxWidth: 980,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "rgba(250,250,250,0.72)",
              maxWidth: 900,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            fontSize: 22,
            color: "rgba(250,250,250,0.45)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Technology Built By Experts
        </div>
      </div>
    ),
    { ...size }
  );
}
