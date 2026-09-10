"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function Nav({ theme, onToggleTheme }) {
  return (
    <nav className="nav">
      <Link href="/" className="nav-brand" aria-label={`${SITE_NAME} home`}>
        <Image
          src="/logo-mark.jpg"
          alt={SITE_NAME}
          width={36}
          height={36}
          className="nav-logo"
          priority
        />
      </Link>
      <div className="nav-actions">
        <a href="#services">Services</a>
        <a href="#stack">Technology</a>
        <a href="#process">Process</a>
        <a href="#contact" className="nav-cta">
          Contact
        </a>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
          data-magnetic
        >
          <span className="theme-toggle-icon moon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13.3 9.8A6 6 0 0 1 6.2 2.7a.5.5 0 0 0-.7-.6 7 7 0 1 0 8.4 8.4.5.5 0 0 0-.6-.7z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="theme-toggle-icon sun" aria-hidden="true">
            <span className="sun-icon-glow" aria-hidden="true"></span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="3.1" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                <line x1="8" y1="1.2" x2="8" y2="3" />
                <line x1="8" y1="13" x2="8" y2="14.8" />
                <line x1="1.2" y1="8" x2="3" y2="8" />
                <line x1="13" y1="8" x2="14.8" y2="8" />
                <line x1="3.2" y1="3.2" x2="4.5" y2="4.5" />
                <line x1="11.5" y1="11.5" x2="12.8" y2="12.8" />
                <line x1="3.2" y1="12.8" x2="4.5" y2="11.5" />
                <line x1="11.5" y1="4.5" x2="12.8" y2="3.2" />
              </g>
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}
