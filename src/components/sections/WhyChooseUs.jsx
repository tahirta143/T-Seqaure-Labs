"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, ShieldCheck, HeartHandshake, BrainCircuit, HardDriveDownload, Hammer } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SLIDE IN FROM LEFT
      gsap.fromTo(
        ".why-inner-container",
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

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: "Fast Delivery",
      description: "We optimize workflows and iterate quickly, shipping fully functional software updates without delays.",
    },
    {
      icon: <Hammer className="w-5 h-5 text-blue-500" />,
      title: "Modern Technologies",
      description: "We code using state-of-the-art Next.js 15, Flutter, and server systems that stand out.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      title: "Clean Architecture",
      description: "We implement testable, clean designs (SOLID, MVVM, Clean Architecture) so modifications are simple.",
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-pink-500" />,
      title: "AI Expertise",
      description: "We build smart agents, LangChain wrappers, and custom model integrations directly in production.",
    },
    {
      icon: <HardDriveDownload className="w-5 h-5 text-violet-500" />,
      title: "Scalable Systems",
      description: "We configure containerized clusters and modular backend code that supports expansion.",
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-500" />,
      title: "Long-Term Support",
      description: "We provide maintenance, regular updates, optimization reviews, and active 24/7 dev monitoring.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-card/10 border-y border-border"
    >
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="why-inner-container max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20 space-y-4">
          <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
            Why Partner With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            An Engineering Culture Driven by High Standards
          </h2>
          <p className="text-sm sm:text-base text-foreground/75 dark:text-gray-400 leading-relaxed">
            We operate like an elite tech department. We write highly performant code and construct systems prepared for enterprise audits.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="why-card p-8 rounded-2xl glass-card border border-border flex flex-col items-start space-y-4 hover:translate-y-[-4px]"
            >
              <div className="p-3 rounded-xl bg-card border border-border">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold">{feature.title}</h3>
              <p className="text-sm text-foreground/75 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
