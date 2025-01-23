"use client";
import useCursorStore from "@/hooks/useCursorStore";
import { useGSAP } from "@gsap/react";
import { OS, useOs } from "@mantine/hooks";
import gsap from "gsap";
import { useEffect, useRef, useLayoutEffect } from "react";

const CustomCursor = () => {
  const os: OS = useOs();
  const showCustomCursor =
    os !== "android" && os !== "ios" && os !== "undetermined";

  if (!showCustomCursor) return null;

  return (
    <div
      id="custom-cursor-container"
      className="pointer-events-none fixed inset-0 z-[500] select-none"
    >
      <Cursor />
    </div>
  );
};

const Cursor = () => {
  const pointer = useRef<HTMLDivElement>(null);
  const { type, label } = useCursorStore();

  const getClipPath = (cursorType: string) => {
    const clipPaths: any = {
      default:
        "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
      hover:
        "polygon(0% 0%, 0% 100%, 5% 100%, 5% 5%, 95% 5%, 95% 95%, 5% 95%, 5% 100%, 100% 100%, 100% 0%)",
      diamond: "polygon(100% 100%, 100% 0%, 0% 0%, 0% 100%)",
    };
    return clipPaths[cursorType] || clipPaths.default;
  };

  useLayoutEffect(() => {
    const cursor = pointer.current;
    if (!cursor) return;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
    });
  });

  useGSAP(
    () => {
      if (!pointer.current) return;

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animaciones basadas en el tipo de cursor
      switch (type) {
        case "hover":
          timeline.to(pointer.current, {
            scale: 2.5,
            clipPath: getClipPath("hover"),
            duration: 0.5,
            ease: "power1.inOut",
          });
          break;
        case "diamond":
          timeline.to(pointer.current, {
            scale: 2.5,
            clipPath: getClipPath("diamond"),
            duration: 0.5,
          });
          break;
        default:
          timeline.to(pointer.current, {
            scale: 1,
            clipPath: getClipPath("default"),
            duration: 0.8,
          });
      }
    },
    { scope: pointer, dependencies: [type] }
  );

  useEffect(() => {
    const setCursorX = gsap.quickTo(pointer.current, "x", { duration: 0.1 });
    const setCursory = gsap.quickTo(pointer.current, "y", { duration: 0.1 });

    const onPointerMove = (event: PointerEvent) => {
      setCursorX(event.clientX);
      setCursory(event.clientY);

      gsap.to(pointer.current, {
        rotateZ: `+=${event.movementX + event.movementY * 2}`,
        duration: 0.035,
        ease: "power3.out",
      });
    };

    document?.body.addEventListener("pointermove", onPointerMove);
    return () => {
      document?.body.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      ref={pointer}
      className="size-4 absolute pointer-events-none"
      style={{
        backdropFilter: "invert(1)",
        filter: "contrast(200%) brightness(150%)",
      }}
    ></div>
  );
};

export default CustomCursor;
