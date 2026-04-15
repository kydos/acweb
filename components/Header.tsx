"use client";

import { Link, usePathname } from "@/lib/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { siteConfig, type NavLink } from "@/lib/siteConfig";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

type NavKey =
  | "home" | "about" | "cv" | "blog" | "zenoh" | "contact"
  | "zenohReport" | "zenohBook" | "zenohPapers" | "zenohTalks" | "zenohSpec";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  // next-intl usePathname already strips the locale prefix
  const activePath = pathname || "/";

  return (
    /* Header is ALWAYS dark — ink background regardless of theme */
    <header className="sticky top-0 z-50 w-full border-b border-ink-wire bg-ink/95 backdrop-blur-md">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-16">

        {/* Logo — AC monogram with lightning bolt (AC = alternating current) */}
        <Link
          href="/"
          aria-label="Home — Angelo Corsaro"
          className="group flex items-center gap-2 select-none"
        >
          {/* Lightning bolt badge */}
          <span className="relative flex items-center justify-center w-8 h-8 rounded-md border border-[#818cf8]/40 group-hover:border-[#818cf8]/80 transition-colors duration-200 bg-[#818cf8]/5 group-hover:bg-[#818cf8]/10">
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
              <path
                d="M9 1L2 11H6.5L4 19L12 9H7.5Z"
                fill="#818cf8"
                className="group-hover:opacity-100 opacity-80 transition-opacity duration-200"
              />
            </svg>
          </span>
          {/* Monogram */}
          <span className="font-serif text-xl font-bold tracking-tight text-cream group-hover:text-accent transition-colors duration-200">
            AC
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {(siteConfig.navLinks as NavLink[]).map((link) => {
            const isActive =
              link.href === "/"
                ? activePath === "/"
                : activePath.startsWith(link.href);

            if (link.children && link.children.length > 0) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.key)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-1 px-3 py-2 text-sm transition-colors duration-200",
                      isActive ? "text-cream font-medium" : "text-sand hover:text-cream"
                    )}
                  >
                    {t(link.key as NavKey)}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="opacity-60 mt-px">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-px bg-accent rounded-full" />
                    )}
                  </Link>
                  {openDropdown === link.key && (
                    <div className="absolute top-full left-0 pt-1 min-w-[140px] z-50">
                      <div className="bg-ink border border-ink-wire rounded-md shadow-lg py-1">
                        {link.children.map((child) => (
                          isExternalHref(child.href) ? (
                            <a
                              key={child.href}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 text-sm text-sand hover:text-cream hover:bg-ink-card transition-colors duration-150"
                            >
                              {t(child.key as NavKey)}
                            </a>
                          ) : (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2 text-sm text-sand hover:text-cream hover:bg-ink-card transition-colors duration-150"
                            >
                              {t(child.key as NavKey)}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm transition-colors duration-200",
                  isActive
                    ? "text-cream font-medium"
                    : "text-sand hover:text-cream"
                )}
              >
                {t(link.key as NavKey)}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-px bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
          <div className="ml-3 flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-md border border-ink-wire text-sand hover:text-cream transition-colors"
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-ink-wire bg-ink px-6 py-4 space-y-1">
          {(siteConfig.navLinks as NavLink[]).map((link) => {
            const isActive =
              link.href === "/"
                ? activePath === "/"
                : activePath.startsWith(link.href);

            if (link.children && link.children.length > 0) {
              const isExpanded = mobileExpanded === link.key;
              return (
                <div key={link.href}>
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex-1 px-3 py-2 rounded-md text-sm transition-colors duration-200",
                        isActive ? "text-accent font-medium" : "text-sand hover:text-cream"
                      )}
                    >
                      {t(link.key as NavKey)}
                    </Link>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : link.key)}
                      className="px-2 py-2 text-sand hover:text-cream transition-colors"
                      aria-label="Toggle submenu"
                    >
                      <svg
                        width="12" height="12" viewBox="0 0 12 12"
                        fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                        className={cn("transition-transform duration-200", isExpanded ? "rotate-180" : "")}
                      >
                        <path d="M2 4L6 8L10 4" />
                      </svg>
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="ml-4 pl-3 border-l border-ink-wire space-y-0.5 mt-0.5">
                      {link.children.map((child) => (
                        isExternalHref(child.href) ? (
                          <a
                            key={child.href}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileOpen(false)}
                            className="block px-3 py-1.5 text-sm text-sand hover:text-cream transition-colors duration-150"
                          >
                            {t(child.key as NavKey)}
                          </a>
                        ) : (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-3 py-1.5 text-sm text-sand hover:text-cream transition-colors duration-150"
                          >
                            {t(child.key as NavKey)}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm transition-colors duration-200",
                  isActive
                    ? "text-accent font-medium"
                    : "text-sand hover:text-cream"
                )}
              >
                {t(link.key as NavKey)}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
