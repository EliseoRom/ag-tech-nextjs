"use client";

import { Fragment } from "react";

export default function SplitWords({ text, baseDelay = 0, step = 60 }) {
  const words = text.split(" ");
  return (
    <span className="split-line">
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            className="split-word"
            style={{ "--d": `${baseDelay + i * step}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
