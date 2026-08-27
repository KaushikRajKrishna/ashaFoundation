import Reveal from "@/components/shared/Reveal";
import ParallaxImage from "@/components/shared/ParallaxImage";
import hopeImg from "@/assets/images/features/feature-4-hope.jpg";
import home from "@/content/home.json";

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden py-16">
      <ParallaxImage src={hopeImg} alt={home.statsBackgroundAlt} className="absolute inset-0" strength={35} />
      <div className="absolute inset-0 bg-maroon-deep/80" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
        {home.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="text-center">
            <p className="font-display text-3xl font-semibold text-cream sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm text-cream/70">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
