"use client";

import { Fragment } from "react";

export default function SplitWords({ text, baseDelay = 0, step = 52 }) {
  const words = text.split(" ");
  return words.map((w, i) => (
    <Fragment key={`${w}-${i}`}>
      <span className="split-line">
        <span
          className="split-word"
          style={{ "--d": `${baseDelay + i * step}ms` }}
        >
          {w}
        </span>
      </span>
      {i < words.length - 1 ? " " : ""}
    </Fragment>
  ));
}
