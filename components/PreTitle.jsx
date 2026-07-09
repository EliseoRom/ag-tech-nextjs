"use client";

export default function PreTitle({ text }) {
  const words = text.split(" ");
  let charIdx = 0;
  return (
    <div className="pre-title" aria-label={text}>
      <span className="pre-title-dot" aria-hidden="true"></span>
      <span className="pre-title-inner">
        {words.map((w, wi) => {
          const chars = Array.from(w);
          return (
            <span className="pre-title-word" key={wi}>
              {chars.map((c, ci) => {
                const d = charIdx * 22;
                charIdx++;
                return (
                  <span
                    key={ci}
                    className="pre-title-char"
                    style={{ animationDelay: d + "ms" }}
                  >
                    {c}
                  </span>
                );
              })}
              {wi < words.length - 1 ? (
                <span className="pre-title-space">&nbsp;</span>
              ) : null}
            </span>
          );
        })}
        <span className="pre-title-underline" aria-hidden="true"></span>
      </span>
    </div>
  );
}
