"use client";

import { useState } from "react";
import SplitWords from "./SplitWords";
import { useReveal } from "./useReveal";

const SERVICES = [
  {
    num: "01",
    title: "Cinematic Web Development",
    desc: "Digital products built as precision instruments. 60fps performance, AAA accessibility, physically correct animations.",
    featured: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="2.5" width="13" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1.5 5.5h13" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="3.5" cy="4" r="0.4" fill="currentColor"/>
        <circle cx="5" cy="4" r="0.4" fill="currentColor"/>
      </svg>
    ),
    expand: [
      ["STACK", "Next.js · React · Three.js · GSAP"],
      ["MOTION", "Cinematic scroll with GSAP timelines and spring-based easing"],
      ["SEO", "Core Web Vitals < 1.2s LCP, perfect Lighthouse scores"],
      ["DELIVERY", "4 — 9 weeks depending on scope"],
    ],
  },
  {
    num: "02",
    title: "Automation & AI",
    desc: "Workflows that think on their own. LLM integration, agents, and orchestration.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
        <path d="M8 3v-1M8 14v-1M3 8H2M14 8h-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    expand: [
      ["AI", "Claude · GPT · custom agents"],
      ["FLOWS", "n8n · Make · Zapier · Airtable"],
      ["ROI", "24/7 automation with real-time dashboards"],
    ],
  },
  {
    num: "03",
    title: "360° Tours",
    desc: "We scan your property in 3D so it\u2019s available 24/7.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <ellipse cx="8" cy="8" rx="6.5" ry="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="8" cy="8" r="0.8" fill="currentColor"/>
      </svg>
    ),
    expand: [
      ["TIME", "Reduced time to market"],
      ["LEADS", "Increased qualified leads"],
      ["CONVERSION", "Higher conversion rate"],
      ["VISIBILITY", "More online views"],
      ["VALUE", "Increased sale price"],
    ],
  },
  {
    num: "04",
    title: "Digital Identity",
    desc: "Branding, motion design, and the visual voice of your product.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
    expand: [
      ["DELIVERABLES", "Logo, type system, color palette, usage guidelines"],
      ["MOTION", "Logo loop, transitions, animated social media kit"],
    ],
  },
  {
    num: "05",
    title: "Product Strategy",
    desc: "Discovery sessions, information architecture, and rapid prototyping.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 13l4-8 3 5 5-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    expand: [
      ["SESSIONS", "1 — 3 day workshops, remote or on-site"],
      ["DELIVERABLES", "Roadmap, wireframes, clickable prototypes"],
    ],
  },
  {
    num: "06",
    title: "Enterprise Systems & Dashboards",
    desc: "Custom internal platforms and control panels to visualize KPIs, operations, and real-time decisions.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 11V8.5M8 11V6M11 11V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    expand: [
      ["DASHBOARDS", "KPIs, sales metrics, inventory, and team performance"],
      ["SYSTEMS", "CRM, ERP, and internal tools connected to your workflows"],
      ["DATA", "Integration with APIs, databases, and spreadsheets"],
      ["ACCESS", "Roles, permissions, and custom views per department"],
      ["DELIVERY", "6 — 12 weeks depending on complexity and integrations"],
    ],
  },
];

function EcoCard({ s, active, onSelect }) {
  return (
    <article
      className={`eco-card${s.featured ? " featured" : ""}${active ? " active" : ""}`}
      onClick={onSelect}
      data-magnetic
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="eco-card-head">
        <span className="eco-card-num">{s.num}</span>
        <div className="eco-card-icon">{s.icon}</div>
      </div>
      <h3>{s.title}</h3>
      <p className="eco-desc">{s.desc}</p>
      <div className="eco-card-foot">
        <span>{active ? "Selected" : "View details"}</span>
        <span className="eco-card-indicator" aria-hidden="true" />
      </div>
    </article>
  );
}

function ServiceDetail({ s }) {
  return (
    <div className="eco-detail">
      <div className="eco-detail-head">
        <div className="eco-detail-meta">
          <span className="eco-card-num">{s.num}</span>
          <div className="eco-card-icon">{s.icon}</div>
        </div>
        <div>
          <h3>{s.title}</h3>
          <p className="eco-detail-desc">{s.desc}</p>
        </div>
      </div>
      <div className="eco-detail-body">
        <p className="eco-expand-label">Includes</p>
        <div className="eco-expand-grid">
          {s.expand.map((f, i) => (
            <div className="eco-feat" key={i}>
              <span className="eco-feat-k">{f[0]}</span>
              <span className="eco-feat-v">{f[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [open, setOpen] = useState(0);
  const selected = SERVICES[open];
  useReveal();

  return (
    <section className="section" id="services">
      <div className="section-head">
        <div className="reveal">
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            02 — THE ECOSYSTEM
          </div>
          <h2>
            <SplitWords text="Services" />
            <br />
            <em>
              <SplitWords text="that orbit" baseDelay={280} />
            </em>
            <br />
            <SplitWords text="your business." baseDelay={560} />
          </h2>
        </div>
        <p className="reveal">
          Six integrated modules that work independently or as a coherent
          system. Select a service to view the details.
        </p>
      </div>

      <div className="eco-layout">
        <div className="eco-index" role="tablist" aria-label="Services">
          {SERVICES.map((s, i) => (
            <button
              key={s.num}
              type="button"
              role="tab"
              aria-selected={open === i}
              className={`eco-index-item${open === i ? " active" : ""}`}
              onClick={() => setOpen(i)}
            >
              <span className="eco-index-num">{s.num}</span>
              <span className="eco-index-title">{s.title}</span>
            </button>
          ))}
        </div>

        <div className="eco">
          {SERVICES.map((s, i) => (
            <EcoCard
              key={s.num}
              s={s}
              active={open === i}
              onSelect={() => setOpen(i)}
            />
          ))}
        </div>

        <ServiceDetail key={selected.num} s={selected} />
      </div>
    </section>
  );
}
