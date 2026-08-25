import Reveal from "@/components/shared/Reveal";

export default function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="bg-gradient-to-br from-maroon-deep via-maroon to-dusk-deep px-6 py-24 text-center">
      <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4">
        <span className="text-xs font-semibold tracking-[0.2em] text-blush uppercase">{eyebrow}</span>
        <h1 className="font-display text-4xl font-semibold text-cream sm:text-5xl">{title}</h1>
        <p className="text-cream/80">{subtitle}</p>
      </Reveal>
    </section>
  );
}
