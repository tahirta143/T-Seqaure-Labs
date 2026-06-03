"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Shield, ShieldCheck, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SLIDE IN FROM RIGHT
      gsap.fromTo(
        ".about-inner-container",
        { opacity: 0, x: 80 },
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

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: "Innovation",
      description:
        "We push boundaries, integrating state-of-the-art AI agents and design methodologies into every single project.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-blue-500" />,
      title: "Quality",
      description:
        "We maintain high engineering standards, clean architecture, and exhaustive code quality checks.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      title: "Trust",
      description:
        "Transparent communication, client ownership, and consistent long-term partnerships define our values.",
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Scalability",
      description:
        "We build solutions prepared for millions of active users, using modern cloud setups and clean code.",
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-card/30 border-y border-border"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="about-inner-container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: General Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
              Who We Are
            </span>
            <h2 className="about-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              We Craft Software That Drives Exponential Business Growth
            </h2>
            <p className="about-desc text-base sm:text-lg text-foreground/70 dark:text-gray-400 leading-relaxed">
              At T Square Technologies, we are architects of premium digital solutions. We combine advanced development workflows, UI/UX aesthetics, and artificial intelligence to design products that scale effortlessly. 
              Our agency has worked with enterprises, startups, and clients worldwide, implementing complex full-stack solutions and high-performing mobile setups.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 text-accent font-semibold group hover:underline"
              >
                <span>Learn more about our methods</span>
                <span className="transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right: Core Values Grid */}
          <div className="lg:col-span-7">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8 text-accent text-left lg:text-right">
              Our Core Values
            </h3>
            <div className="values-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((val, idx) => (
                <div
                  key={idx}
                  className="value-card p-8 rounded-2xl glass-card border border-border flex flex-col items-start space-y-4 hover:translate-y-[-5px]"
                >
                  <div className="p-3 rounded-xl bg-card border border-border">
                    {val.icon}
                  </div>
                  <h4 className="text-xl font-bold">{val.title}</h4>
                  <p className="text-sm text-foreground/75 dark:text-gray-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
