"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "../Providers";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import navbarLogo from "@/app/navbar-logo.png";

const services = [
  {
    icon: "🌐",
    title: "Web Development",
    desc: "Fast, modern websites & web apps built with React & Next.js",
    color: "bg-accent/20",
  },
  {
    icon: "📱",
    title: "Mobile Apps",
    desc: "Cross-platform iOS & Android apps with React Native",
    color: "bg-emerald-500/20",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Pixel-perfect designs that convert visitors to customers",
    color: "bg-amber-500/20",
  },
  {
    icon: "🤖",
    title: "AI Integration",
    desc: "Embed smart AI features into your existing products",
    color: "bg-red-500/20",
  },
  {
    icon: "⚙️",
    title: "Backend & APIs",
    desc: "Scalable servers, REST & GraphQL APIs, databases",
    color: "bg-violet-500/20",
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    desc: "CI/CD pipelines, AWS/Vercel deployments & monitoring",
    color: "bg-teal-500/20",
  },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Our Projects", href: "#products" },
    { name: "About Us", href: "#about" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Contact Us", href: "#contact" },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    setServicesOpen(false);
    if (href === "#" || href === "body") {
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(target, { offset: -80 });
    } else {
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-background/90 backdrop-blur-md border-b border-border shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleScrollTo(e, "#")}
          className="flex items-center"
          aria-label="T Square Labs home"
        >
          <Image
            src={navbarLogo}
            alt="T Square Labs"
            priority
            className="h-12 w-40 rounded-lg object-cover object-center sm:w-52"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">

          {/* Home */}
          <a
            href="#"
            onClick={(e) => handleScrollTo(e, "#")}
            className="px-3 py-2 text-sm font-medium opacity-80 hover:opacity-100 hover:text-accent transition-all duration-200 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Services Dropdown */}
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium opacity-80 hover:opacity-100 hover:text-accent transition-all duration-200"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
            >
              Our Services
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Mega Dropdown */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-card border border-border rounded-2xl shadow-2xl p-5 transition-all duration-200 ${
                servicesOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              {/* Caret arrow */}
              <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-card border-l border-t border-border rotate-45" />

              <p className="text-[11px] font-semibold tracking-widest uppercase text-foreground/40 mb-4 pb-3 border-b border-border">
                What We Build For You
              </p>

              <div className="grid grid-cols-2 gap-2">
                {services.map((svc) => (
                  <a
                    key={svc.title}
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "#services")}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent/10 transition-all duration-150 group/card"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${svc.color}`}
                    >
                      {svc.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover/card:text-accent transition-colors">
                        {svc.title}
                      </p>
                      <p className="text-xs text-foreground/50 leading-relaxed mt-0.5">
                        {svc.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-border">
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="text-xs font-medium text-accent hover:underline"
                >
                  View all services →
                </a>
              </div>
            </div>
          </div>

          {/* Other nav links */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="px-3 py-2 text-sm font-medium opacity-80 hover:opacity-100 hover:text-accent transition-all duration-200 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg border border-border hover:border-accent bg-card/50 hover:bg-card text-foreground transition-all duration-200"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="glow-btn px-5 py-2.5 rounded-lg bg-accent hover:bg-accent/95 text-white text-sm font-semibold shadow-[0_0_15px_var(--glow)] transition-all duration-200"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border bg-card/50 text-foreground"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border border-border bg-card/50 text-foreground"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-45 w-full max-w-xs sm:max-w-sm bg-background/98 backdrop-blur-xl border-l border-border px-6 py-24 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col space-y-2 overflow-y-auto">

          {/* Home */}
          <a
            href="#"
            onClick={(e) => handleScrollTo(e, "#")}
            className="text-xl font-semibold opacity-90 hover:text-accent transition-colors py-2"
          >
            Home
          </a>

          {/* Mobile Services Accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between w-full text-xl font-semibold opacity-90 hover:text-accent transition-colors py-2"
            >
              Our Services
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileServicesOpen && (
              <div className="mt-2 ml-2 flex flex-col gap-3 pb-3">
                {services.map((svc) => (
                  <a
                    key={svc.title}
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "#services")}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${svc.color}`}
                    >
                      {svc.icon}
                    </div>
                    <span className="text-sm font-medium opacity-80 group-hover:text-accent transition-colors">
                      {svc.title}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Other links */}
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xl font-semibold opacity-90 hover:text-accent transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex flex-col space-y-4">
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="glow-btn w-full text-center py-3 rounded-lg bg-accent text-white font-semibold shadow-[0_0_15px_var(--glow)]"
          >
            Book Consultation
          </a>
          <p className="text-xs text-center opacity-40">
            © {new Date().getFullYear()} T Square Technologies.
          </p>
        </div>
      </div>
    </header>
  );
}