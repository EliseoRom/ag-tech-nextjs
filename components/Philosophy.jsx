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

export default function Philosophy() {
  useReveal();
  return (
    <section className="section" id="process">
      <div className="section-head reveal">
        <div>
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
        <p>
          We apply Dieter Rams&apos; ten principles to every digital artifact
          that leaves the studio. If a decision doesn&apos;t add clarity or
          speed, it doesn&apos;t ship.
        </p>
      </div>
      <div className="phil reveal">
        {PHIL.map((p) => (
          <div className="phil-item" key={p.num}>
            <div className="phil-num">{p.num}</div>
            <h4>{p.title}</h4>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
      <div className="metrics reveal">
        <div className="metric">
          <div className="metric-val">
            60<span className="unit">fps</span>
          </div>
          <div className="metric-lbl">
            Consistent performance across all animations
          </div>
        </div>
        <div className="metric">
          <div className="metric-val">
            1.1<span className="unit">s</span>
          </div>
          <div className="metric-lbl">Average LCP in production, P75</div>
        </div>
        <div className="metric">
          <div className="metric-val">
            98<span className="unit">/100</span>
          </div>
          <div className="metric-lbl">Median Lighthouse score</div>
        </div>
        <div className="metric">
          <div className="metric-val">
            0<span className="unit">.</span>
          </div>
          <div className="metric-lbl">
            Unnecessary libraries. Every KB is intentional.
          </div>
        </div>
      </div>
    </section>
  );
}
