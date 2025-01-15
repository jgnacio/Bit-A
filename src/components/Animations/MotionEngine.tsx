"use client";
import { useRef, useEffect, useState, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registramos el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
}

const MotionEngine = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 1,
  ease = "power2.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
}: AnimatedContentProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    const xDistance =
      direction === "horizontal" ? (reverse ? -distance : distance) : 0;
    const yDistance =
      direction === "vertical" ? (reverse ? -distance : distance) : 0;

    // Configuración inicial
    gsap.set(element, {
      opacity: animateOpacity ? initialOpacity : 1,
      scale: scale,
      x: xDistance,
      y: yDistance,
    });

    // Crear la animación con ScrollTrigger
    const animation = gsap.to(element, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration: duration,
      ease: ease,
      scrollTrigger: {
        trigger: element,
        start: `top bottom-=${threshold * 100}%`,
        toggleActions: "play none none none",
        onEnter: () => setHasAnimated(true),
      },
    });

    // Cleanup
    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    hasAnimated,
  ]);

  return (
    <div ref={elementRef} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
};

export default MotionEngine;
