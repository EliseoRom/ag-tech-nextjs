"use client";

import Link from "next/link";

export default function Error({ reset }) {
  return (
    <main className="error-screen">
      <p className="error-kicker">Error</p>
      <h1 className="display error-title">Something went wrong.</h1>
      <p className="error-copy">
        The request was stopped. No internal details are shown.
      </p>
      <div className="error-actions">
        <button type="button" className="btn btn-primary" onClick={() => reset()}>
          Try again
        </button>
        <Link href="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
    </main>
  );
}
