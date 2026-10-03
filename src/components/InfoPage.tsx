"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Section = { eyebrow: string; title: string; paragraphs: string[] };

export default function InfoPage({ title, introduction, sections }: { title: string; introduction: string; sections: Section[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <main className="info-page">
      <header className="info-header">
        <Link href="/" className="landing-wordmark">Resuma</Link>
        <nav aria-label="Primary navigation" className="info-nav-links">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/builder" className="info-header-cta">Open editor</Link>
        </nav>
        <button
          type="button"
          className="info-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="info-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        {menuOpen && (
          <nav id="info-mobile-menu" aria-label="Mobile navigation" className="info-mobile-menu">
            <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/privacy" onClick={() => setMenuOpen(false)}>Privacy</Link>
            <Link href="/terms" onClick={() => setMenuOpen(false)}>Terms</Link>
            <Link href="/builder" className="info-header-cta" onClick={() => setMenuOpen(false)}>Open editor</Link>
          </nav>
        )}
      </header>
      <article className="info-article">
        <h1>{title}</h1>
        <p className="info-introduction">{introduction}</p>
        <ol className="info-timeline">
          {sections.map((section) => (
            <li key={section.title}>
              <span className="info-dot" aria-hidden="true" />
              <h2>{section.title}</h2>
              <p className="info-eyebrow">{section.eyebrow}</p>
              <div className="info-card">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </article>
      <footer className="info-footer">
        <nav aria-label="Footer navigation">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="https://ranierteraldico.me" target="_blank" rel="noopener noreferrer">Portfolio</a>
        </nav>
        <a href="mailto:teraldicoranier@gmail.com">teraldicoranier@gmail.com</a>
      </footer>
    </main>
  );
}
