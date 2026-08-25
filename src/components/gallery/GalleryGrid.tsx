"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { images } from "@/assets/images/gallery/manifest";
import gallery from "@/content/gallery.json";
import Lightbox from "@/components/gallery/Lightbox";

const galleryCaptions = gallery.images;

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-blush/40 p-10 text-center text-ink-soft">
        Add images to src/assets/images/gallery to populate this gallery.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((item, i) => {
          const caption = galleryCaptions[i];
          return (
            <motion.button
              key={item.fileName}
              onClick={() => setActiveIndex(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={item.image}
                alt={caption?.title ?? "Gallery image"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="font-display text-sm font-semibold text-cream">{caption?.title}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeIndex !== null ? (
          <Lightbox
            items={images}
            captions={galleryCaptions}
            activeIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={setActiveIndex}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
