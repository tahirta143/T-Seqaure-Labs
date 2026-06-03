"use client";

import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SLIDE IN FROM LEFT
      gsap.fromTo(
        ".testimonials-inner-wrapper",
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const reviews = [
    {
      name: "Marcus Vance",
      role: "CEO, ApexRetail",
      text: "T Square Technologies delivered our marketplace platform on schedule. The 3D animations and fast loading times are incredible.",
      rating: 5,
    },
    {
      name: "Sophia Chen",
      role: "VP of Product, CarePulse",
      text: "The AI agent platform they integrated into our customer flow cut support ticket loads by 40% in just two weeks.",
      rating: 5,
    },
    {
      name: "David K.",
      role: "Founder, FitSync",
      text: "Exceptional architecture design! Our fitness tracker app operates offline-first flawlessly, saving local SQLite cache without delays.",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "CTO, EduLearn",
      text: "Their Next.js developers are top-notch. Lighthouse SEO scores hit 98/100, which dramatically boosted our organic sign-ups.",
      rating: 5,
    },
    {
      name: "James L.",
      role: "Operations Dir, FastPOS",
      text: "The Restaurant POS Flutter system they built is clean, robust, and performs beautifully on low-spec tablets.",
      rating: 5,
    },
  ];

  // Duplicate reviews to create seamless loop effect
  const doubleReviews = [...reviews, ...reviews];

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-card/20"
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="testimonials-inner-wrapper w-full">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <span className="text-sm font-extrabold uppercase tracking-widest text-accent mb-4 block">
            Client Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            What Tech Leaders Say About Us
          </h2>
        </div>

        {/* Infinite Scroll Marquee Wrapper */}
        <div className="relative w-full flex items-center justify-start overflow-hidden py-4">
          {/* Left/Right Fade Mask */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling flex track */}
          <div className="flex space-x-6 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap min-w-max">
            {doubleReviews.map((rev, idx) => (
              <div
                key={idx}
                className="inline-block w-[300px] sm:w-[380px] p-6 rounded-2xl glass-card border border-border/80 backdrop-blur-md select-none shrink-0"
              >
                <div className="flex items-center space-x-1 text-amber-500 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-foreground/85 italic leading-relaxed mb-6 whitespace-normal">
                  "{rev.text}"
                </p>
                <div className="border-t border-border/40 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{rev.name}</h4>
                    <p className="text-[10px] text-foreground/50 font-medium">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Styles for Infinite Marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
