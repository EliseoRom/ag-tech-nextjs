"use client";

import "./globals.css";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body>
        <main className="error-screen">
          <p className="error-kicker">Error</p>
          <h1 className="error-title">The site could not load.</h1>
          <p className="error-copy">
            The request was stopped. No internal details are shown.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
