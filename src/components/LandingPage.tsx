"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  siFiverr,
  siGlassdoor,
  siIndeed,
  siMonster,
  siUpwork,
  siWellfound,
  type SimpleIcon,
} from "simple-icons";

gsap.registerPlugin(useGSAP);

function BrandMark({ icon }: { icon: SimpleIcon }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icon.path} fill="currentColor" /></svg>;
}

export default function LandingPage() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from("[data-enter]", { opacity: 0, y: 24, duration: 0.8, stagger: 0.1, ease: "power3.out" });
  }, { scope: root });

  return (
    <main ref={root} className="landing-page">
      <header className="landing-header" data-enter>
        <Link href="/" className="landing-wordmark">Resuma</Link>
      </header>

      <section className="landing-introduction" aria-labelledby="landing-title">
        <div className="platform-orbit" aria-label="Resume application platforms" data-enter>
          <span className="platform-badge platform-indeed" data-name="Indeed" title="Indeed"><BrandMark icon={siIndeed} /></span>
          <span className="platform-badge platform-upwork" data-name="Upwork" title="Upwork"><BrandMark icon={siUpwork} /></span>
          <span className="platform-badge platform-glassdoor" data-name="Glassdoor" title="Glassdoor"><BrandMark icon={siGlassdoor} /></span>
          <span className="platform-badge platform-wellfound" data-name="Wellfound" title="Wellfound"><BrandMark icon={siWellfound} /></span>
          <span className="platform-badge platform-fiverr" data-name="Fiverr" title="Fiverr"><BrandMark icon={siFiverr} /></span>
          <span className="platform-badge platform-monster" data-name="Monster" title="Monster"><BrandMark icon={siMonster} /></span>
        </div>
        <div className="landing-hero-content">
          <span className="landing-symbol" aria-hidden="true">R</span>
          <h1 id="landing-title" data-enter>Write your resume.<br />See the final page.</h1>
          <p data-enter>A focused editor with live preview and direct export.</p>
          <Link href="/builder" className="landing-primary" data-enter>
            <span>Start building</span><i className="cta-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <footer className="landing-footer" data-enter>
        <span>NO ACCOUNT REQUIRED</span>
        <nav aria-label="Footer navigation">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="https://ranierteraldico.me" target="_blank" rel="noopener noreferrer">Portfolio</a>
        </nav>
      </footer>
    </main>
  );
}
