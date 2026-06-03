"use client";

import React from "react";
import { Terminal, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
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
    <footer className="relative border-t border-border bg-background text-foreground pt-20 pb-10 overflow-hidden transition-colors duration-300">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <a
              href="#"
              onClick={(e) => handleScrollTo(e, "body")}
              className="flex items-center space-x-2 text-2xl font-bold tracking-tight"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent text-white shadow-[0_0_10px_var(--glow)]">
                <Terminal size={18} />
              </div>
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-accent bg-clip-text text-transparent">
                T Square
              </span>
            </a>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Transforming ideas into powerful digital products. We develop premium mobile applications, 
              scalable SaaS systems, and intelligent AI agents for modern enterprises.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-card border border-border hover:border-accent text-foreground/70 hover:text-foreground flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-card border border-border hover:border-accent text-foreground/70 hover:text-foreground flex items-center justify-center transition-all duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-card border border-border hover:border-accent text-foreground/70 hover:text-foreground flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-accent">
              Our Services
            </h3>
            <ul className="space-y-4 text-sm text-foreground/75">
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-accent transition-colors">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-accent transition-colors">
                  Next.js & React Web Apps
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-accent transition-colors">
                  AI Agents & Chatbots
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-accent transition-colors">
                  SaaS Platforms
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className="hover:text-accent transition-colors">
                  UI/UX Interface Design
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-accent">
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm text-foreground/75">
              <li>
                <a href="#products" onClick={(e) => handleScrollTo(e, "#products")} className="hover:text-accent transition-colors">
                  Our Products
                </a>
              </li>
              <li>
                <a href="#tech-stack" onClick={(e) => handleScrollTo(e, "#tech-stack")} className="hover:text-accent transition-colors">
                  Technology Stack
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#why-choose-us" onClick={(e) => handleScrollTo(e, "#why-choose-us")} className="hover:text-accent transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="hover:text-accent transition-colors">
                  Book Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-accent">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm text-foreground/75">
              <li className="flex items-start space-x-3">
                <Mail size={16} className="text-accent mt-1 flex-shrink-0" />
                <span className="break-all">info@tsquaretechnologies.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={16} className="text-accent mt-1 flex-shrink-0" />
                <span>+1 (555) 019-2834</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-accent mt-1 flex-shrink-0" />
                <span>Silicon Valley, CA, USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-foreground/50 space-y-4 md:space-y-0">
          <p>© {currentYear} T Square Technologies. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
