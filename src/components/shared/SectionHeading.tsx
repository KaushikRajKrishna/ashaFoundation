import Reveal from "@/components/shared/Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  const subtitleColor = tone === "dark" ? "text-cream/80" : "text-ink-soft";
  const eyebrowColor = tone === "dark" ? "text-blush" : "text-maroon";

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className={`text-xs font-semibold tracking-[0.2em] uppercase ${eyebrowColor}`}>
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">{title}</h2>
      {subtitle ? <p className={`text-base leading-relaxed sm:text-lg ${subtitleColor}`}>{subtitle}</p> : null}
    </Reveal>
  );
}
