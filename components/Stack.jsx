"use client";

import { useEffect, useRef } from "react";
import SplitWords from "./SplitWords";
import { useReveal } from "./useReveal";

const CODE_LINES = [
  { html: '<span class="tk-com">// Deployment pipeline — Edge Network</span>' },
  { html: '<span class="tk-kw">import</span> { <span class="tk-fn">deploy</span> } <span class="tk-kw">from</span> <span class="tk-str">"@ag/edge"</span>;' },
  { html: '<span class="tk-kw">import</span> { <span class="tk-fn">measure</span> } <span class="tk-kw">from</span> <span class="tk-str">"@ag/observability"</span>;' },
  { html: "" },
  { html: '<span class="tk-kw">export const</span> <span class="tk-fn">site</span> = <span class="tk-fn">defineSite</span>({' },
  { html: '&nbsp;&nbsp;name: <span class="tk-str">"property-tech"</span>,' },
  { html: '&nbsp;&nbsp;framework: <span class="tk-str">"next@15"</span>,' },
  { html: '&nbsp;&nbsp;runtime: <span class="tk-str">"edge"</span>, <span class="tk-com">// &lt; 32ms TTFB</span>' },
  { html: '&nbsp;&nbsp;<span class="tk-fn">perf</span>: <span class="tk-pn">{</span>' },
  { html: '&nbsp;&nbsp;&nbsp;&nbsp;lcp: <span class="tk-str">"&lt; 1.2s"</span>,' },
  { html: '&nbsp;&nbsp;&nbsp;&nbsp;cls: <span class="tk-str">"&lt; 0.02"</span>,' },
  { html: '&nbsp;&nbsp;&nbsp;&nbsp;inp: <span class="tk-str">"&lt; 80ms"</span>,' },
  { html: '&nbsp;&nbsp;<span class="tk-pn">}</span>,' },
  { html: "});" },
  { html: "" },
  { html: '<span class="tk-kw">await</span> <span class="tk-fn">deploy</span>(site); <span class="tk-com">// ✓ 12 regiones</span>' },
];

function CodeBlock() {
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const lines = ref.current.querySelectorAll(".stack-code-line");
            lines.forEach((l, i) => {
              l.style.animationDelay = i * 70 + "ms";
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div className="stack-code" ref={ref}>
      <div className="stack-code-head">
        <span className="stack-code-dot"></span>
        <span className="stack-code-dot"></span>
        <span className="stack-code-dot"></span>
        <div className="stack-code-tabs">
          <span className="active">deploy.ts</span>
          <span>tokens.css</span>
          <span>scene.tsx</span>
        </div>
      </div>
      <div className="stack-code-body">
        {CODE_LINES.map((l, i) => (
          <span
            key={i}
            className="stack-code-line"
            dangerouslySetInnerHTML={{ __html: l.html || "&nbsp;" }}
          />
        ))}
      </div>
    </div>
  );
}

function NodeDiagram() {
  const nodes = [
    { id: "edge", x: 50, y: 18, r: 22, label: "Edge" },
    { id: "react", x: 18, y: 40, r: 16, label: "React" },
    { id: "three", x: 82, y: 40, r: 16, label: "Three.js" },
    { id: "db", x: 26, y: 72, r: 16, label: "Postgres" },
    { id: "ai", x: 74, y: 72, r: 16, label: "LLM" },
    { id: "ux", x: 50, y: 88, r: 18, label: "UX" },
  ];
  const links = [
    ["edge", "react"],
    ["edge", "three"],
    ["react", "db"],
    ["three", "ai"],
    ["db", "ux"],
    ["ai", "ux"],
    ["react", "three"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <div className="stack-nodes">
      <div className="stack-nodes-grid"></div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient id="lk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.15" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
        {links.map((l, i) => {
          const a = byId[l[0]],
            b = byId[l[1]];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="url(#lk)"
              strokeWidth="0.25"
              strokeDasharray="2 2"
              style={{
                animation: `dash 8s linear infinite`,
                animationDelay: `${i * -0.6}s`,
              }}
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.r / 4}
              fill="#38BDF8"
              filter="url(#glow)"
              opacity="0.5"
            />
            <circle cx={n.x} cy={n.y} r="1.2" fill="#FAFAFA" />
            <circle
              cx={n.x}
              cy={n.y}
              r="2.6"
              fill="none"
              stroke="rgba(250,250,250,0.25)"
              strokeWidth="0.18"
            />
            <text
              x={n.x}
              y={n.y + 6}
              fontSize="2.2"
              fill="rgba(250,250,250,0.7)"
              textAnchor="middle"
              fontFamily="Inter, sans-serif"
              letterSpacing="-0.04em"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <style>{`@keyframes dash { to { stroke-dashoffset: -100; } }`}</style>
    </div>
  );
}

export default function Stack() {
  useReveal();
  return (
    <section className="section" id="stack">
      <div className="section-head reveal">
        <div>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            03 — TECHNICAL AUTHORITY
          </div>
          <h2>
            <SplitWords text="Built" />
            <br />
            <em>
              <SplitWords text="with materials" baseDelay={300} />
            </em>
            <br />
            <SplitWords text="from the future." baseDelay={750} />
          </h2>
        </div>
        <p>
          We work with modern stacks — Next.js on the edge, React 19, Three.js,
          Postgres, specialized LLMs — assembled with the discipline of a
          hardware team. Every technical decision is deliberate and measurable.
        </p>
      </div>
      <div className="stack-wrap reveal">
        <CodeBlock />
        <NodeDiagram />
      </div>
      <div className="reveal" style={{ marginTop: 80 }}>
        <div className="eyebrow" style={{ marginBottom: 28 }}>
          CORE STACK
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {[
            "Next.js 15",
            "React 19",
            "TypeScript",
            "Three.js",
            "GSAP",
            "Framer Motion",
            "TailwindCSS",
            "Postgres",
            "Supabase",
            "Redis",
            "Cloudflare",
            "Vercel Edge",
            "Anthropic Claude",
            "OpenAI",
            "n8n",
            "Stripe",
          ].map((t) => (
            <span
              key={t}
              style={{
                padding: "8px 14px",
                borderRadius: 100,
                fontSize: 13,
                border: "1px solid var(--line-strong)",
                color: "var(--fg-dim)",
                background: "rgba(255,255,255,0.02)",
                letterSpacing: "-0.005em",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
