"use client";
import Experience from "@/components/Scenes/Experience";
import { useInViewport } from "@/hooks/useInViewport";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function HeroBackgroudAnimation({
  className,
}: {
  className?: string;
}) {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);
  const { ref, isInViewport } = useInViewport<HTMLDivElement>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDpr([1, window.innerWidth > 1080 ? 1.5 : 6]);
    }
  }, []);
  return (
    <div
      ref={ref}
      className={`flex items-center absolute -z-10 justify-center w-full h-full bg-white ${className}`}
    >
      {isInViewport && (
        <Canvas dpr={dpr}>
          <Experience />
        </Canvas>
      )}
    </div>
  );
}
