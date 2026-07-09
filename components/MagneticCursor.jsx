"use client";

import { useEffect, useRef, useState } from "react";

export default function MagneticCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let rx = window.innerWidth / 2,
      ry = window.innerHeight / 2;
    let dx = rx,
      dy = ry;
    let tx = rx,
      ty = ry;
    let raf;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      dx = e.clientX;
      dy = e.clientY;
    };
    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
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
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

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
