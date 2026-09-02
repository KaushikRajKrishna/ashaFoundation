import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import MonogramAvatar from "@/components/shared/MonogramAvatar";
import ParallaxImage from "@/components/shared/ParallaxImage";
import CtaBanner from "@/components/home/CtaBanner";
import about from "@/content/about.json";
import growthImg from "@/assets/images/features/feature-2-growth.jpg";
import balanceImg from "@/assets/images/features/feature-5-balance.jpg";
import journeyImg from "@/assets/images/features/feature-6-journey.jpg";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Asha Foundation's mission, values, and the team behind our mental health programs.",
};

const TONE_TITLE_CLASS: Record<string, string> = {
  maroon: "text-maroon-deep",
  sage: "text-sage-deep",
};

export default function AboutPage() {
  const { header, story, missionVision, values, milestones, team } = about;

  return (
    <>
      <PageHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 flex flex-col gap-4 lg:order-1">
            <SectionHeading eyebrow={story.eyebrow} title={story.title} align="left" />
            <div className="mt-2 flex flex-col gap-4 text-ink-soft">
              {story.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <ParallaxImage
              src={growthImg}
              alt={story.imageAlt}
              className="relative aspect-square rounded-3xl sm:aspect-[4/3]"
              strength={40}
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-blush/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {missionVision.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.1} className="rounded-2xl bg-cream p-8 ring-1 ring-ink/5">
                <h3 className={`font-display text-xl font-semibold ${TONE_TITLE_CLASS[card.tone]}`}>
                  {card.title}
                </h3>
                <p className="mt-3 text-ink-soft">{card.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <ParallaxImage src={balanceImg} alt={values.imageAlt} className="absolute inset-0" strength={30} />
        <div className="absolute inset-0 bg-cream/88" />

        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow={values.eyebrow} title={values.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.items.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08} className="rounded-2xl bg-cream/90 p-6 text-center shadow-sm ring-1 ring-ink/5">
                <h3 className="font-display text-lg font-semibold text-ink">{value.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <ParallaxImage
                src={journeyImg}
                alt={milestones.imageAlt}
                className="relative aspect-square rounded-3xl sm:aspect-[4/3]"
                strength={40}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading eyebrow={milestones.eyebrow} title={milestones.title} align="left" />
              <div className="mt-8 flex flex-col gap-6">
                {milestones.items.map((m, i) => (
                  <Reveal key={m.year} delay={0.1 + i * 0.08} className="flex gap-5">
                    <span className="font-display text-lg font-semibold text-dusk-deep">{m.year}</span>
                    <span className="border-l border-dusk/30 pl-5 text-ink-soft">{m.description}</span>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow={team.eyebrow} title={team.title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.members.map((member, i) => (
            <Reveal
              key={member.name}
              delay={i * 0.08}
              className="flex flex-col items-center gap-3 rounded-2xl bg-blush/40 p-6 text-center"
            >
              <MonogramAvatar name={member.name} index={i} initials={member.initials} />
              <h3 className="font-display text-base font-semibold text-ink">{member.name}</h3>
              <span className="text-xs font-semibold text-maroon uppercase">{member.role}</span>
              <p className="text-sm text-ink-soft">{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
