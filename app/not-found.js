import Link from "next/link";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="error-screen">
      <p className="error-kicker">404</p>
      <h1 className="display error-title">This path is closed.</h1>
      <p className="error-copy">
        The address does not exist, or the request was blocked. Nothing on this
        server was exposed.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to home
      </Link>
    </main>
  );
}
