"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/lib/bookNav";

interface Props {
  locale: string;
  currentSlug: string;
}

function NavTree({
  locale,
  currentSlug,
  onClose,
}: Props & { onClose?: () => void }) {
  return (
    <nav className="px-3 py-6">
      <Link
        href={`/${locale}/zenoh/book`}
        onClick={onClose}
        className="block px-2 mb-5 text-xs font-mono uppercase tracking-widest text-stone-400 dark:text-ash hover:text-accent transition-colors"
      >
        ← The Zenoh Book
      </Link>
      <ul className="space-y-0.5">
        {navItems.map((item) => {
          const isSection = "children" in item;
          const isActive = currentSlug === item.slug;
          const isSectionOpen =
            isSection &&
            (currentSlug === item.slug ||
              currentSlug.startsWith(item.slug + "/"));

          return (
            <li key={item.slug}>
              <Link
                href={`/${locale}/zenoh/book/${item.slug}`}
                onClick={onClose}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent font-semibold"
                    : isSectionOpen
                    ? "text-stone-800 dark:text-cream font-medium"
                    : "text-stone-600 dark:text-fog hover:text-stone-900 dark:hover:text-cream hover:bg-stone-100 dark:hover:bg-ink-shell/40"
                }`}
              >
                {isSection && (
                  <span className="text-[10px] text-stone-400 dark:text-ash shrink-0">
                    {isSectionOpen ? "▾" : "▸"}
                  </span>
                )}
                {item.title}
              </Link>

              {isSection && isSectionOpen && (
                <ul className="mt-0.5 ml-3 pl-3 border-l border-stone-200 dark:border-ink-wire space-y-0.5">
                  {item.children.map((child) => {
                    const childActive = currentSlug === child.slug;
                    return (
                      <li key={child.slug}>
                        <Link
                          href={`/${locale}/zenoh/book/${child.slug}`}
                          onClick={onClose}
                          className={`block px-2 py-1 rounded-md text-sm transition-colors ${
                            childActive
                              ? "text-accent font-semibold"
                              : "text-stone-500 dark:text-fog hover:text-stone-800 dark:hover:text-cream hover:bg-stone-100 dark:hover:bg-ink-shell/40"
                          }`}
                        >
                          {child.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function BookSidebar({ locale, currentSlug }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-ink-card shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-stone-200 dark:border-ink-wire">
              <span className="text-sm font-semibold text-stone-900 dark:text-cream">
                Contents
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md text-stone-400 hover:text-stone-700 dark:hover:text-cream hover:bg-stone-100 dark:hover:bg-ink-shell"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <NavTree
              locale={locale}
              currentSlug={currentSlug}
              onClose={() => setOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Mobile toggle — floating button */}
      <button
        className="lg:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent text-white shadow-lg text-sm font-medium"
        onClick={() => setOpen(true)}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h8" />
        </svg>
        Contents
      </button>

      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto border-r border-stone-200 dark:border-ink-wire">
        <NavTree locale={locale} currentSlug={currentSlug} />
      </aside>
    </>
  );
}
