import Reveal from "@/components/shared/Reveal";
import ParallaxImage from "@/components/shared/ParallaxImage";
import mindfulnessImg from "@/assets/images/features/feature-1-mindfulness.jpg";
import home from "@/content/home.json";

export default function OurApproach() {
  const { approach } = home;

  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <ParallaxImage
            src={mindfulnessImg}
            alt={approach.imageAlt}
            className="relative aspect-square rounded-3xl sm:aspect-[4/3]"
            strength={40}
          />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-maroon uppercase">{approach.eyebrow}</span>
          <h2 className="font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl">
            {approach.title}
          </h2>
          {approach.paragraphs.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
