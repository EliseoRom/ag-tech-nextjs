import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #38BDF8, #7DD3FC)",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 4,
            background: "#0A0A0C",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
