"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "../Providers";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "About", href: "#about" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      // Use Lenis smooth scrolling if available
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
          onClick={(e) => handleScrollTo(e, "body")}
          className="flex items-center space-x-2 text-2xl font-bold tracking-tight"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-white shadow-[0_0_15px_var(--glow)]">
            <Terminal size={22} className="relative z-10 animate-pulse" />
            <div className="absolute inset-0 rounded-lg bg-accent opacity-50 blur-sm"></div>
          </div>
          <span className="bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
            T Square
          </span>
          <span className="text-accent text-sm font-light uppercase tracking-widest self-end pb-1 hidden sm:inline-block">
            Technologies
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium opacity-80 hover:opacity-100 hover:text-accent transition-all duration-200 relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Theme and Action Buttons */}
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
            className="glow-btn px-5 py-2.5 rounded-lg bg-accent hover:bg-accent/95 text-white text-sm font-medium shadow-[0_0_15px_var(--glow)] transition-all duration-200"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile Control buttons */}
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

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-45 w-full max-w-xs sm:max-w-sm bg-background/98 backdrop-blur-xl border-l border-border px-6 py-24 flex flex-col justify-between transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xl font-semibold opacity-90 hover:opacity-100 hover:text-accent transition-all duration-200"
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
