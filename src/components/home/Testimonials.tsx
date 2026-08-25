import { Quote } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import home from "@/content/home.json";

export default function Testimonials() {
  const { testimonials } = home;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.attribution} delay={i * 0.1}>
              <figure className="flex h-full flex-col gap-4 rounded-2xl bg-sage-soft/60 p-7 ring-1 ring-sage/20">
                <Quote className="text-sage-deep" size={26} />
                <blockquote className="flex-1 text-sm leading-relaxed text-ink italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-xs font-semibold text-sage-deep">{t.attribution}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
