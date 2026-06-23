"use client";

import type { MouseEvent } from "react";

import { useLanguage } from "@/i18n/language";

const publishedOn = [
  { copyKey: "published", slug: "published" },
  { copyKey: "creator", slug: "creator" },
  { copyKey: "food", slug: "food" },
  { copyKey: "portraits", slug: "portraits" },
  { copyKey: "ai", slug: "ai" },
  { copyKey: "personal", slug: "personal" },
] as const;

export function PublishedOnStrip() {
  const { copy } = useLanguage();

  const handleFilterClick = (
    event: MouseEvent<HTMLAnchorElement>,
    slug: string,
  ) => {
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent("sn-work-filter", {
        detail: slug,
      }),
    );
    document.getElementById("work")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#work-filter-${slug}`);
  };

  return (
    <section className="relative z-10 px-0 py-6 sm:py-10">
      <div className="mx-auto max-w-[1500px] border-y border-white/8 bg-[#05070a]/34 py-3 backdrop-blur-sm">
        <div className="studio-rail overflow-x-auto py-1">
        <div className="studio-rail-track flex min-w-max items-center justify-center gap-3 px-4 sm:min-w-0">
          {publishedOn.map((item, index) => (
            <div
              key={`${item.slug}-${index}`}
              className="flex shrink-0 items-center gap-3"
            >
              <a
                href={`#work-filter-${item.slug}`}
                onClick={(event) => handleFilterClick(event, item.slug)}
                className="group inline-flex items-center rounded-full border border-white/10 bg-white/[0.025] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.13em] text-white/72 shadow-[0_14px_48px_rgba(0,0,0,0.18)] backdrop-blur transition-[transform,border-color,background-color,color] duration-300 hover:-translate-y-0.5 hover:border-[#5df7ff]/55 hover:bg-[#5df7ff]/10 hover:text-white sm:px-5"
              >
                <span className="leading-none tracking-[-0.01em]">
                  {copy.rail[item.copyKey]}
                </span>
              </a>
              {index < publishedOn.length - 1 ? (
                <span className="train-connector relative h-px w-10 rounded-full sm:w-14" />
              ) : null}
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
