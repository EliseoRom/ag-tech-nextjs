"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Stack from "@/components/Stack";
import Philosophy from "@/components/Philosophy";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Sun from "@/components/Sun";
import ThemeFlash from "@/components/ThemeFlash";
import { usePageMotion } from "@/components/usePageMotion";
import { useReveal } from "@/components/useReveal";

const ACCENT = "#38BDF8";

export default function Page() {
  const [theme, setTheme] = useState("dark");
  const themeTimer = useRef(null);
  usePageMotion();
  useReveal();

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", ACCENT);
    const hex = ACCENT.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    document.documentElement.style.setProperty(
      "--accent-glow",
      `rgba(${r}, ${g}, ${b}, 0.45)`
    );
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => () => window.clearTimeout(themeTimer.current), []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theme-changing");
    requestAnimationFrame(() => {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    });
    window.clearTimeout(themeTimer.current);
    themeTimer.current = window.setTimeout(() => {
      root.classList.remove("theme-changing");
    }, 6800);
  }, []);

  return (
    <>
      <Sun />
      <ThemeFlash />
      <ScrollProgress />
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <Hero
        accent={ACCENT}
        heroVariant="wireframe"
        title={{ l1: "Technology", l2: "Built By", l3: "Experts." }}
      />
      <Marquee />
      <Services />
      <Stack />
      <Philosophy />
      <CTA />
      <Footer />
    </>
  );
}
