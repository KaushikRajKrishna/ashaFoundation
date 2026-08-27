"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/images/logo/logo1.png";
import site from "@/content/site.json";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.56c0-.86.24-1.44 1.47-1.44h1.57V4.49C16.2 4.4 15.3 4.33 14.26 4.33c-2.19 0-3.69 1.34-3.69 3.79v2.32H7.99v2.96h2.58V21h2.93Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.1" cy="6.9" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 4l7.2 9.2L4.3 20h1.9l5.9-6.7 4.6 6.7H20l-7.5-9.7L19 4h-1.9l-5.4 6.2L7.7 4H4Z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a2.994 2.994 0 0 0-2.106-2.116C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.392.525A2.994 2.994 0 0 0 .502 6.186 31.32 31.32 0 0 0 0 12a31.32 31.32 0 0 0 .502 5.814 2.994 2.994 0 0 0 2.106 2.116c1.887.525 9.392.525 9.392.525s7.505 0 9.392-.525a2.994 2.994 0 0 0 2.106-2.116A31.32 31.32 0 0 0 24 12a31.32 31.32 0 0 0-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.85.5 3.58 1.36 5.07L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.83 14.06c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.83-.12-.42-.14-.96-.31-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3s.74-2.13 1-2.42c.26-.29.58-.36.77-.36h.55c.18 0 .42-.03.65.5.24.55.8 1.9.87 2.04.07.14.11.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.7 1.16 1.51 1.88 1.04.93 1.91 1.22 2.19 1.36.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.53.72 1.79.85.26.13.43.19.5.3.07.11.07.63-.17 1.31Z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
  youtube: YoutubeIcon,
  whatsapp: WhatsAppIcon,
};

function telHref(displayNumber: string) {
  return `tel:${displayNumber.replace(/[^\d+]/g, "")}`;
}

export default function Footer() {
  const { brand, footer, contactInfo } = site;

  return (
    <footer className="border-t border-blush bg-blush/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt={`${brand.name} logo`} className="h-10 w-10 object-contain" />
            <span className="font-display text-base font-semibold text-maroon-deep">{brand.name}</span>
          </Link>
          <p className="max-w-xs text-sm text-ink-soft">{footer.tagline}</p>
          <div className="flex gap-3 pt-1">
            {footer.socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.icon as keyof typeof SOCIAL_ICONS];
              return (
                <a
                  key={social.icon}
                  href={social.href}
                  aria-label={social.label}
                  target={social.target}
                  rel={social.target === "_blank" ? "noopener noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream text-maroon transition-colors hover:bg-maroon hover:text-cream"
                >
                  <Icon width={16} height={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold text-ink">{footer.quickLinksHeading}</h3>
          {footer.quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-ink-soft hover:text-maroon">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold text-ink">{footer.contactHeading}</h3>
          <span className="flex items-center gap-2 text-sm text-ink-soft">
            <MapPin size={16} className="shrink-0 text-maroon" /> {contactInfo.address}
          </span>
          <span className="flex items-start gap-2 text-sm text-ink-soft">
            <Phone size={16} className="mt-0.5 shrink-0 text-maroon" />
            <span className="flex flex-col gap-0.5">
              {contactInfo.phones.map((number) => (
                <a key={number} href={telHref(number)} className="hover:text-maroon">
                  {number}
                </a>
              ))}
            </span>
          </span>
          <span className="flex items-center gap-2 text-sm text-ink-soft">
            <Mail size={16} className="shrink-0 text-maroon" /> {contactInfo.email}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold text-ink">{footer.newsletter.heading}</h3>
          <p className="text-sm text-ink-soft">{footer.newsletter.description}</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder={footer.newsletter.placeholder}
              className="w-full min-w-0 rounded-full border border-ink/10 bg-cream px-4 py-2 text-sm outline-none focus:border-maroon"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream hover:bg-maroon-deep"
            >
              {footer.newsletter.buttonLabel}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-ink/5 py-5 text-center text-xs text-ink-soft">
        {footer.copyright.replace("{year}", String(new Date().getFullYear()))}
      </div>
    </footer>
  );
}
