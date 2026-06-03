"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";

// Dynamically import the 3D Canvas with SSR disabled
const HeroScene = dynamic(() => import("../three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-card/20">
      <div className="w-12 h-12 rounded-full border-t-2 border-accent border-r-2 animate-spin"></div>
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Character reveal animation
      gsap.fromTo(
        ".split-char",
        {
          y: "110%",
          opacity: 0,
        },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.03,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      // Fade in subhead & CTAs
      gsap.fromTo(
        ".hero-fade",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.8,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Custom text splitter for headline character animations
  const splitText = (text) => {
    return text.split(" ").map((word, wordIdx) => (
      <span key={wordIdx} className="split-word">
        {word.split("").map((char, charIdx) => (
          <span key={charIdx} className="split-char">
            {char}
          </span>
        ))}
        {/* Render space character */}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  };

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(targetElement, { offset: -80 });
      } else {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden grid-bg"
    >
      {/* Visual Ambient Overlays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Hero Copy (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Badge */}
          <div className="hero-fade inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-card border border-border w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-foreground/80">
              Next-Gen Software Agency
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-foreground">
            {splitText("Building The Future With Mobile, Web & AI")}
          </h1>

          <p className="hero-fade text-lg md:text-xl text-foreground/80 dark:text-gray-300 font-medium mb-10 max-w-2xl leading-relaxed">
            T Square Technologies develops high-performance applications and intelligent software solutions for modern businesses.
          </p>

          <div className="hero-fade flex flex-wrap gap-4">
            <a
              href="#products"
              onClick={(e) => handleScrollTo(e, "#products")}
              className="glow-btn px-8 py-4 rounded-xl bg-accent text-white font-semibold text-base shadow-[0_0_20px_var(--glow)]"
            >
              View Our Products
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="px-8 py-4 rounded-xl glass-card border border-border text-foreground hover:bg-card/30 font-semibold text-base transition-colors"
            >
              Book Consultation
            </a>
          </div>
        </div>

        {/* 3D WebGL Canvas Area (5 Cols) */}
        <div className="lg:col-span-5 h-[350px] sm:h-[450px] lg:h-[550px] relative flex items-center justify-center">
          <div className="absolute inset-0 z-0 bg-radial from-transparent to-background/5 pointer-events-none"></div>
          <div className="w-full h-full relative z-10">
            <HeroScene />
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-50 hover:opacity-100 transition-opacity">
        <span className="text-[10px] uppercase tracking-widest font-semibold mb-2">
          Scroll Down
        </span>
        <div className="w-6 h-10 rounded-full border border-foreground/30 flex justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-accent animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
