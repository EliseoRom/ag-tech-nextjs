"use client";

import SplitWords from "./SplitWords";
import { useReveal } from "./useReveal";

const PHIL = [
  {
    num: "01",
    title: "Discovery",
    desc: "We investigate without assumptions. Immersion sessions, user interviews, and audits of the current product.",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "We define systems — not screens. Tokens, patterns, motion systems, and component libraries.",
  },
  {
    num: "03",
    title: "Build",
    desc: "We design and develop in parallel. Weekly iteration, clickable prototypes, measurable decisions.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Edge deployment, continuous monitoring, 30 days of post-launch support. Iterate with real data.",
  },
];

const METRICS = [
  {
    val: (
      <>
        60<span className="unit">fps</span>
      </>
    ),
    lbl: "Consistent performance across all animations",
  },
  {
    val: (
      <>
        1.1<span className="unit">s</span>
      </>
    ),
    lbl: "Average LCP in production, P75",
  },
  {
    val: (
      <>
        98<span className="unit">/100</span>
      </>
    ),
    lbl: "Median Lighthouse score",
  },
  {
    val: (
      <>
        0<span className="unit"> KB</span>
      </>
    ),
    lbl: "Unnecessary libraries. Every KB is intentional.",
  },
];

export default function Philosophy() {
  useReveal();
  return (
    <section className="section" id="process">
      <div className="section-head">
        <div className="reveal">
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            04 — PROCESS
          </div>
          <h2>
            <SplitWords text="Less," />{" "}
            <em>
              <SplitWords text="but better." baseDelay={200} />
            </em>
          </h2>
        </div>
        <p className="reveal">
          We apply Dieter Rams&apos; ten principles to every digital artifact
          that leaves the studio. If a decision doesn&apos;t add clarity or
          speed, it doesn&apos;t ship.
        </p>
      </div>
      <div className="phil">
        {PHIL.map((p, i) => (
          <div
            className="phil-item reveal"
            key={p.num}
            style={{ "--reveal-delay": `${i * 70}ms` }}
          >
            <div className="phil-num">{p.num}</div>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="metrics">
        {METRICS.map((m, i) => (
          <div
            className="metric reveal"
            key={i}
            style={{ "--reveal-delay": `${i * 70}ms` }}
          >
            <div className="metric-val">{m.val}</div>
            <div className="metric-lbl">{m.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
