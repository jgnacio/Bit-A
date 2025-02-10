"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import HeroBackgroudAnimation from "./HeroBackgroudAnimation";
import { Button } from "@/components/ui/button";
import { useLenis } from "lenis/react";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    const letters = text.textContent?.split("");

    if (!letters) return;

    text.textContent = "";

    letters.forEach((letter) => {
      const span = document?.createElement("span");
      span.textContent = letter;
      span.className = "inline-block";
      text.appendChild(span);
    });

    gsap.set(text.children, {
      color: "white",
      textShadow: "none",
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    tl.to(text.children, {
      duration: 0.1,
      color: "transparent",
      textShadow: "2px 2px #00ffff, -2px -2px #ff00ff",
      ease: "none",
      stagger: {
        each: 0.05,
        from: "random",
      },
    })
      .to(text.children, {
        duration: 0.1,
        color: "white",
        textShadow: "none",
        ease: "none",
      })
      .to(text.children, {
        duration: 0.1,
        color: "transparent",
        textShadow: "-2px 2px #00ffff, 2px -2px #ff00ff",
        ease: "none",
        stagger: {
          each: 0.05,
          from: "random",
        },
      })
      .to(text.children, {
        duration: 0.1,
        color: "white",
        textShadow: "none",
        ease: "none",
      });

    // Parallax effect on scroll
    window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset;
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${
          scrollPosition * 0.5
        }px)`;
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div className="relative h-screen" id="home">
      {/* Video de fondo */}
      <HeroBackgroudAnimation />
      {/* <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90  h-[100vw] object-cover"
      >
        <source
          src="https://res.cloudinary.com/dhq5ewbyu/video/upload/v1731596491/Bit-A/videos/u9jlw2sbas6ycszncxut.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta el tag de video.
      </video> */}

      {/* Overlay para mejorar la legibilidad del texto */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div> */}

      {/* Contenido del hero */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-12 text-background">
        <img
          src="https://res.cloudinary.com/dhq5ewbyu/image/upload/v1736904000/Bit-A_v7_White_avmyet.svg"
          alt="Bit-A Desarrollo Web"
          className="w-[12rem] mb-5 pointer-events-none select-none sm:w-[10rem] md:w-[15rem] lg:w-[20rem]"
        ></img>
        <h1 className={`text-2xl md:text-4xl font-black mb-4`}>
          Diseño web profesional para negocios locales
        </h1>
        <p className="text-lg md:text-xl mb-9 max-w-3xl">
          Transforma tu negocio local en una{" "}
          <span className="font-black"> potencia digital</span>. Cuéntanos sobre
          tu proyecto, y te mostraremos cómo atraer más clientes y maximizar tu
          impacto en línea.
        </p>
        <a href="#FormContact">
          <Button className="bg-background text-foreground py-3 px-9 text-lg font-semibold transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:bg-background flex items-center">
            Solicita Tu Asesoría Gratis
            <ArrowRight className="ml-2" />
          </Button>
        </a>
      </div>

      {/* Elementos decorativos futuristas */}
      {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div> */}
      {/* <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full filter blur-3xl opacity-20"></div> */}
      {/* <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-20"></div> */}
    </div>
  );
}
