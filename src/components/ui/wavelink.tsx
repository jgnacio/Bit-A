import Link from "next/link";
import { motion } from "framer-motion";
import { SquareArrowUpRight } from "lucide-react";
import useCursorStore from "@/hooks/useCursorStore";

export const WaveLink = ({
  children,
  href,
}: {
  children: string;
  href: string;
}) => {
  const setCursor = useCursorStore((state) => state.setCursorType);

  const onPointerEnter = () => setCursor({ type: "diamond" });
  const onPointerLeave = () => setCursor({ type: "default" });
  return (
    <Link
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      href={href}
      className="inline-block"
    >
      <span className="flex items-center gap-1">
        <motion.span
          className="inline-block font-bold border-b-2 border-foreground"
          initial="initial"
          whileHover="hover"
          variants={{
            initial: {
              color: "inherit",
            },
            hover: {
              color: "inherit",
            },
          }}
        >
          {children.split("").map((char: string, index: number) => (
            <motion.span
              key={index}
              className="inline-block"
              variants={{
                initial: {
                  y: 0,
                  opacity: 1,
                },
                hover: {
                  y: [0, -5, 0], // Wave motion
                  transition: {
                    delay: index * 0.03, // Stagger effect
                    repeat: Infinity,
                    duration: 0.33,
                    ease: "easeInOut",
                  },
                },
                exit: {
                  y: [3, -3, 0], // Gentle return to original position
                  opacity: [0.7, 0.9, 1],
                  transition: {
                    delay: index * 0.03,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                },
              }}
              style={{
                display: "inline-block",
                willChange: "transform", // Performance optimization
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
        <motion.span
          className="flex items-center"
          initial="initial"
          whileHover="hover"
          variants={{
            initial: {
              x: 0,
              y: 0,
              backgroundColor: "transparent",
              rotateZ: 0,
            },
            hover: {
              x: 5,
              y: -5,
              rotateZ: 315,
            },
          }}
        >
          <SquareArrowUpRight />
        </motion.span>
      </span>
    </Link>
  );
};
