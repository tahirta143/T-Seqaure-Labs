"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Stats() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const statsList = document.querySelectorAll(".stat-count");

      statsList.forEach((el) => {
        const targetVal = parseInt(el.getAttribute("data-target"), 10);
        const counterObj = { value: 0 };

        gsap.to(counterObj, {
          value: targetVal,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.innerText = Math.floor(counterObj.value).toLocaleString();
          },
        });
      });

      // SLIDE IN FROM RIGHT
      gsap.fromTo(
        ".stats-wrapper",
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const statsData = [
    { label: "Projects Completed", target: 20, suffix: "+" },
    { label: "Core Technologies", target: 10, suffix: "+" },
    { label: "Client Satisfaction", target: 100, suffix: "%" },
    { label: "Support Coverage", target: 24, suffix: "/7" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-16 relative overflow-hidden bg-background text-foreground border-y border-border transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="stats-wrapper grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className="stat-card p-6 rounded-2xl bg-card border border-border/80 backdrop-blur-sm text-center flex flex-col justify-center items-center hover:border-accent/40 transition-all duration-200"
            >
              <div className="flex items-baseline justify-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-accent mb-3 tracking-tight">
                <span className="stat-count" data-target={stat.target}>
                  0
                </span>
                <span className="text-xl sm:text-2xl ml-0.5">{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-foreground/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
