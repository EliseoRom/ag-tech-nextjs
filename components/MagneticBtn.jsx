"use client";

import { useRef } from "react";
import { useMagnetic } from "./useMagnetic";

function safeHref(href) {
  if (typeof href !== "string" || href.trim() === "") return "/";
  const value = href.trim();
  const protocol = value.slice(0, value.indexOf(":") + 1).toLowerCase();
  if (
    protocol === "javascript:" ||
    protocol === "data:" ||
    protocol === "vbscript:"
  ) {
    return "/";
  }
  return value;
}

export default function MagneticBtn({
  children,
  className = "",
  primary,
  href = "#",
  ...rest
}) {
  const ref = useRef(null);
  useMagnetic(ref, 0.2);
  return (
    <a
      href={safeHref(href)}
      ref={ref}
      className={
        "btn " + (primary ? "btn-primary" : "btn-ghost") + " " + className
      }
      data-magnetic
      {...rest}
    >
      {children}
    </a>
  );
}
