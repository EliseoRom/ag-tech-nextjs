"use client";

export default function Marquee() {
  const items = [
    "SMART PROPERTIES",
    "24/7 AUTOMATION",
    "EDGE RUNTIME",
    "360° TOURS",
    "WEBGL & THREE.JS",
    "DIGITAL IDENTITY",
    "NEXT.JS STACK",
    "STRATEGIC CONSULTING",
  ];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="marquee-item">
            <span className="dot"></span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
