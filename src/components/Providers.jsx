"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export default function Providers({ children }) {
  const [theme, setTheme] = useState("dark"); // Default to dark mode as premium theme
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  // Smooth scroll configuration
  useEffect(() => {
    if (!mounted) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    });

    // Connect Lenis to requestAnimationFrame
    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Make lenis global for gsap ScrollTrigger integration
    window.lenisInstance = lenis;

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.lenisInstance = null;
    };
  }, [mounted]);

  // Prevent flash before mounted
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
