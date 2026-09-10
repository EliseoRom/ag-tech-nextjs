"use client";

import { useEffect } from "react";

let observer = null;

function ensureObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: [0, 0.05, 0.12],
      rootMargin: "0px 0px -6% 0px",
    }
  );
  return observer;
}

function revealOnScreen() {
  const vh = window.innerHeight || 0;
  document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.98 && rect.bottom > 0) {
      el.classList.add("in");
      observer?.unobserve(el);
    }
  });
}

export function observeReveals(root = typeof document !== "undefined" ? document : null) {
  if (!root) return;
  const obs = ensureObserver();
  root.querySelectorAll(".reveal:not(.in)").forEach((el) => obs.observe(el));
}

export function useReveal() {
  useEffect(() => {
    ensureObserver();

    const run = () => {
      observeReveals();
      revealOnScreen();
    };

    run();
    const raf = requestAnimationFrame(run);
    const timers = [60, 250, 800, 1800, 3500].map((ms) =>
      window.setTimeout(run, ms)
    );

    // Absolute failsafe — never leave copy invisible
    const hard = window.setTimeout(() => {
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => {
        el.classList.add("in");
        observer?.unobserve(el);
      });
    }, 5000);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(hard);
    };
  }, []);
}
