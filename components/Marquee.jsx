"use client";

import { useAwayClass } from "./useAwayClass";

const ITEMS = [
  "SMART PROPERTIES",
  "24/7 AUTOMATION",
  "EDGE RUNTIME",
  "360° TOURS",
  "WEBGL & THREE.JS",
  "DIGITAL IDENTITY",
  "NEXT.JS STACK",
  "STRATEGIC CONSULTING",
];

function Group({ hidden }) {
  return (
    <div className="marquee-group" aria-hidden={hidden ? "true" : undefined}>
      {ITEMS.map((t) => (
        <span key={t} className="marquee-item">
          <span className="dot"></span>
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const awayRef = useAwayClass();
  return (
    <div className="marquee" ref={awayRef}>
      <div className="marquee-track">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
