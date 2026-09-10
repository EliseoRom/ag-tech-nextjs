"use client";

import MagneticBtn from "./MagneticBtn";
import SplitWords from "./SplitWords";
import { SITE_MAILTO } from "@/lib/site";

export default function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="reveal">
        <div className="eyebrow" style={{ marginBottom: 28 }}>
          LET&apos;S TALK
        </div>
        <h2>
          <SplitWords text="Ready to build something" />{" "}
          <em>
            <SplitWords text="memorable?" baseDelay={360} />
          </em>
        </h2>
      </div>
      <p className="reveal">
        We take on a limited number of projects each quarter to ensure quality.
        Tell us what you have in mind — we respond within 24 hours.
      </p>
      <div className="reveal" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <MagneticBtn primary href={SITE_MAILTO}>
          Book a discovery call
          <span className="btn-arrow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </MagneticBtn>
        <MagneticBtn href="#services">View case studies</MagneticBtn>
      </div>
    </section>
  );
}
