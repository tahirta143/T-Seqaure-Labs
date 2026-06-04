"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Landmark, Activity, MessageSquareCode, GraduationCap, LayoutGrid, ShoppingCart } from "lucide-react";
import { FaGithub } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Visual Mockup Sub-Component to avoid placeholder images
function ProductMockup({ type, color }) {
  return (
    <div className="relative w-full h-48 rounded-t-xl bg-gradient-to-br from-[#0c0c0e] to-[#16161a] border-b border-border overflow-hidden flex items-center justify-center">
      {/* Dynamic background rings */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-white"></div>
      </div>
      
      {/* Animated glowing backplate */}
      <div className="absolute w-24 h-24 rounded-full blur-2xl opacity-10 animate-pulse" style={{ backgroundColor: color }}></div>

      {/* Decorative Console Frame */}
      <div className="w-[85%] h-[80%] rounded-lg border border-white/5 bg-[#050505]/70 backdrop-blur-md p-3 relative flex flex-col justify-between shadow-inner">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/5">
          <div className="flex space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/80"></span>
            <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
          </div>
          <span className="text-[8px] font-mono opacity-40">t-square-console.sh</span>
        </div>

        {/* Dynamic Inner Content based on Product Type */}
        <div className="flex-1 flex items-center justify-center pt-2">
          {type === "expense" && (
            <div className="text-center space-y-2">
              <Landmark className="w-8 h-8 mx-auto" style={{ color }} />
              <div className="text-xs font-bold font-mono text-emerald-400">+$2,450.00</div>
              <div className="text-[7px] font-mono opacity-50">Expenses categorized dynamically</div>
            </div>
          )}
          {type === "fitness" && (
            <div className="text-center space-y-2">
              <Activity className="w-8 h-8 mx-auto" style={{ color }} />
              <div className="text-xs font-bold font-mono text-rose-400">12,480 STEPS</div>
              <div className="text-[7px] font-mono opacity-50">Daily cardiac cycle tracking</div>
            </div>
          )}
          {type === "chatbot" && (
            <div className="text-center space-y-2">
              <MessageSquareCode className="w-8 h-8 mx-auto" style={{ color }} />
              <div className="text-xs font-bold font-mono text-blue-400">AGENT ONLINE</div>
              <div className="text-[7px] font-mono opacity-50">Neural completions connected</div>
            </div>
          )}
          {type === "school" && (
            <div className="text-center space-y-2">
              <GraduationCap className="w-8 h-8 mx-auto" style={{ color }} />
              <div className="text-xs font-bold font-mono text-purple-400">98.4% AVERAGE</div>
              <div className="text-[7px] font-mono opacity-50">Academics & grading pipeline</div>
            </div>
          )}
          {type === "pos" && (
            <div className="text-center space-y-2">
              <LayoutGrid className="w-8 h-8 mx-auto" style={{ color }} />
              <div className="text-xs font-bold font-mono text-amber-400">TABLE 04: CLOSED</div>
              <div className="text-[7px] font-mono opacity-50">Realtime ticket printing</div>
            </div>
          )}
          {type === "ecommerce" && (
            <div className="text-center space-y-2">
              <ShoppingCart className="w-8 h-8 mx-auto" style={{ color }} />
              <div className="text-xs font-bold font-mono text-indigo-400">CART CHECKOUT</div>
              <div className="text-[7px] font-mono opacity-50">Secure Stripe flow connected</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SLIDE IN FROM RIGHT
      gsap.fromTo(
        ".products-header, .product-card",
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
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

  const productsData = [
    {
      title: "Expense Tracker App",
      type: "expense",
      color: "#10b981",
      description: "Enterprise-grade financial monitor utilizing AI categorizations, instant invoices, and detailed chart analyses.",
      techStack: ["Flutter", "Dart", "localDB", "OpenAI API"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
    {
      title: "Fitness Tracker",
      type: "fitness",
      color: "#f43f5e",
      description: "Biometric monitoring application supporting steps counters, calorie tracking, and cardiac charts.",
      techStack: ["React Native", "Expo", "SQLite", "Reanimated"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
    {
      title: "AI Chatbot Platform",
      type: "chatbot",
      color: "#3b82f6",
      description: "Custom AI agent orchestrator connecting LangChain pipelines, fine-tuned LLMs, and socket updates.",
      techStack: ["Next.js", "OpenAI API", "LangChain", "WebSockets"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
    {
      title: "School Management System",
      type: "school",
      color: "#a855f7",
      description: "Complete academic SaaS portal supporting grades, classroom management, fees invoices, and notifications.",
      techStack: ["React", "Express.js", "PostgreSQL", "Node.js"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
    {
      title: "Restaurant POS",
      type: "pos",
      color: "#f59e0b",
      description: "Offline-first point-of-sale tool with real-time kitchen syncing, order layouts, and automated receipt prints.",
      techStack: ["Flutter", "Dart", "Hive DB", "Firebase"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
    {
      title: "E-Commerce Platform",
      type: "ecommerce",
      color: "#6366f1",
      description: "Modern marketplace platform with optimized SEO grids, Stripe terminal checkouts, and custom dashboard reviews.",
      techStack: ["Next.js", "PostgreSQL", "Stripe API", "TailwindCSS"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
  ];

  return (
    <section
      id="products"
      ref={containerRef}
      className="py-24 relative overflow-hidden grid-bg"
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="products-header text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
            Our Products
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready-Made SaaS Solutions & Platforms
          </h2>
          <p className="text-sm sm:text-base text-foreground/75 dark:text-gray-400 leading-relaxed">
            In addition to custom client engineering, we build internal product ecosystems. Check out our state-of-the-art SaaS assets.
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((project, index) => (
            <div
              key={index}
              className="product-card rounded-2xl border border-border bg-card/40 backdrop-blur-md overflow-hidden flex flex-col justify-between hover:border-accent/40 shadow-lg group hover:translate-y-[-4px] transition-all"
            >
              {/* Top: Mockup Graph */}
              <ProductMockup type={project.type} color={project.color} />

              {/* Mid: Content Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-foreground/70 dark:text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 space-y-4">
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-foreground/5 text-foreground/70 border border-foreground/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-3 pt-2 border-t border-border/50">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-accent text-white text-xs font-bold shadow-md hover:bg-accent/90"
                    >
                      <ExternalLink size={13} />
                      <span>Live Demo</span>
                    </a>
                    <a
                      href={project.gitLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-card border border-border text-foreground/80 hover:text-foreground hover:border-accent transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <FaGithub size={15} />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
