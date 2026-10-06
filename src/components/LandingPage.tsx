"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Macbook } from "@/components/ui/animated-3d-mac-book-air";

function BrandMark({ d, label }: { d: string; label: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <title>{label}</title>
      <path d={d} fill="currentColor" />
    </svg>
  );
}

const INDEED_PATH = "M11.566 21.5633v-8.762c.2553.0231.5009.0346.758.0346 1.2225 0 2.3739-.3206 3.3506-.8928v9.6182c0 .8219-.1957 1.4287-.5757 1.8338-.378.4033-.8808.6049-1.491.6049-.6007 0-1.0766-.2016-1.468-.6183-.3781-.4032-.5739-1.01-.5739-1.8184zM11.589.5659c2.5447-.8929 5.4424-.8449 7.6186.987.405.3687.8673.8334 1.0515 1.3806.2207.6913-.7695-.073-.9057-.167-.71-.4532-1.4182-.8334-2.2127-1.0946C12.8614.3873 8.8122 2.709 6.2945 6.315c-1.0516 1.5939-1.7367 3.2721-2.299 5.1174-.0614.2017-.1094.4647-.2207.6413-.1113.2036-.048-.5453-.048-.5702.0845-.7623.2438-1.4997.4414-2.237C5.3292 5.3375 7.897 2.0655 11.5891.5658zm4.9281 7.0587c0 1.6686-1.353 3.0224-3.0205 3.0224-1.6677 0-3.0186-1.3538-3.0186-3.0224 0-1.6687 1.351-3.0224 3.0186-3.0224 1.6676 0 3.0205 1.3518 3.0205 3.0224Z";
const UPWORK_PATH = "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z";
const GLASSDOOR_PATH = "M14.1093.0006c-.0749-.0074-.1348.0522-.1348.127v3.451c0 .0673.0537.1194.121.127 2.619.172 4.6092.9501 4.6092 3.6814H13.086a.1343.1343 0 0 0-.1348.1347v8.9644c0 .0748.06.1347.1348.1347h10.0034c.0748 0 .1347-.0599.1347-.1347V7.342c0-2.2374-.7996-4.0558-2.4159-5.3279C19.3191.8469 17.0874.1428 14.1093.0006ZM.9107 7.387a.1342.1342 0 0 0-.1347.1347v8.9566c0 .0748.06.1347.1347.1347h5.6189c0 2.7313-1.9902 3.5094-4.6091 3.6815-.0674.0075-.1192.0596-.1192.127v3.451c0 .0747.06.1343.1348.1269 2.9781-.1422 5.2078-.8463 6.6969-2.0136 1.6163-1.272 2.4159-3.0905 2.4159-5.3278V7.5217a.1343.1343 0 0 0-.1348-.1347z";
const WELLFOUND_PATH = "M23.998 8.128c.063-1.379-1.612-2.376-2.795-1.664-1.23.598-1.322 2.52-.156 3.234 1.2.862 2.995-.09 2.951-1.57zm0 7.748c.063-1.38-1.612-2.377-2.795-1.665-1.23.598-1.322 2.52-.156 3.234 1.2.863 2.995-.09 2.951-1.57zm-20.5 1.762L0 6.364h3.257l2.066 8.106 2.245-8.106h3.267l2.244 8.106 2.065-8.106h3.257l-3.54 11.274H11.39c-.73-2.713-1.46-5.426-2.188-8.14l-2.233 8.14H3.5z";
const FIVERR_PATH = "M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z";
const MONSTER_PATH = "M0 0V24H5.42V12.39L12 18.19L18.58 12.39V24H24V0L12 11.23L0 0Z";

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2l2.94 6.26 6.56 1.01-4.75 4.63 1.12 6.6L12 17.27l-5.87 3.23 1.12-6.6L2.5 9.27l6.56-1.01L12 2z" fill="currentColor" />
    </svg>
  );
}

const AVATARS = [
  "/avatars/avatar-1.svg",
  "/avatars/avatar-2.svg",
  "/avatars/avatar-3.svg",
  "/avatars/avatar-4.svg",
];

type Platform = ({ kind: "path"; name: string; d: string } | { kind: "image"; name: string; logo: string }) & { color: string };

const PLATFORMS: Platform[] = [
  { kind: "path", name: "Indeed", d: INDEED_PATH, color: "#2164f3" },
  { kind: "path", name: "Upwork", d: UPWORK_PATH, color: "#14a800" },
  { kind: "path", name: "Glassdoor", d: GLASSDOOR_PATH, color: "#0caa41" },
  { kind: "path", name: "Wellfound", d: WELLFOUND_PATH, color: "#111111" },
  { kind: "path", name: "Fiverr", d: FIVERR_PATH, color: "#1dbf73" },
  { kind: "path", name: "Monster", d: MONSTER_PATH, color: "#6e46ae" },
  { kind: "image", name: "JobStreet", logo: "/platforms/jobstreet.png", color: "#0b4ea2" },
  { kind: "image", name: "OnlineJobs.ph", logo: "/platforms/onlinejobs.ico", color: "#1769aa" },
  { kind: "image", name: "Kalibrr", logo: "/platforms/kalibrr.ico", color: "#ef4135" },
  { kind: "image", name: "LinkedIn", logo: "/platforms/linkedin.ico", color: "#0a66c2" },
];

function MarqueeGroup({ hidden = false, offset = 0 }: { hidden?: boolean; offset?: number }) {
  const platforms = [...PLATFORMS.slice(offset), ...PLATFORMS.slice(0, offset)];

  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {platforms.map((platform) => (
        <span className="marquee-item" key={platform.name} style={{ "--platform-color": platform.color } as CSSProperties}>
          {platform.kind === "path" ? <BrandMark d={platform.d} label={platform.name} /> : <Image className="marquee-logo" src={platform.logo} alt="" width={24} height={24} />}
          <span>{platform.name}</span>
        </span>
      ))}
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="landing-page">
      <header className="landing-header">
        <Link href="/" className="landing-wordmark">Resuma</Link>
        <Link href="/builder" className="landing-header-cta">Create resume <i className="cta-arrow" aria-hidden="true" /></Link>
      </header>

      <section className="landing-introduction" aria-labelledby="landing-title">
        <div className="landing-hero-content">
          <h1 id="landing-title">Build a resume that feels<br /><em>clear, capable, and yours.</em></h1>
          <p>Write in a focused editor, review every change live, and export a polished resume without creating an account.</p>
          <div className="landing-action-row">
            <Link href="/builder" className="landing-primary">
              <span>Start building</span><i className="cta-arrow" aria-hidden="true" />
            </Link>
            <div className="landing-proof">
              <div className="proof-avatars" aria-hidden="true">
                {AVATARS.map((src) => <Image key={src} src={src} alt="" width={72} height={72} />)}
              </div>
              <div className="proof-copy">
                <div className="proof-stars" aria-label="Five stars">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} />)}
                </div>
                <span>Trusted by 1000+ clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-logos" aria-label="Platforms you can apply on with your resume">
        <div className="marquee-heading">
          <h2>A resume ready for <em>where you apply.</em></h2>
          <p>Export one clean PDF for the job platforms you already use.</p>
        </div>
        <div className="platform-wall" aria-hidden="true">
          {[0, 5].map((offset, row) => (
            <div className={`marquee ${row === 1 ? "marquee-reverse" : ""}`} key={offset}>
              <div className="marquee-track">
                <MarqueeGroup hidden offset={offset} />
                <MarqueeGroup hidden offset={offset} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-showcase" aria-labelledby="showcase-title">
        <div className="showcase-heading">
          <h2 id="showcase-title">See the final page <em>as you write.</em></h2>
        </div>
        <Macbook screenImage="/images/home-hero.png" screenAlt="Laptop showing the Resuma editor and live resume preview" />
      </section>

      <footer className="landing-footer">
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
