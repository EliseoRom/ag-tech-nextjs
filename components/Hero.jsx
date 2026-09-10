"use client";

import { useEffect, useRef } from "react";
import HeroCanvas from "./HeroCanvas";
import PreTitle from "./PreTitle";
import MagneticBtn from "./MagneticBtn";

export default function Hero({ accent, heroVariant, title }) {
  const cueRef = useRef(null);

  useEffect(() => {
    let raf;
    const tick = () => {
      const el = cueRef.current;
      if (el) {
        const y = window.scrollY;
        const docH =
          document.documentElement.scrollHeight - window.innerHeight;
        const remaining = docH - y;
        const fadeRange = 480;
        const t = Math.max(0, Math.min(1, remaining / fadeRange));
        const eased = Math.pow(t, 1.4);
        el.style.opacity = eased.toFixed(3);
        el.style.visibility = eased < 0.02 ? "hidden" : "visible";
      }
      raf = null;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero">
      <HeroCanvas accent={accent} variant={heroVariant} />
      <div className="hero-content">
        <PreTitle text="Properties Technological Solutions" />
        <h1 className="display hero-title">
          <span className="line">
            <span className="word" style={{ animationDelay: "0.05s" }}>
              {title.l1}
            </span>
          </span>
          <span className="line">
            <span className="word" style={{ animationDelay: "0.2s" }}>
              {title.l2}
            </span>
          </span>
          <span className="line">
            <span
              className="word accent"
              style={{ animationDelay: "0.35s" }}
            >
              {title.l3}
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          Atlanta’s leading technology partner for real estate enterprises. We
          transform property businesses into globally visible digital
          ecosystems.
        </p>
        <div className="hero-actions">
          <MagneticBtn primary href="#contact">
            Start a project
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
          <MagneticBtn href="#services">Explore the ecosystem</MagneticBtn>
        </div>
      </div>
      <div className="hero-cue" aria-hidden="true" ref={cueRef}>
        <div className="hero-cue-mouse">
          <span className="hero-cue-wheel"></span>
        </div>
        <div className="hero-cue-chev">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path
              d="M1 1l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
            <path
              d="M1 1l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="hero-cue-label">SCROLL</span>
      </div>
    </section>
  );
}
