import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/shared/Reveal";
import contact from "@/content/contact.json";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Asha Foundation for counseling, support groups, or general inquiries.",
};

const ICONS = {
  "map-pin": MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

function telHref(displayNumber: string) {
  return `tel:${displayNumber.replace(/[^\d+]/g, "")}`;
}

export default function ContactPage() {
  const { header, info, mapEmbedSrc, mapTitle } = contact;

  return (
    <>
      <PageHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="flex flex-col gap-8 lg:col-span-2">
            {info.map((item, i) => {
              const Icon = ICONS[item.icon as keyof typeof ICONS];
              return (
                <Reveal key={item.label} delay={i * 0.06} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-maroon-soft text-maroon-deep">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-maroon uppercase">{item.label}</p>
                    {Array.isArray(item.value) ? (
                      <div className="mt-1 flex flex-col gap-0.5">
                        {item.value.map((number) => (
                          <a key={number} href={telHref(number)} className="text-ink-soft hover:text-maroon">
                            {number}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-ink-soft">{item.value}</p>
                    )}
                  </div>
                </Reveal>
              );
            })}

            <Reveal delay={0.3} className="overflow-hidden rounded-2xl ring-1 ring-ink/5">
              <iframe
                src={mapEmbedSrc}
                title={mapTitle}
                className="h-64 w-full border-0 sm:h-80"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
