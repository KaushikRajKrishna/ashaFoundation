import Reveal from "@/components/shared/Reveal";
import home from "@/content/home.json";

export default function MissionStrip() {
  const { mission } = home;
  return (
    <section className="mx-auto max-w-4xl px-6 py-12 text-center">
      <Reveal>
        <span className="text-xs font-semibold tracking-[0.2em] text-maroon uppercase">{mission.eyebrow}</span>
        <p className="mt-4 font-display text-2xl leading-relaxed font-medium text-ink sm:text-3xl">
          {mission.text}
        </p>
      </Reveal>
    </section>
  );
}
