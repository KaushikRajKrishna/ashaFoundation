"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ManifestEntry } from "@/assets/images/gallery/manifest";

interface GalleryCaption {
  title: string;
  description: string;
}

interface LightboxProps {
  items: ManifestEntry[];
  captions: GalleryCaption[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ items, captions, activeIndex, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length, onClose, onNavigate]);

  const item = items[activeIndex];
  const caption = captions[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
      >
        <X size={20} />
      </button>

      <button
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex - 1 + items.length) % items.length);
        }}
        className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:left-6"
      >
        <ChevronLeft size={20} />
      </button>

      <motion.div
        key={item.fileName}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="flex max-h-[85vh] max-w-3xl flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-square w-full max-w-xl overflow-hidden rounded-2xl">
          <Image src={item.image} alt={caption?.title ?? "Gallery image"} fill className="object-cover" sizes="600px" />
        </div>
        {caption ? (
          <div className="text-center text-cream">
            <p className="font-display text-lg font-semibold">{caption.title}</p>
            <p className="text-sm text-cream/70">{caption.description}</p>
          </div>
        ) : null}
      </motion.div>

      <button
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((activeIndex + 1) % items.length);
        }}
        className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20 sm:right-6"
      >
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );
}
