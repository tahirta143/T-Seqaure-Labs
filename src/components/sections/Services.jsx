"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Globe, BrainCircuit, Layers, Palette, Cloud } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 3D Tilt Card Component
function ServiceCard({ icon, title, description, badge, details }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized values (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Set rot angles (max 15 deg)
    const rotateX = -normalizedY * 18;
    const rotateY = normalizedX * 18;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card-item relative h-full p-8 rounded-2xl glass-card border border-border flex flex-col justify-between overflow-hidden transition-all duration-200 ease-out select-none radial-glow"
      style={{
        "--x": "50%",
        "--y": "50%",
      }}
    >
      <div className="absolute inset-0 bg-radial from-accent/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>

      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="p-3.5 rounded-xl bg-card border border-border text-accent shadow-md">
            {icon}
          </div>
          {badge && (
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-sm text-foreground/80 dark:text-gray-400 leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="border-t border-border/50 pt-4 mt-auto">
        <ul className="flex flex-wrap gap-2">
          {details.map((detail, idx) => (
            <li
              key={idx}
              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-foreground/5 text-foreground/70"
            >
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SLIDE IN FROM LEFT
      gsap.fromTo(
        ".services-header, .service-card-item",
        { opacity: 0, x: -80 },
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

  const servicesData = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Apps",
      description:
        "Stunning, high-fidelity native and cross-platform mobile apps for iOS and Android built on industry-standard platforms.",
      badge: "Flagship",
      details: ["Flutter", "React Native", "Swift", "Kotlin"],
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Web Development",
      description:
        "Highly optimized Next.js full-stack web applications featuring premium SEO layouts and fluid client transitions.",
      badge: "Core",
      details: ["Next.js", "React", "TypeScript", "Node.js"],
    },
    {
      icon: <BrainCircuit className="w-6 h-6" />,
      title: "AI Solutions",
      description:
        "Intelligent custom agent software, LangChain connections, vector databases, and responsive OpenAI completions.",
      badge: "Futuristic",
      details: ["LLMs", "AI Agents", "LangChain", "Vector DBs"],
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "SaaS Products",
      description:
        "Multi-tenant architectures, secure billing pipelines, custom databases, and sleek dashboards ready to scale.",
      badge: "Premium",
      details: ["Architecture", "Stripe", "Auth0", "SQL/NoSQL"],
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "UI/UX Design",
      description:
        "Figma prototypes, premium layouts, wireframes, and responsive user flows crafted to grab customer retention.",
      badge: "Creative",
      details: ["Figma", "Wireframes", "Design Systems", "Prototyping"],
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Infrastructure",
      description:
        "Scalable server configurations, microservice setups, load balancers, and robust continuous integrations.",
      badge: "Enterprise",
      details: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    },
  ];

  return (
    <section
      id="services"
      ref={containerRef}
      className="py-24 relative overflow-hidden grid-bg"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="services-header text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            High-Performance Digital Engineering
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 dark:text-gray-400 leading-relaxed">
            We deliver state-of-the-art architectures, modern UI/UX design systems, and advanced AI integrations to help companies lead.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              badge={service.badge}
              details={service.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
