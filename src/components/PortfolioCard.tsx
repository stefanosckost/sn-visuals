"use client";

import Image from "next/image";

import type { PortfolioProject } from "@/data/portfolio-data";
import { getLocalizedProject, useLanguage } from "@/i18n/language";
import {
  getProjectDisplaySource,
  getProjectDisplayTags,
} from "@/utils/project-display";

type PortfolioCardProps = {
  project: PortfolioProject;
  priority?: boolean;
  onOpen?: (project: PortfolioProject) => void;
};

const cardObjectPositions: Record<string, string> = {
  "cesar-portrait": "50% 34%",
  "fefe-portrait": "50% 34%",
  "luna-portrait": "50% 34%",
  "stefano-portrait": "50% 30%",
};

export function PortfolioCard({
  project,
  priority = false,
  onOpen,
}: PortfolioCardProps) {
  const { copy, language } = useLanguage();
  const cardCopy = copy.card;
  const localizedProject = getLocalizedProject(project, language);
  const displayTags = getProjectDisplayTags(project, 2, language);
  const displaySource = getProjectDisplaySource(project, language);
  const cardObjectPosition =
    cardObjectPositions[project.id] ??
    (project.tags.some((tag) => tag.toLowerCase().includes("portrait"))
      ? "50% 34%"
      : "50% 50%");

  return (
    <button
      type="button"
      onClick={() => onOpen?.(project)}
      data-project-id={project.id}
      className="lab-panel work-card group block h-full w-full cursor-pointer overflow-hidden rounded-[36px] border border-white/10 bg-[#09090b]/92 p-2 text-left duration-300 ease-out hover:border-[#5df7ff]/75 hover:bg-[#101014] active:scale-[0.99] focus:outline-none focus-visible:border-[#ff4fa3] focus-visible:shadow-[0_0_0_4px_rgba(255,79,183,0.18)]"
      aria-label={`${cardCopy.openDetails} ${project.title}`}
    >
      <div className="relative z-10 aspect-[16/10] overflow-hidden rounded-[30px] bg-[#111114]">
        <Image
          src={project.image}
          alt={`${project.title} ${copy.hero.visualWork}`}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 31vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03] group-hover:contrast-[1.06] group-hover:saturate-[1.1]"
          style={{ objectPosition: cardObjectPosition }}
        />
        {project.beforeImage && project.afterImage ? (
          <p className="absolute left-3 top-3 z-10 rounded-full border border-[#ff4fb7]/28 bg-black/58 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/82 backdrop-blur">
            {cardCopy.beforeAfter}
          </p>
        ) : null}
        <div className="absolute inset-x-3 bottom-3 translate-y-2 rounded-[22px] border border-white/10 bg-black/62 p-3 opacity-0 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#46f0e5]">
              {cardCopy.viewProject}
            </p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-white/48">
              {localizedProject.category}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4 sm:p-5">
        <div>
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            {project.title}
          </h3>
          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#f4f1ea]/48 sm:text-xs">
            {displaySource} / {localizedProject.category}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {localizedProject.views ? (
              <span className="rounded-full border border-[#5df7ff]/18 bg-[#5df7ff]/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f4f1ea]/82">
                {localizedProject.views}
              </span>
            ) : null}
            {displayTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#5df7ff]/18 bg-[#5df7ff]/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f4f1ea]/82"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
