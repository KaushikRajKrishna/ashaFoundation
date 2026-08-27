"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/images/logo/logo1.png";
import site from "@/content/site.json";

type NavLink =
  | { href: string; label: string; children?: undefined }
  | { href?: undefined; label: string; children: { href: string; label: string }[] };

const NAV_LINKS = site.nav.links as NavLink[];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  // Navbar persists across client-side navigations, so hover/expanded state
  // (which the mouse leaving would normally clear) can otherwise get stuck
  // open on the page you just navigated to. Reset it during render rather
  // than in an effect (react.dev's "adjusting state when a prop changes").
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setDesktopDropdown(null);
    setOpen(false);
    setMobileExpanded(null);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-blush/70 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image src={logo} alt="Asha Foundation logo" className="h-11 w-11 object-contain" priority />
          <span className="font-display text-lg font-semibold text-maroon-deep">{site.brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            if (!link.children) {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium tracking-wide transition-colors hover:text-maroon ${
                    active ? "text-maroon" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-maroon"
                    />
                  ) : null}
                </Link>
              );
            }

            const children = link.children;
            const active = children.some((c) => pathname === c.href);
            const isDropdownOpen = desktopDropdown === link.label;

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDesktopDropdown(link.label)}
                onMouseLeave={() => setDesktopDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setDesktopDropdown(isDropdownOpen ? null : link.label)}
                  className={`relative flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-maroon ${
                    active ? "text-maroon" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  {active ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-maroon"
                    />
                  ) : null}
                </button>

                <AnimatePresence>
                  {isDropdownOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 z-50 w-64 -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl bg-cream py-2 shadow-lg ring-1 ring-ink/10">
                        {children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm transition-colors hover:bg-blush/60 hover:text-maroon-deep ${
                              pathname === child.href ? "text-maroon-deep" : "text-ink-soft"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <Link
          href={site.nav.ctaHref}
          className="hidden rounded-full bg-maroon px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-maroon-deep md:inline-block"
        >
          {site.nav.ctaLabel}
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-ink md:hidden"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-blush/70 bg-cream md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => {
                if (!link.children) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                        pathname === link.href ? "bg-blush text-maroon-deep" : "text-ink-soft"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                }

                const children = link.children;
                const active = children.some((c) => pathname === c.href);
                const isExpanded = mobileExpanded === link.label;

                return (
                  <div key={link.label}>
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => setMobileExpanded(isExpanded ? null : link.label)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium ${
                        active ? "text-maroon-deep" : "text-ink-soft"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={16} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isExpanded ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 py-1 pl-6">
                            {children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className={`rounded-lg px-3 py-2 text-sm ${
                                  pathname === child.href ? "bg-blush text-maroon-deep" : "text-ink-soft"
                                }`}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
