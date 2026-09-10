"use client";

import { useEffect } from "react";

function apply(paused) {
  document.documentElement.dataset.motion = paused ? "paused" : "running";
}

export function usePageMotion() {
  useEffect(() => {
    apply(document.hidden);

    const onVisibility = () => apply(document.hidden);
    const onShow = () => apply(false);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onShow);
    window.addEventListener("focus", onShow);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onShow);
      window.removeEventListener("focus", onShow);
      document.documentElement.removeAttribute("data-motion");
    };
  }, []);
}
