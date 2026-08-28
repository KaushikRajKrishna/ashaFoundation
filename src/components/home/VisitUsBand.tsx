import { MapPin } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import MapLocationBadge from "@/components/shared/MapLocationBadge";
import home from "@/content/home.json";
import contact from "@/content/contact.json";
import site from "@/content/site.json";

export default function VisitUsBand() {
  const { visit } = home;
  const { mapEmbedSrc, mapTitle } = contact;
  const { address } = site.contactInfo;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-5">
          <span className="text-xs font-semibold tracking-[0.2em] text-maroon uppercase">{visit.eyebrow}</span>
          <p className="font-display text-2xl leading-relaxed font-medium text-ink sm:text-3xl">{visit.line}</p>
          <span className="flex items-center gap-2 text-ink-soft">
            <MapPin size={18} className="shrink-0 text-maroon" /> {address}
          </span>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-maroon px-6 py-2.5 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-cream"
          >
            {visit.buttonLabel}
          </a>
        </Reveal>

        <Reveal
          delay={0.1}
          className="relative aspect-square overflow-hidden rounded-3xl ring-1 ring-ink/5 sm:aspect-[4/3]"
        >
          <iframe
            src={mapEmbedSrc}
            title={mapTitle}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <MapLocationBadge />
        </Reveal>
      </div>
    </section>
  );
}
