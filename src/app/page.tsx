"use client";

import { useEffect } from "react";
import Hero from "./Sections/Hero/Hero";
import Overview from "./Sections/Overview";
import ContactForm from "./Sections/ContactForm";
import Footer from "./Sections/Footer";
import Lenis from "lenis";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Generic scroll function that can be used for any element
    const scrollToElement = (target: string | HTMLElement) => {
      let element: HTMLElement | null = null;

      if (typeof target === "string") {
        // If target is a string (like '#contact'), querySelector it
        element = document.querySelector(target) as HTMLElement;
      } else {
        // If target is already an HTMLElement
        element = target;
      }

      if (element) {
        lenis.scrollTo(element, {
          offset: 0,
          duration: 1.2,
        });
      }
    };

    // Handle anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor?.hash) {
        e.preventDefault();
        scrollToElement(anchor.hash);
      }
    };

    // Add click event listener
    document.addEventListener("click", handleAnchorClick);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
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
