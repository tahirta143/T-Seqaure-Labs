"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef(null);
  const [projectType, setProjectType] = useState("Mobile App");
  const [budget, setBudget] = useState("$10k - $25k");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const projectTypes = ["Mobile App", "Web Development", "AI Integration", "SaaS Platform", "UI/UX Design"];
  const budgets = ["<$10k", "$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k+"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SLIDE IN FROM RIGHT
      gsap.fromTo(
        ".contact-inner-container",
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

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-background text-foreground border-t border-border grid-bg transition-colors duration-300"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="contact-inner-container max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="text-sm font-extrabold uppercase tracking-widest text-accent">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Let's Construct Something Remarkable
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
            Have a project or design in mind? Fill out the brief form below and our engineering team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Contact Info Widgets (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-xl font-bold border-b border-border/40 pb-4 mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-6">
              <a
                href="mailto:info@tsquaretechnologies.com"
                className="flex items-start space-x-4 p-6 rounded-2xl glass-card border border-border hover:border-accent transition-colors"
              >
                <div className="p-3 rounded-xl bg-card border border-border text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground/55 uppercase tracking-widest mb-1">
                    Email Address
                  </h4>
                  <p className="text-base font-semibold break-all">
                    info@tsquaretechnologies.com
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noreferrer"
                className="flex items-start space-x-4 p-6 rounded-2xl glass-card border border-border hover:border-accent transition-colors"
              >
                <div className="p-3 rounded-xl bg-card border border-border text-accent">
                  <FaWhatsapp size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground/55 uppercase tracking-widest mb-1">
                    WhatsApp Chat
                  </h4>
                  <p className="text-base font-semibold">
                    +1 (555) 019-2834
                  </p>
                </div>
              </a>

              <div className="flex items-start space-x-4 p-6 rounded-2xl glass-card border border-border">
                <div className="p-3 rounded-xl bg-card border border-border text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground/55 uppercase tracking-widest mb-1">
                    Direct Phone
                  </h4>
                  <p className="text-base font-semibold">
                    +1 (555) 019-2834
                  </p>
                </div>
              </div>
            </div>

            {/* Social handles */}
            <div className="pt-6">
              <h4 className="text-xs font-bold text-foreground/55 uppercase tracking-widest mb-4">
                Connect on Social Networks
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-card border border-border text-foreground/70 hover:text-foreground hover:border-accent flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-xl bg-card border border-border text-foreground/70 hover:text-foreground hover:border-accent flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-10 rounded-3xl glass-card border border-border/80 backdrop-blur-md space-y-6"
            >
              <h3 className="text-xl font-bold border-b border-border/40 pb-4 mb-6">
                Tell Us About Your Project
              </h3>

              {/* Project Type Select Pills */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-foreground/55 uppercase tracking-widest">
                  What kind of project?
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setProjectType(type)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        projectType === type
                          ? "bg-accent border-accent text-white shadow-[0_0_10px_var(--glow)]"
                          : "bg-card border-border hover:border-accent/40 text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Select Pills */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-foreground/55 uppercase tracking-widest">
                  Project budget (USD)
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {budgets.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setBudget(range)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        budget === range
                          ? "bg-accent border-accent text-white shadow-[0_0_10px_var(--glow)]"
                          : "bg-card border-border hover:border-accent/40 text-foreground/60 hover:text-foreground"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground/55 uppercase tracking-widest">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-accent focus:outline-none text-sm text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground/55 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-accent focus:outline-none text-sm text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-foreground/55 uppercase tracking-widest">
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formState.company}
                  onChange={handleInputChange}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-accent focus:outline-none text-sm text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-foreground/55 uppercase tracking-widest">
                  Project Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe your project, deadlines, and technical goals..."
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-accent focus:outline-none text-sm text-foreground resize-none"
                />
              </div>

              <button
                type="submit"
                className="glow-btn w-full py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-sm shadow-[0_0_15px_var(--glow)] transition-colors flex items-center justify-center space-x-2"
              >
                <MessageSquare size={16} />
                <span>{submitted ? "Message Sent Successfully!" : "Submit Project Inquiry"}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
