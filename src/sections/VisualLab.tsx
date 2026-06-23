"use client";

import Image from "next/image";
import { useState } from "react";

import { Container } from "@/components/Container";
import { PortfolioDetailModal } from "@/components/PortfolioDetailModal";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import type { PortfolioProject } from "@/data/portfolio-data";
import { getLocalizedProject, useLanguage } from "@/i18n/language";

export function VisualLab({ projects }: { projects: PortfolioProject[] }) {
  const { copy, language } = useLanguage();
  const visualLabCopy = copy.visualLab;
  const featured = projects.slice(0, 10);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  return (
    <section className="pt-[72px] pb-10 sm:py-20">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <SectionHeader
            label={visualLabCopy.label}
            title={visualLabCopy.title}
            body={visualLabCopy.body}
          />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {visualLabCopy.lanes.map((lane) => (
              <p
                key={lane}
                className="rounded-[22px] border border-white/10 bg-white/[0.025] px-3 py-3 text-[10px] uppercase tracking-[0.14em] text-[#f4f1ea]/58"
              >
                {lane}
              </p>
            ))}
          </div>
        </Reveal>

        {featured.length > 0 ? (
          <div className="mt-10 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4 lg:auto-rows-[240px]">
            {featured.map((project, index) => {
              const localizedProject = getLocalizedProject(project, language);

              return (
              <Reveal
                key={project.id}
                delay={(index % 4) * 70}
                className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#05070a] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-[#5df7ff]/35 ${
                  index === 0 || index === 5
                    ? "col-span-2 row-span-2"
                    : "col-span-1 row-span-1"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group/lab relative block h-full w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fb7]/70"
                  aria-label={`${visualLabCopy.open} ${project.title}`}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} ${copy.hero.visualWork}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition duration-700 group-hover/lab:scale-[1.03] group-hover/lab:contrast-[1.06] group-hover/lab:saturate-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/12 to-transparent opacity-84" />
                  <div className="absolute inset-x-3 bottom-3 translate-y-1 transition duration-300 group-hover/lab:translate-y-0">
                    <p className="inline-flex rounded-full border border-[#5df7ff]/20 bg-black/42 px-2 py-1 text-[10px] uppercase tracking-[0.13em] text-[#5df7ff] backdrop-blur">
                      {localizedProject.category}
                    </p>
                    <h3 className="mt-2 text-sm font-semibold text-white sm:text-base">
                      {project.title}
                    </h3>
                  </div>
                </button>
              </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-[34px] border border-dashed border-white/14 bg-white/[0.025] p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5df7ff]">
              {visualLabCopy.emptyTitle}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#f4f1ea]/58">
              {visualLabCopy.emptyBody}
            </p>
          </div>
        )}
      </Container>
      <PortfolioDetailModal
        project={selectedProject}
        projects={featured}
        onSelect={setSelectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
