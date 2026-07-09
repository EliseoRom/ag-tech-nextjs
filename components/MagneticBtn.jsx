"use client";

import { useRef } from "react";
import { useMagnetic } from "./useMagnetic";

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
      href={href}
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
