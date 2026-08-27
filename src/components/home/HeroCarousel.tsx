"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "@/assets/images/carousel/manifest";
import home from "@/content/home.json";

const carouselCaptions = home.hero.captions;

const AUTOPLAY_MS = 5500;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex((next + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current || images.length <= 1) return;
    const id = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, goTo]);

  if (images.length === 0) {
    return (
      <div className="flex h-[70vh] items-center justify-center bg-blush text-ink-soft">
        Add images to src/assets/images/carousel to populate the hero carousel.
      </div>
    );
  }

  const current = images[index];
  const caption = carouselCaptions[index] ?? "";

  return (
    <section
      className="relative h-[52vh] min-h-[340px] max-h-[480px] w-full overflow-hidden bg-ink sm:h-[78vh] sm:max-h-none sm:min-h-[420px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={current.fileName}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={current.image}
            alt={caption || "Asha Foundation"}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-10 sm:px-10 sm:py-14">
        <div />
        <div className="flex flex-col items-end gap-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={caption}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="max-w-md text-right font-display text-2xl leading-snug font-medium text-cream italic drop-shadow-sm sm:text-3xl"
            >
              &ldquo;{caption}&rdquo;
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img.fileName}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-cream" : "w-2 bg-cream/40 hover:bg-cream/70"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Previous slide"
                onClick={() => goTo(index - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur transition-colors hover:bg-cream/30"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Next slide"
                onClick={() => goTo(index + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur transition-colors hover:bg-cream/30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
