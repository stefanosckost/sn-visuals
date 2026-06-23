"use client";

import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/Container";
import { PortfolioCard } from "@/components/PortfolioCard";
import { PortfolioDetailModal } from "@/components/PortfolioDetailModal";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import type { PortfolioProject } from "@/data/portfolio-data";
import { useLanguage } from "@/i18n/language";

const workFilters = [
  { id: "work-filter-all", slug: "all" },
  { id: "work-filter-published", slug: "published" },
  {
    id: "work-filter-creator",
    slug: "creator",
  },
  { id: "work-filter-food", slug: "food" },
  { id: "work-filter-portraits", slug: "portraits" },
  { id: "work-filter-ai", slug: "ai" },
  {
    id: "work-filter-personal",
    slug: "personal",
  },
] as const;

const balancedAllOrder = [
  "formula-one-food-challenge",
  "arepas-leo-2",
  "cesar-portrait",
  "golden-glow-study",
  "howard-creator-thumbnail",
  "fefe-portrait",
  "luna-portrait",
  "stefano-portrait",
  "saffron-butter-steak",
  "dr-pepper-steak",
  "japan-food-experience",
  "royal-jelly-steak",
  "maple-syrup-dry-age",
  "sesame-oil-steak",
];

const explicitFilterOrders: Record<string, string[]> = {
  published: [
    "formula-one-food-challenge",
    "saffron-butter-steak",
    "dr-pepper-steak",
    "japan-food-experience",
    "sesame-oil-steak",
    "royal-jelly-steak",
    "maple-syrup-dry-age",
    "arepas-leo-2",
    "howard-creator-thumbnail",
  ],
  creator: [
    "howard-creator-thumbnail",
    "arepas-leo-2",
    "formula-one-food-challenge",
    "japan-food-experience",
    "dr-pepper-steak",
  ],
  food: [
    "formula-one-food-challenge",
    "saffron-butter-steak",
    "dr-pepper-steak",
    "japan-food-experience",
    "sesame-oil-steak",
    "royal-jelly-steak",
    "maple-syrup-dry-age",
    "arepas-leo-2",
    "howard-creator-thumbnail",
  ],
  portraits: [
    "luna-portrait",
    "cesar-portrait",
    "stefano-portrait",
    "fefe-portrait",
  ],
  ai: [
    "luna-portrait",
    "cesar-portrait",
    "stefano-portrait",
    "golden-glow-study",
    "fefe-portrait",
  ],
  personal: [
    "luna-portrait",
    "cesar-portrait",
    "stefano-portrait",
    "golden-glow-study",
    "fefe-portrait",
  ],
};

function sortByProjectIds(projects: PortfolioProject[], projectIds: string[]) {
  const ranked = new Map(projectIds.map((projectId, index) => [projectId, index]));

  return [...projects].sort((a, b) => {
    const aRank = ranked.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const bRank = ranked.get(b.id) ?? Number.MAX_SAFE_INTEGER;

    if (aRank !== bRank) {
      return aRank - bRank;
    }

    return a.title.localeCompare(b.title);
  });
}

function matchesFilter(project: PortfolioProject, filter: string) {
  const explicitFilterOrder = explicitFilterOrders[filter];

  if (explicitFilterOrder) {
    return explicitFilterOrder.includes(project.id);
  }

  const text = [
    project.title,
    project.client,
    project.category,
    ...project.tags,
  ]
    .join(" ")
    .toLowerCase();

  if (filter === "published") {
    return (
      text.includes("thumbnail") ||
      text.includes("published") ||
      text.includes("views")
    );
  }

  if (filter === "creator") {
    return (
      text.includes("creator packaging") ||
      text.includes("thumbnail") ||
      text.includes("howard")
    );
  }

  if (filter === "portraits") {
    return text.includes("portrait");
  }

  if (filter === "ai") {
    return text.includes("ai") || text.includes("composite");
  }

  if (filter === "food") {
    return text.includes("food");
  }

  if (filter === "personal") {
    return text.includes("personal") || text.includes("stefano");
  }

  return true;
}

function getVisibleProjects(
  projects: PortfolioProject[],
  balancedProjects: PortfolioProject[],
  filter: string,
) {
  const explicitFilterOrder = explicitFilterOrders[filter];

  if (filter === "all") {
    return balancedProjects;
  }

  if (explicitFilterOrder) {
    return sortByProjectIds(
      projects.filter((project) => explicitFilterOrder.includes(project.id)),
      explicitFilterOrder,
    );
  }

  return balancedProjects.filter((project) => matchesFilter(project, filter));
}

export function SelectedWork({ projects }: { projects: PortfolioProject[] }) {
  const { copy } = useLanguage();
  const selectedWorkCopy = copy.selectedWork;
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const balancedProjects = useMemo(() => {
    const ranked = new Map(
      balancedAllOrder.map((projectId, index) => [projectId, index]),
    );

    return [...projects].sort((a, b) => {
      const aRank = ranked.get(a.id) ?? Number.MAX_SAFE_INTEGER;
      const bRank = ranked.get(b.id) ?? Number.MAX_SAFE_INTEGER;

      if (aRank !== bRank) {
        return aRank - bRank;
      }

      return a.title.localeCompare(b.title);
    });
  }, [projects]);
  const availableFilters = useMemo(
    () =>
      workFilters.filter(
        (filter) =>
          filter.slug === "all" ||
          projects.some((project) => matchesFilter(project, filter.slug)),
      ),
    [projects],
  );
  const activeFilterHasProjects =
    activeFilter === "all" ||
    projects.some((project) => matchesFilter(project, activeFilter));
  const safeActiveFilter = activeFilterHasProjects ? activeFilter : "all";
  const visibleProjects = getVisibleProjects(
    projects,
    balancedProjects,
    safeActiveFilter,
  );

  useEffect(() => {
    const applyHashFilter = () => {
      const hashFilter = window.location.hash.replace("#work-filter-", "");

      if (
        hashFilter &&
        hashFilter !== window.location.hash &&
        availableFilters.some((filter) => filter.slug === hashFilter)
      ) {
        setActiveFilter(hashFilter);
      }
    };

    const handleExternalFilter = (event: Event) => {
      const requestedFilter = (event as CustomEvent<string>).detail;

      if (
        requestedFilter &&
        availableFilters.some((filter) => filter.slug === requestedFilter)
      ) {
        setActiveFilter(requestedFilter);
      }
    };

    applyHashFilter();
    window.addEventListener("sn-work-filter", handleExternalFilter);
    window.addEventListener("hashchange", applyHashFilter);

    return () => {
      window.removeEventListener("sn-work-filter", handleExternalFilter);
      window.removeEventListener("hashchange", applyHashFilter);
    };
  }, [availableFilters]);

  return (
    <section
      id="work"
      className="ocean-work section-reveal pt-[72px] pb-10 sm:py-20"
    >
      <Container>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            label={selectedWorkCopy.label}
            title={selectedWorkCopy.title}
            body={selectedWorkCopy.body}
          />
        </Reveal>

        <div className="work-filters mt-8 flex gap-2.5 overflow-x-auto px-1 py-1">
          {availableFilters.map((filter) => {
            return (
              <button
                type="button"
                id={filter.id}
                key={filter.id}
                onClick={() => setActiveFilter(filter.slug)}
                aria-pressed={safeActiveFilter === filter.slug}
                className={`inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center overflow-visible whitespace-nowrap rounded-full border px-4 py-3 text-sm font-semibold leading-[1.2] shadow-[0_10px_34px_rgba(0,0,0,0.18)] backdrop-blur transition hover:-translate-y-0.5 ${
                  safeActiveFilter === filter.slug
                    ? "border-[#5df7ff]/70 bg-[#5df7ff] text-black"
                    : "border-white/10 bg-white/[0.035] text-[#f4f1ea]/68 hover:border-[#5df7ff]/60 hover:bg-[#5df7ff]/8 hover:text-white"
                }`}
              >
                {selectedWorkCopy.filters[filter.slug]}
              </button>
            );
          })}
        </div>

        {visibleProjects.length > 0 ? (
          <div
            className="work-grid mt-10 grid grid-cols-1 auto-rows-auto gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 xl:grid-cols-6"
          >
            {visibleProjects.map((project, index) => {
              const cardSpan =
                safeActiveFilter === "all" && index < 2
                  ? "xl:col-span-3"
                  : "xl:col-span-2";

              return (
              <Reveal
                key={project.image}
                delay={(index % 3) * 90}
                className={cardSpan}
              >
                <PortfolioCard
                  project={project}
                  priority={index < 2}
                  onOpen={setSelectedProject}
                />
              </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 rounded-[34px] border border-dashed border-[#5df7ff]/24 bg-white/[0.025] p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#5df7ff]">
              {selectedWorkCopy.emptyTitle}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#f4f1ea]/58">
              {selectedWorkCopy.emptyBody}
            </p>
          </div>
        )}
      </Container>
      <PortfolioDetailModal
        project={selectedProject}
        projects={visibleProjects}
        onSelect={setSelectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
