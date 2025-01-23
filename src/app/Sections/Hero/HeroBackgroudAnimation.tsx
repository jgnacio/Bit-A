"use client";
import Experience from "@/components/Scenes/Experience";
import { useInViewport } from "@/hooks/useInViewport";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroBackgroudAnimation({
  className,
}: {
  className?: string;
}) {
  const [dpr, setDpr] = useState<[number, number]>([1, 1]);
  const { ref, isInViewport } = useInViewport<HTMLDivElement>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDpr([0.6, window.innerWidth > 1080 ? 1 : 0.6]);
    }
  }, []);
  return (
    <div className="bg-black w-full h-full absolute">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full h-full absolute z-10"
      >
        <div
          ref={ref}
          className={`flex items-center absolute z-20 justify-center w-full h-full ${className}`}
        >
          {isInViewport && (
            <Canvas dpr={dpr}>
              <Experience />
            </Canvas>
          )}
        </div>
      </motion.div>
    </div>
  );
}
