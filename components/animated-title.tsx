"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function AnimatedTitle() {
  const [isHovered, setIsHovered] = useState(false);
  const devRef = useRef<HTMLSpanElement>(null);
  const [devWidth, setDevWidth] = useState(0);

  useEffect(() => {
    if (devRef.current) {
      setDevWidth(devRef.current.offsetWidth);
    }
  }, []);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Decorative hover effect, not functionally interactive
    <div
      className="inline-block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="presentation"
    >
      {/* "dev" that slides out to the left */}
      <motion.span
        ref={devRef}
        className="inline-block"
        initial={false}
        animate={{
          x: isHovered ? -devWidth : 0,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ display: "inline-block" }}
      >
        dev
      </motion.span>

      {/* "elopmental.dev" wrapper that shifts left and reveals ".dev" */}
      <motion.span
        className="inline-block"
        initial={false}
        animate={{
          x: isHovered ? -devWidth : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ display: "inline-block" }}
      >
        elopmental
        <motion.span
          className="inline-block"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 20,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
            delay: isHovered ? 0.2 : 0,
          }}
          style={{ display: "inline-block" }}
        >
          .dev
        </motion.span>
      </motion.span>
    </div>
  );
}
