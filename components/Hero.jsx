"use client";

import { useEffect, useRef } from "react";
import HeroCanvas from "./HeroCanvas";
import PreTitle from "./PreTitle";
import MagneticBtn from "./MagneticBtn";

export default function Hero({ title, accent = "#38BDF8", heroVariant = "wireframe" }) {
  const cueRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Safety net if a CSS entrance animation is interrupted mid-flight
    const ready = window.setTimeout(() => {
      sectionRef.current?.classList.add("is-ready");
    }, 2800);
    return () => window.clearTimeout(ready);
  }, []);

  useEffect(() => {
    let raf;
    const tick = () => {
      const el = cueRef.current;
      if (el) {
        const hero = el.closest(".hero");
        const bottom = hero ? hero.getBoundingClientRect().bottom : 0;
        const fadeRange = Math.min(window.innerHeight * 0.4, 320);
        const t = Math.max(0, Math.min(1, (bottom - 48) / fadeRange));
        const eased = Math.pow(t, 1.4);
        const hidden = eased < 0.02;
        el.style.opacity = eased.toFixed(3);
        el.style.visibility = hidden ? "hidden" : "visible";
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
    <section className="hero" ref={sectionRef}>
      <HeroCanvas accent={accent} variant={heroVariant} />
      <div className="hero-content">
        <div className="hero-copy">
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
        </div>
        <div className="hero-actions">
          <MagneticBtn primary href="#contact">
            Start a project
            <span className="btn-arrow">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
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
