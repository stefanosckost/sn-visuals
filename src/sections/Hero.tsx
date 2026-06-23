"use client";

import { HeroCarousel } from "@/components/HeroCarousel";
import type { PortfolioProject } from "@/data/portfolio-data";
import { useLanguage } from "@/i18n/language";

export function Hero({ projects }: { projects: PortfolioProject[] }) {
  const { copy } = useLanguage();
  const heroCopy = copy.hero;

  return (
    <section
      id="top"
      className="hero-lab relative overflow-hidden px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-28 lg:min-h-[92svh] lg:px-10"
    >
      <div className="relative z-10 mx-auto grid max-w-[1440px] items-start gap-7 lg:min-h-[calc(92svh-7rem)] lg:grid-cols-[0.64fr_1.36fr] lg:items-center lg:gap-8">
        <div className="hero-copy-layer min-w-0 max-w-[560px]">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5df7ff]">
            {heroCopy.eyebrow}
          </p>
          <h1 className="max-w-[470px] text-balance text-4xl font-semibold leading-[0.92] text-white drop-shadow-[0_18px_54px_rgba(0,0,0,0.72)] sm:text-6xl lg:text-6xl">
            {heroCopy.headline}
          </h1>
          <p className="mt-4 max-w-[430px] text-sm leading-6 text-[#f4f1ea]/82 drop-shadow-[0_12px_34px_rgba(0,0,0,0.72)] sm:mt-5 sm:text-lg sm:leading-7">
            {heroCopy.subheadline}
          </p>

          <div className="mt-6 flex w-full max-w-[400px] gap-3 sm:mt-8">
            <a
              href="#contact"
              className="lab-button inline-flex min-w-0 flex-1 justify-center bg-white px-4 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#5df7ff] sm:px-5"
            >
              {heroCopy.startProject}
            </a>
            <a
              href="#work"
              className="lab-button inline-flex min-w-0 flex-1 justify-center border border-white/18 bg-black/30 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-[#ff4fb7] hover:text-[#ff4fb7] sm:px-5"
            >
              {heroCopy.viewWork}
            </a>
          </div>
        </div>

        {projects.length > 0 ? (
          <HeroCarousel projects={projects} />
        ) : (
          <div className="grid min-h-[360px] place-items-center rounded-[36px] border border-dashed border-[#5df7ff]/24 bg-[#030507]/82 p-8 text-center shadow-[0_44px_140px_rgba(0,0,0,0.72)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5df7ff]">
                {heroCopy.emptyTitle}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#f4f1ea]/62">
                {heroCopy.emptyBody}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
