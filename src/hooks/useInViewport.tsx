import { useState, useEffect, useRef } from "react";

export function useInViewport<T extends HTMLElement>() {
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.005 } // Se activa cuando al menos el 0.5% del componente es visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInViewport };
}
