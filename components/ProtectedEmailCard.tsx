"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function decode(chars: readonly number[]) {
  return chars.map((char) => String.fromCharCode(char)).join("");
}

const email =
  `${decode([97, 110, 103, 101, 108, 111])}` +
  `@${decode([99, 111, 114, 115, 97, 114, 111])}` +
  `.${decode([109, 101])}`;

export function ProtectedEmailCard() {
  const t = useTranslations("contact");
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="p-6 rounded-xl border border-stone-200 dark:border-ink-wire bg-white dark:bg-ink-card">
      <h2 className="font-semibold text-stone-800 dark:text-cream">
        {t("email")}
      </h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-ash">
        {t("emailDesc")}
      </p>

      <div className="mt-4">
        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="inline-flex items-center rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-700 transition-colors hover:border-azure hover:text-azure dark:border-ink-wire dark:text-sand dark:hover:border-azure dark:hover:text-sky"
          >
            {t("revealEmail")}
          </button>
        ) : (
          <div className="space-y-3">
            <p className="font-mono text-sm text-stone-700 break-all dark:text-cream">
              {email}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-700 transition-colors hover:border-azure hover:text-azure dark:border-ink-wire dark:text-sand dark:hover:border-azure dark:hover:text-sky"
              >
                {copied ? t("copied") : t("copyEmail")}
              </button>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center rounded-md border border-stone-200 px-3 py-2 text-sm text-stone-700 transition-colors hover:border-azure hover:text-azure dark:border-ink-wire dark:text-sand dark:hover:border-azure dark:hover:text-sky"
              >
                {t("writeEmail")}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
