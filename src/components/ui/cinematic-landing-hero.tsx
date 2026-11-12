// src/components/ui/cinematic-landing-hero.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, rgb(23 24 22 / 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(23 24 22 / 0.06) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Matched to Resuma Theme)
  ---------------------------------------------------------------------- */
  
  /* OUTSIDE THE CARD: Theme-aware text (Shadow in Light Mode, Glow in Dark Mode) */
  .text-3d-matte {
      color: var(--color-foreground, #171816);
      text-shadow: 
          0 10px 30px color-mix(in srgb, var(--color-foreground, #171816) 16%, transparent), 
          0 2px 4px color-mix(in srgb, var(--color-foreground, #171816) 8%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground, #171816) 0%, color-mix(in srgb, var(--color-foreground, #171816) 50%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      padding-bottom: 0.35em;
      margin-bottom: -0.2em;
      padding-inline: 0.15em;
      margin-inline: -0.15em;
      line-height: 1.25;
      overflow: visible;
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground, #171816) 12%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground, #171816) 8%, transparent));
  }

  /* INSIDE THE CARD: Resuma bone/silver metallic gradient */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #D8D5CE 45%, #8E8D85 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      padding-bottom: 0.25em;
      margin-bottom: -0.2em;
      padding-inline: 0.25em;
      margin-inline: -0.25em;
      line-height: 1.15;
      overflow: visible;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Resuma Obsidian Editorial Depth Card */
  .premium-depth-card {
      background: linear-gradient(155deg, #222421 0%, #171816 55%, #10110f 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.65),
          0 20px 40px -20px rgba(0, 0, 0, 0.5),
          inset 0 1px 2px rgba(255, 255, 255, 0.16),
          inset 0 -2px 4px rgba(0, 0, 0, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  /* Physical Tactile Buttons */
  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  mobileScreenImage?: string;
}

export function CinematicHero({ 
  brandName = "Resuma",
  tagline1 = "Craft the journey,",
  tagline2 = "not just the pages.",
  cardHeading = "Presentation, redefined.",
  cardDescription = (
    <>
      <span className="text-white font-semibold">Resuma</span> equips job seekers and professionals with structured resume editing, real-time preview, and instant export ready for all major hiring platforms.
    </>
  ),
  metricValue = 100,
  metricLabel = "% ATS Ready",
  ctaHeading = "Start your resume today.",
  ctaDescription = "Join thousands of professionals crafting stand-out resumes and take control of your career today.",
  mobileScreenImage = "/images/mobile-resume-editor.png",
  className, 
  ...props 
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // 1. High-Performance Mouse Interaction Logic (Using requestAnimationFrame)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% -40px 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% -40px 0)", ease: "power4.inOut" }, "-=1.0");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 }) 
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        // Responsive card pullback sizing
        .to(".main-card", { 
          width: isMobile ? "92vw" : "85vw", 
          height: isMobile ? "92vh" : "85vh", 
          borderRadius: isMobile ? "32px" : "40px", 
          ease: "expo.inOut", 
          duration: 1.8 
        }, "pullback") 
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []); 

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2 pb-2 leading-[1.15] md:leading-[1.2]">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter pb-4 md:pb-6 leading-[1.15] md:leading-[1.25]">
          {tagline2}
        </h1>
      </div>

      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl px-4 gsap-reveal pointer-events-auto will-change-transform mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-silver-matte pb-2 leading-[1.15] md:leading-[1.25]">
          {ctaHeading}
        </h2>
        <p className="text-[#5a5c54] text-base md:text-lg mb-10 max-w-xl mx-auto font-normal leading-relaxed">
          {ctaDescription}
        </p>

        {/* Premium Symmetrical Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link
            href="/builder"
            className="group relative inline-flex items-center justify-center gap-4 h-[56px] px-8 rounded-full bg-[#171816] text-[#faf9f5] text-[15px] font-semibold tracking-[-0.01em] border border-[#2a2b27] shadow-[0_14px_30px_-6px_rgba(23,24,22,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-[#252622] hover:shadow-[0_18px_38px_-6px_rgba(23,24,22,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 select-none"
          >
            <span>Create your resume now</span>
            <span className="w-8 h-8 rounded-full bg-white text-[#171816] flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105">
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>

          <a
            href="#showcase-title"
            className="group relative inline-flex items-center justify-center gap-4 h-[56px] px-8 rounded-full bg-white text-[#171816] text-[15px] font-semibold tracking-[-0.01em] border border-[#171816]/12 shadow-[0_8px_24px_-4px_rgba(23,24,22,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:bg-[#faf9f5] hover:border-[#171816]/25 hover:shadow-[0_12px_28px_-4px_rgba(23,24,22,0.14)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 select-none"
          >
            <span>See desktop view</span>
            <span className="w-8 h-8 rounded-full bg-[#171816]/8 text-[#171816] flex items-center justify-center transition-all duration-200 group-hover:bg-[#171816] group-hover:text-white">
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Feature & Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-xs text-[#171816]/65 font-medium select-none">
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
            </svg>
            Free to use
          </span>
          <span className="w-1 h-1 rounded-full bg-[#171816]/25 hidden sm:inline-block" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
            </svg>
            No account required
          </span>
          <span className="w-1 h-1 rounded-full bg-[#171816]/25 hidden sm:inline-block" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
            </svg>
            Direct PDF export
          </span>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Obsidian Depth Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID: Flex-col on mobile to force order, Grid on desktop */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            
            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full lg:pl-6 overflow-visible">
              <h2 className="text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[6.4rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0 select-none">
                {brandName}
              </h2>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): IPHONE MOCKUP WITH REAL MOBILE SCREEN */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
              
              {/* Inner wrapper for safe CSS scaling that doesn't conflict with GSAP */}
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
                
                {/* The iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d"
                >
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen Container: Displays Actual Resuma Mobile Screen */}
                  <div className="absolute inset-[7px] bg-[#faf9f5] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.7)] z-10 flex flex-col">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Top iOS Status Bar Area */}
                    <div className="relative w-full h-[36px] bg-[#faf9f5] z-50 flex items-center justify-between px-6 pt-1 text-[#171816] text-[11px] font-semibold select-none flex-shrink-0">
                      <span className="tracking-tight font-bold">9:41</span>
                      
                      {/* Dynamic Island Notch */}
                      <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-black rounded-full flex items-center justify-end px-2.5 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.15)]">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                      </div>

                      {/* Status Icons: Cellular, Wifi, Battery */}
                      <div className="flex items-center gap-1 opacity-80">
                        <svg className="w-3.5 h-2.5" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
                          <path d="M1 9h2v3H1V9zm4-3h2v6H5V6zm4-3h2v9H9V3zm4-3h2v12h-2V0z"/>
                        </svg>
                        <svg className="w-3.5 h-2.5" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
                          <path d="M8 2.5a9.5 9.5 0 0 1 6.36 2.45.6.6 0 0 1 .04.85l-.7.75a.6.6 0 0 1-.84.05 7.5 7.5 0 0 0-9.72 0 .6.6 0 0 1-.84-.05l-.7-.75a.6.6 0 0 1 .04-.85A9.5 9.5 0 0 1 8 2.5zm0 3.5a6 6 0 0 1 4 1.55.55.55 0 0 1 .03.78l-.68.73a.55.55 0 0 1-.77.05 4.3 4.3 0 0 0-5.16 0 .55.55 0 0 1-.77-.05l-.68-.73a.55.55 0 0 1 .03-.78A6 6 0 0 1 8 6zm0 3.5a2.5 2.5 0 0 1 1.7.67.5.5 0 0 1 .02.7l-.9.96a.5.5 0 0 1-.72 0l-.9-.96a.5.5 0 0 1 .02-.7A2.5 2.5 0 0 1 8 9.5z"/>
                        </svg>
                        <svg className="w-4 h-2.5" viewBox="0 0 22 11" fill="none" stroke="currentColor" aria-hidden="true">
                          <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" strokeWidth="1"/>
                          <rect x="2" y="2" width="13" height="7" rx="1.5" fill="currentColor"/>
                          <path d="M20 3.5v4" strokeLinecap="round" strokeWidth="1.5"/>
                        </svg>
                      </div>
                    </div>

                    {/* App Interface: Actual Mobile Screen Image */}
                    <div className="relative flex-1 w-full overflow-hidden bg-[#faf9f5]">
                      <Image
                        src={mobileScreenImage}
                        alt="Resuma actual mobile workspace screen"
                        fill
                        className="object-cover object-top select-none pointer-events-none"
                        sizes="280px"
                        unoptimized
                        priority
                      />
                    </div>

                    {/* iOS Bottom Home Indicator */}
                    <div className="relative w-full h-[18px] bg-[#faf9f5] flex items-center justify-center pointer-events-none z-50 flex-shrink-0">
                      <div className="w-[108px] h-[4px] bg-[#171816]/30 rounded-full" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): EDITORIAL TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              {/* HIDDEN ON MOBILE (added hidden md:block) */}
              <p className="hidden md:block text-neutral-300 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CinematicHero;
