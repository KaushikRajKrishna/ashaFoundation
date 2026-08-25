import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import gallery from "@/content/gallery.json";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A glimpse into Asha Foundation's programs, workshops, and community moments.",
};

export default function GalleryPage() {
  const { header } = gallery;
  return (
    <>
      <PageHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <GalleryGrid />
      </section>
    </>
  );
}
