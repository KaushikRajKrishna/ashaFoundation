import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import ParallaxImage from "@/components/shared/ParallaxImage";
import connectionImg from "@/assets/images/features/feature-3-connection.jpg";
import site from "@/content/site.json";

export default function CtaBanner() {
  const { ctaBanner } = site;

  return (
    <section className="px-6 pb-20">
      <Reveal className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-sage via-sage-deep to-dusk-deep px-8 py-16 text-center">
        <ParallaxImage
          src={connectionImg}
          alt={ctaBanner.imageAlt}
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          strength={25}
        />
        <div className="relative flex flex-col items-center gap-6">
          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">{ctaBanner.heading}</h2>
          <p className="max-w-xl text-cream/85">{ctaBanner.description}</p>
          <Link
            href={ctaBanner.buttonHref}
            className="rounded-full bg-cream px-7 py-3 text-sm font-semibold text-maroon-deep transition-transform hover:scale-105"
          >
            {ctaBanner.buttonLabel}
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
