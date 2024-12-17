"use client";

import { useEffect } from "react";
import Hero from "./Sections/Hero/Hero";
import Overview from "./Sections/Overview";
import ContactForm from "./Sections/ContactForm";
import Footer from "./Sections/Footer";
import Lenis from "lenis";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main>
      <Hero />
      <Overview />
      {/* <Projects /> */}
      {/* <CTAPostProjects /> */}
      <ContactForm />
      <Footer />
    </main>
  );
}
