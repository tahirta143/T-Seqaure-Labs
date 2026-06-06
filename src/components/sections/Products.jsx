"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Products() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
      // color: "#10b981",
      image: "/expense.png",
      description:
        "Enterprise-grade financial monitor utilizing AI categorizations, instant invoices, and detailed chart analyses.",
      techStack: ["Flutter", "Dart", "localDB", "OpenAI API"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
    {
      title: "Hims App",
      type: "fitness",
      // color: "#f43f5e",
      image: "/app.png",
      description:
        "HIMS is a healthcare management platform that streamlines hospital operations, including patient records, appointments, billing, prescriptions, and staff management.",
      techStack: ["React Native", "Expo", "SQLite", "Reanimated"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
    {
      title: "Hims Website",
      type: "chatbot",
      // color: "#3b82f6",
      image: "/image.png",
      description:
        "HIMS is a healthcare management platform that streamlines hospital operations, including patient records, appointments, billing, prescriptions, and staff management.",
      techStack: ["React", "Express.js", "MySql", "Node.js"],
      liveLink: "https://waseeladiabesity.com/",
      gitLink: "https://github.com/example",
    },
    {
      title: "School Management System",
      type: "school",
      // color: "#a855f7",
      image: "/image.png",
      description:
        "Complete academic SaaS portal supporting grades, classroom management, fees invoices, and notifications.",
      techStack: ["React", "Express.js", "PostgreSQL", "Node.js"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
    {
      title: "Restaurant POS",
      type: "pos",
      // color: "#f59e0b",
      image: "/image.png",
      description:
        "Offline-first point-of-sale tool with real-time kitchen syncing, order layouts, and automated receipt prints.",
      techStack: ["Flutter", "Dart", "Hive DB", "Firebase"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
    {
      title: "E-Commerce Platform",
      type: "ecommerce",
      // color: "#6366f1",
      image: "/image.png",
      description:
        "Modern marketplace platform with optimized SEO grids, Stripe terminal checkouts, and custom dashboard reviews.",
      techStack: ["Next.js", "PostgreSQL", "Stripe API", "TailwindCSS"],
      liveLink: "https://demo.example.com",
      gitLink: "https://github.com/example",
    },
  ];

  return (
    <section
      id="products"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-background"
    >
      {/* Decorative blob */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

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
            In addition to custom client engineering, we build internal product
            ecosystems. Check out our state-of-the-art SaaS assets.
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((project, index) => (
            <div
              key={index}
              className="product-card rounded-2xl border border-border bg-card/40 backdrop-blur-md overflow-hidden flex flex-col hover:border-accent/40 shadow-lg group hover:-translate-y-1 transition-all duration-300"
            >
              {/* ─── Image Container ───────────────────────────────────────
                  Fixed height (h-52 = 208px) so every card is uniform.
                  object-top on hover smoothly pans to object-bottom,
                  letting users "scroll" through tall mobile screenshots.
              ──────────────────────────────────────────────────────────── */}
              <div className="relative w-full h-52 bg-gradient-to-br from-[#0c0c0e] to-[#16161a] overflow-hidden flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    w-full h-full
                    object-cover object-top
                    group-hover:object-bottom
                    transition-[object-position] duration-[2000ms] ease-in-out
                    group-hover:scale-105
                    scale-100
                    transition-transform
                  "
                />

                {/* Subtle color accent bar at the bottom of the image */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-80"
                  style={{ backgroundColor: project.color }}
                />
              </div>

              {/* ─── Content ────────────────────────────────────────────── */}
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
                      className="flex-1 inline-flex items-center justify-center space-x-2 py-2 px-3 rounded-lg bg-accent text-white text-xs font-bold shadow-md hover:bg-accent/90 transition-colors"
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