"use client";

import { useEffect } from "react";

export function useMagnetic(ref, strength = 0.2) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let rx = 0,
      ry = 0,
      tx = 0,
      ty = 0;
    let raf;
    let running = false;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      tx = (e.clientX - cx) * strength;
      ty = (e.clientY - cy) * strength;
      start();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      start();
    };
    const tick = () => {
      rx += (tx - rx) * 0.2;
      ry += (ty - ry) * 0.2;
      el.style.transform = `translate(${rx}px, ${ry}px)`;
      if (Math.abs(tx - rx) < 0.12 && Math.abs(ty - ry) < 0.12) {
        running = false;
        raf = null;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [ref, strength]);
}
