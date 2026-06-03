"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Products from "@/components/sections/Products";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Products />
        <TechStack />
        <About />
        <WhyChooseUs />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
