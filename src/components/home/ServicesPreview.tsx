import Link from "next/link";
import { HeartHandshake, Users, PhoneCall, Home as HomeIcon } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import home from "@/content/home.json";

const ICONS = {
  "heart-handshake": HeartHandshake,
  users: Users,
  "phone-call": PhoneCall,
  home: HomeIcon,
};

export default function ServicesPreview() {
  const { servicesPreview } = home;

  return (
    <section className="bg-blush/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={servicesPreview.eyebrow} title={servicesPreview.title} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesPreview.items.map((service, i) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS];
            return (
              <Reveal key={service.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col gap-4 rounded-2xl bg-cream p-6 shadow-sm ring-1 ring-ink/5 transition-shadow hover:shadow-md">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-soft text-sage-deep transition-colors group-hover:bg-maroon group-hover:text-cream">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap justify-center gap-3">
          {servicesPreview.specializedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 rounded-full border border-maroon px-6 py-2.5 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
