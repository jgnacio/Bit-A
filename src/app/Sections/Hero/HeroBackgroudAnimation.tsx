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
      className={`flex items-center absolute -z-10 justify-center w-full h-full bg-black ${className}`}
    >
      {isInViewport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full h-full"
        >
          <Canvas dpr={dpr}>
            <Experience />
          </Canvas>
        </motion.div>
      )}
    </div>
  );
}
