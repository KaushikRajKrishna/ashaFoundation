"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxImageProps {
  src: StaticImageData;
  alt: string;
  className?: string;
  /** Max travel distance in pixels, applied in both directions while the section is in view. */
  strength?: number;
  sizes?: string;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 50,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y }}
        className="absolute inset-[-8%]"
      >
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} priority={priority} />
      </motion.div>
    </div>
  );
}
