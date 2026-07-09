"use client";

import MagneticBtn from "./MagneticBtn";
import { useReveal } from "./useReveal";

export default function CTA() {
  useReveal();
  return (
    <section className="cta reveal" id="contact">
      <div className="eyebrow" style={{ marginBottom: 28 }}>
        LET&apos;S TALK
      </div>
      <h2>
        Ready to build something <em>memorable</em>?
      </h2>
      <p>
        We take on a limited number of projects each quarter to ensure quality.
        Tell us what you have in mind — we respond within 24 hours.
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <MagneticBtn primary href="mailto:hola@ag-tech.studio">
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
