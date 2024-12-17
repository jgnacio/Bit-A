"use client";
import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { use, useEffect, useRef } from "react";

import { Zen_Dots } from "next/font/google";
import { Canvas } from "@react-three/fiber";
import Experience from "@/components/Scenes/Experience";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WaveLink } from "@/components/ui/wavelink";
import { OS, useOs } from "@mantine/hooks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { mapValue } from "@/lib/mapValue";

const zenDots = Zen_Dots({ subsets: ["latin"], weight: ["400"] });

export default function Overview() {
  const container = useRef<HTMLDivElement>(null);
  const Overview2 = useRef<HTMLDivElement>(null);

  // Scroll progress for the entire container
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative h-[500vh]">
      <Section01 scrollYProgress={scrollYProgress} />
      <Section02 scrollYProgress={scrollYProgress} />
    </div>
  );
}

const Section01 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scale = useTransform(scrollYProgress, [0.2, 1], [1, 0.7]);
  const y = useTransform(scrollYProgress, [0.15, 1], [0, 1000]);

  // Transform values for the entry animation

  return (
    <div className=" w-full h-[200vh] px-2 sm:px-16 lg:px-64">
      <motion.div
        style={{
          scale,
          y,
        }}
        className="sticky top-0 w-full h-screen  flex flex-col items-center justify-center gap-12 xl:py-8"
      >
        <h2 className={`sm:text-7xl text-5xl font-black`}>
          Haz Crecer Tu Negocio con Nuestra Alianza Estratégica Digital
        </h2>
        <p className="font-medium text-2xl">
          <WaveLink href={"#"}>Conviértete en proveedor</WaveLink> de páginas
          web personalizadas, gana comisiones por cada cliente y recibe ingresos
          adicionales con la venta de materiales promocionales que producimos
          directamente contigo.
        </p>
      </motion.div>
    </div>
  );
};

const Section02 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  // No mostrar en SmartPhones
  const os: OS = useOs();
  const showAesthetics =
    os !== "android" && os !== "ios" && os !== "undetermined";

  const loaderSpline1 = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colorText1 = useTransform(
    scrollYProgress,
    [0.5, 0.6],
    ["rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)"]
  );

  const colorText2 = useTransform(
    scrollYProgress,
    [0.6, 0.75],
    ["rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)"]
  );

  const colorText3 = useTransform(
    scrollYProgress,
    [0.75, 1],
    ["rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)"]
  );

  useGSAP(
    () => {
      if (loaderSpline1.current) {
        const path = loaderSpline1.current.querySelector("path");

        if (path) {
          const length = path.getTotalLength();

          // Configura el dasharray y dashoffset inicial
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          // Crear una animación que sigue directamente scrollYProgress
          const unsubscribe = scrollYProgress.on("change", (progress) => {
            gsap.set(path, {
              strokeDashoffset:
                length * (1 - mapValue(progress, 0.38, 1, 0, 1)),
            });
          });
          return () => unsubscribe();
        }
      }
    },
    {
      scope: loaderSpline1,
      dependencies: [scrollYProgress],
    }
  );

  return (
    <div className="h-[300vh] relative">
      <div className="flex justify-between relative h-32 w-full">
        {showAesthetics && (
          <>
            <div className="h-32 w-12 md:h-56 md:w-36 rounded-r-full overflow-hidden z-20">
              <Canvas>
                <Experience />
              </Canvas>
            </div>
            <div className="h-32 w-12 md:h-56 md:w-36 rounded-l-full overflow-hidden z-20">
              <Canvas>
                <Experience />
              </Canvas>
            </div>
          </>
        )}
        <motion.div className="absolute w-full h-full bg-white/30 backdrop-blur-sm"></motion.div>
      </div>

      <motion.div
        className={`sticky top-0 w-full h-screen flex flex-col items-center justify-end lg:text-7xl text-4xl font-black text-background bg-background`}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
          scale: useTransform(scrollYProgress, [0, 0.3], [0.8, 1]),
        }}
      >
        <motion.div
          className="absolute w-full bg-black z-20"
          style={{
            height: useTransform(scrollYProgress, [0.2, 0.5], ["0vh", "150vh"]),
          }}
        ></motion.div>
        <div
          className="h-full flex flex-col items-center justify-center"
          ref={containerRef}
        >
          <svg
            ref={loaderSpline1}
            className="h-full w-full absolute z-30 hidden lg:block"
            width="1896"
            height="863"
            viewBox="0 0 1896 863"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-37.5 10H618.5L800 191.5L725.5 266H1469.5V456L1070 855.5H1927.5"
              stroke="white"
              strokeWidth="25"
            />
          </svg>

          <div className="flex flex-col justify-center items-start">
            <motion.span className="z-30" style={{ color: colorText1 }}>
              Sin inversión inicial.
            </motion.span>
            <motion.span className="z-30" style={{ color: colorText2 }}>
              Sin complicaciones.
            </motion.span>
            <motion.span className="z-30" style={{ color: colorText3 }}>
              Solo resultados.
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
