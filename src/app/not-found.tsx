import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-panel" aria-labelledby="not-found-title">
        <div className="not-found-face" aria-hidden="true">
          <i className="not-found-eye not-found-eye-left" />
          <i className="not-found-eye not-found-eye-right" />
          <i className="not-found-mouth" />
        </div>
        <h1 id="not-found-title">404</h1>
        <h2>Oops! Page not found</h2>
        <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link href="/" className="not-found-link"><span aria-hidden="true">←</span> Back to Home</Link>
      </section>
    </main>
  );
}
