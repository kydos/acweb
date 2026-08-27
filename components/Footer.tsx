import Link from "next/link";
import { siteConfig, type NavLink } from "@/lib/siteConfig";

/**
 * Footer doubles as the site map. On a site four levels deep
 * (/zenoh/book/routing/peer-mode) it is the reliable way back to anything.
 * Columns are derived from siteConfig.navLinks so the menu and the footer
 * cannot drift apart.
 */
export function Footer() {
  const { social, navLinks } = siteConfig;
  const year = new Date().getFullYear();

  const zenoh = (navLinks as NavLink[]).find((l) => l.href === "/zenoh");
  const main = (navLinks as NavLink[]).filter((l) => l.href !== "/zenoh" && l.href !== "/");

  return (
    <footer className="border-t border-stone-200 dark:border-ink-wire mt-20">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">

          <div>
            <FooterHeading>Site</FooterHeading>
            <ul className="mt-3 space-y-2">
              {main.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Zenoh</FooterHeading>
            <ul className="mt-3 space-y-2">
              {zenoh?.children?.map((child) => (
                <li key={child.href}>
                  <FooterLink href={child.href}>{child.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterHeading>Elsewhere</FooterHeading>
            <ul className="mt-3 space-y-2">
              <li><FooterLink href={social.github}>GitHub</FooterLink></li>
              <li><FooterLink href={social.linkedin}>LinkedIn</FooterLink></li>
              <li>
                <FooterLink href="https://scholar.google.com/citations?user=o0xJE_4AAAAJ">
                  Google Scholar
                </FooterLink>
              </li>
              <li><FooterLink href="/feed.xml">RSS feed</FooterLink></li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <FooterHeading>Angelo Corsaro</FooterHeading>
            <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-ash">
              Inventor of the Zenoh Protocol. Writing on distributed systems, robotics, and
              the cloud-to-device continuum.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <SocialIcon href={social.github} label="GitHub">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </SocialIcon>
              <SocialIcon href={social.linkedin} label="LinkedIn">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone-200 dark:border-ink-wire
                        flex flex-col sm:flex-row items-center justify-between gap-3
                        text-sm text-stone-500 dark:text-ash">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p className="text-xs text-stone-400 dark:text-stone-500">
            Code:{" "}
            <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">AGPL-3.0</a>
            {" · "}Content:{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">CC BY-SA 4.0</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-mono uppercase tracking-[0.11em] text-stone-400 dark:text-ash">
      {children}
    </h2>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  const className =
    "text-sm text-stone-600 dark:text-fog hover:text-accent dark:hover:text-accent transition-colors";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-stone-400 dark:text-ash hover:text-accent dark:hover:text-accent transition-colors duration-200"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
