"use client";

import { useEffect, useRef } from "react";

/** Marks looping decorative motion as off-screen — does not pause entrance animations. */
export function useAwayClass() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // Keep a small buffer so brief IO flaps don't freeze motion mid-entrance
        el.classList.toggle("is-away", !entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "80px 0px 80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
