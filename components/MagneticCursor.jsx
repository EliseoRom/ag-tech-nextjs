"use client";

import { useEffect, useRef, useState } from "react";

export default function MagneticCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    setEnabled(fine && motionOk);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let rx = window.innerWidth / 2,
      ry = window.innerHeight / 2;
    let dx = rx,
      dy = ry;
    let tx = rx,
      ty = ry;
    let raf;
    let running = false;

    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      }
      const settled =
        Math.abs(tx - rx) < 0.15 && Math.abs(ty - ry) < 0.15;
      if (settled) {
        running = false;
        raf = null;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      raf = null;
    };
    const move = (e) => {
      if (document.hidden) return;
      tx = e.clientX;
      ty = e.clientY;
      dx = e.clientX;
      dy = e.clientY;
      start();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    const enter = (e) => {
      if (
        e.target.closest &&
        e.target.closest(
          "a, button, .btn, .eco-card, .nav-cta, [data-magnetic]"
        )
      ) {
        setHovered(true);
      }
    };
    const leave = (e) => {
      if (
        e.target.closest &&
        e.target.closest(
          "a, button, .btn, .eco-card, .nav-cta, [data-magnetic]"
        )
      ) {
        setHovered(false);
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={"cursor-ring" + (hovered ? " hovered" : "")}
      ></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  );
}
