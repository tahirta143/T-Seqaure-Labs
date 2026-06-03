"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Server, Database, Brain } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const OrbitScene = dynamic(() => import("../three/OrbitScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-card/20">
      <div className="w-10 h-10 rounded-full border-t-2 border-accent border-r-2 animate-spin"></div>
    </div>
  ),
});

export default function TechStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SLIDE IN FROM LEFT
      gsap.fromTo(
        containerRef.current.children,
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

  const stacks = [
    {
      icon: <Cpu className="w-5 h-5 text-sky-400" />,
      title: "Frontend Development",
      items: ["Flutter", "React Native", "Next.js 15", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      title: "Backend Services",
      items: ["Node.js", "Express.js", "REST APIs", "gRPC", "WebSockets"],
    },
    {
      icon: <Database className="w-5 h-5 text-indigo-400" />,
      title: "Databases & Cloud",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "AWS / Docker"],
    },
    {
      icon: <Brain className="w-5 h-5 text-pink-400" />,
      title: "Artificial Intelligence",
      items: ["OpenAI LLMs", "AI Agents", "LangChain", "Vector Embeddings"],
    },
  ];

  return (
    <section
      id="tech-stack"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-card/20 border-y border-border"
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: 3D Orbit Canvas (5 Cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <div className="border border-border/80 rounded-3xl bg-card/40 backdrop-blur-md overflow-hidden relative shadow-2xl p-6">
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                  Interactive 3D Stack
                </span>
              </div>
              <OrbitScene />
            </div>
            <p className="text-center text-xs opacity-40 mt-4">
              Drag left or right to orbit the technologies core.
            </p>
          </div>

          {/* Right: Tech Details (7 Cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
                Our Technology Orbit
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Modern Architectures Built for Enterprise Scale
              </h2>
              <p className="text-sm sm:text-base text-foreground/75 dark:text-gray-400 leading-relaxed">
                We select robust, future-proof tech stacks that guarantee low latencies, modularity, 
                and easy scaling for millions of active requests.
              </p>
            </div>

            <div className="tech-categories-container grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {stacks.map((stack, idx) => (
                <div
                  key={idx}
                  className="tech-category-block p-6 rounded-2xl glass-card border border-border flex flex-col space-y-4 hover:border-accent/40"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-card border border-border">
                      {stack.icon}
                    </div>
                    <h3 className="font-bold text-base">{stack.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {stack.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded bg-accent/5 text-accent border border-accent/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
