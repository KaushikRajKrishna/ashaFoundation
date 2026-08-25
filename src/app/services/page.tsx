import type { Metadata } from "next";
import {
  HeartHandshake,
  Users,
  PhoneCall,
  Sparkles,
  Home as HomeIcon,
  School,
  Video,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import CtaBanner from "@/components/home/CtaBanner";
import services from "@/content/services.json";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore Asha Foundation's counseling, therapy, and community mental health programs.",
};

const ICONS = {
  "heart-handshake": HeartHandshake,
  users: Users,
  "phone-call": PhoneCall,
  sparkles: Sparkles,
  home: HomeIcon,
  school: School,
  video: Video,
};

export default function ServicesPage() {
  const { header, servicesSection, process } = services;

  return (
    <>
      <PageHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading title={servicesSection.title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesSection.items.map((service, i) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS];
            return (
              <Reveal
                key={service.title}
                delay={(i % 3) * 0.08}
                className="flex flex-col gap-4 rounded-2xl bg-blush/30 p-7 ring-1 ring-ink/5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-soft text-maroon-deep">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-ink">{service.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{service.description}</p>
              </Reveal>
            );
          })}
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
