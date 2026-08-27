import type { StaticImageData } from "next/image";
import {
  HeartHandshake,
  Users,
  PhoneCall,
  Home as HomeIcon,
  School,
  Stethoscope,
  ShieldCheck,
  Brain,
  Puzzle,
  ClipboardList,
  Check,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import ParallaxImage from "@/components/shared/ParallaxImage";
import CtaBanner from "@/components/home/CtaBanner";

const ICONS = {
  "heart-handshake": HeartHandshake,
  users: Users,
  "phone-call": PhoneCall,
  home: HomeIcon,
  school: School,
  stethoscope: Stethoscope,
  "shield-check": ShieldCheck,
  brain: Brain,
  puzzle: Puzzle,
  "clipboard-list": ClipboardList,
};

interface TreatmentProgramContent {
  header: { eyebrow: string; title: string; subtitle: string };
  imageAlt: string;
  overview: { eyebrow: string; title: string; paragraphs: string[] };
  offerings: { title: string; items: { title: string; description: string; icon: string }[] };
  whoItsFor: { title: string; items: string[] };
  process: { eyebrow: string; title: string; steps: { title: string; description: string }[] };
}

interface TreatmentProgramPageProps {
  content: TreatmentProgramContent;
  image: StaticImageData;
}

export default function TreatmentProgramPage({ content, image }: TreatmentProgramPageProps) {
  const { header, imageAlt, overview, offerings, whoItsFor, process } = content;

  return (
    <>
      <PageHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 flex flex-col gap-4 lg:order-1">
            <SectionHeading eyebrow={overview.eyebrow} title={overview.title} align="left" />
            <div className="mt-2 flex flex-col gap-4 text-ink-soft">
              {overview.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <ParallaxImage
              src={image}
              alt={imageAlt}
              className="relative aspect-square rounded-3xl sm:aspect-[4/3]"
              strength={40}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-blush/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title={offerings.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.items.map((item, i) => {
              const Icon = ICONS[item.icon as keyof typeof ICONS];
              return (
                <Reveal
                  key={item.title}
                  delay={(i % 3) * 0.08}
                  className="flex flex-col gap-4 rounded-2xl bg-cream p-7 shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-soft text-maroon-deep">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{item.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading title={whoItsFor.title} />
        <div className="mt-10 flex flex-col gap-4">
          {whoItsFor.items.map((item, i) => (
            <Reveal key={item} delay={i * 0.06} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage-deep">
                <Check size={14} />
              </span>
              <span className="text-ink-soft">{item}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sage-soft/50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading eyebrow={process.eyebrow} title={process.title} />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1} className="relative flex flex-col gap-3 text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-sage-deep font-display text-sm font-semibold text-cream">
                  {i + 1}
                </span>
                <h3 className="font-display text-base font-semibold text-ink">{step.title}</h3>
                <p className="text-sm text-ink-soft">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
