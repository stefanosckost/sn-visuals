"use client";

import Image from "next/image";
import type { CSSProperties, MouseEvent, PointerEvent, TouchEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { PortfolioDetailModal } from "@/components/PortfolioDetailModal";
import type { PortfolioProject } from "@/data/portfolio-data";
import { getLocalizedProject, useLanguage } from "@/i18n/language";
import { getProjectDisplaySource } from "@/utils/project-display";

type HeroCarouselProps = {
  projects: PortfolioProject[];
};

const slideDuration = 5600;
const swipeThreshold = 44;

const heroOrder = [
  "luna-portrait",
  "cesar-portrait",
  "stefano-portrait",
  "howard-creator-thumbnail",
  "dr-pepper-steak",
  "formula-one-food-challenge",
  "saffron-butter-steak",
];

const heroObjectPositions: Record<string, string> = {
  "cesar-portrait": "50% 32%",
  "dr-pepper-steak": "50% 50%",
  "formula-one-food-challenge": "68% 45%",
  "howard-creator-thumbnail": "50% 50%",
  "luna-portrait": "50% 34%",
  "saffron-butter-steak": "50% 50%",
  "stefano-portrait": "50% 34%",
};

const portraitProjectIds = new Set([
  "cesar-portrait",
  "luna-portrait",
  "stefano-portrait",
]);

function hasPortraitTreatment(project: PortfolioProject) {
  const portraitSignals = [project.id, project.category, ...project.tags]
    .join(" ")
    .toLowerCase();

  return portraitProjectIds.has(project.id) || portraitSignals.includes("portrait");
}

function sortHeroProjects(projects: PortfolioProject[]) {
  const ranked = new Map(heroOrder.map((projectId, index) => [projectId, index]));

  return [...projects]
    .sort((a, b) => {
      const aRank = ranked.get(a.id) ?? Number.MAX_SAFE_INTEGER;
      const bRank = ranked.get(b.id) ?? Number.MAX_SAFE_INTEGER;

      if (aRank !== bRank) {
        return aRank - bRank;
      }

      return a.title.localeCompare(b.title);
    })
    .slice(0, 7);
}

function getObjectPosition(project: PortfolioProject) {
  return (
    heroObjectPositions[project.id] ??
    (hasPortraitTreatment(project) ? "50% 34%" : "50% 50%")
  );
}

export function HeroCarousel({ projects }: HeroCarouselProps) {
  const { copy, language } = useLanguage();
  const heroCopy = copy.hero;
  const stageRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const swipeWasDetectedRef = useRef(false);
  const lastSwipeAtRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [selectedProject, setSelectedProject] =
    useState<PortfolioProject | null>(null);

  const heroProjects = useMemo(() => sortHeroProjects(projects), [projects]);
  const safeActiveIndex = heroProjects[activeIndex] ? activeIndex : 0;
  const activeProject = heroProjects[safeActiveIndex] ?? heroProjects[0];
  const localizedActiveProject = activeProject
    ? getLocalizedProject(activeProject, language)
    : null;
  const fragmentProjects = heroProjects.length
    ? [
        heroProjects[(safeActiveIndex + 1) % heroProjects.length],
        heroProjects[(safeActiveIndex + 3) % heroProjects.length],
        heroProjects[(safeActiveIndex + 5) % heroProjects.length],
      ].filter(Boolean)
    : [];

  const goToSlide = useCallback((nextIndex: number) => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === nextIndex) {
        return currentIndex;
      }

      return nextIndex;
    });
    setProgressKey((key) => key + 1);
  }, []);

  const goToRelativeSlide = useCallback(
    (direction: 1 | -1) => {
      if (heroProjects.length < 2) {
        return;
      }

      goToSlide(
        (safeActiveIndex + direction + heroProjects.length) %
          heroProjects.length,
      );
    },
    [goToSlide, heroProjects.length, safeActiveIndex],
  );

  useEffect(() => {
    if (typeof window === "undefined" || heroProjects.length === 0) {
      return;
    }

    let cancelled = false;
    const fallbackTimer = window.setTimeout(() => {
      if (!cancelled) {
        setIsPreloaded(true);
      }
    }, 1600);

    const preloadImages = heroProjects.map(
      (project) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();

          image.decoding = "async";
          image.onload = () => {
            if ("decode" in image) {
              void image
                .decode()
                .then(() => resolve())
                .catch(() => resolve());
              return;
            }

            resolve();
          };
          image.onerror = () => resolve();
          image.src = project.image;
        }),
    );

    void Promise.all(preloadImages).then(() => {
      if (!cancelled) {
        window.clearTimeout(fallbackTimer);
        setIsPreloaded(true);
        setProgressKey((key) => key + 1);
      }
    });

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimer);
    };
  }, [heroProjects]);

  useEffect(() => {
    if (heroProjects.length < 2 || !isPreloaded) {
      return;
    }

    const timeout = window.setTimeout(() => {
      goToSlide((safeActiveIndex + 1) % heroProjects.length);
    }, slideDuration);

    return () => window.clearTimeout(timeout);
  }, [
    goToSlide,
    heroProjects.length,
    isPreloaded,
    safeActiveIndex,
  ]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!stageRef.current) {
      return;
    }

    const rect = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    stageRef.current.style.setProperty("--hero-parallax-x", `${x * 10}px`);
    stageRef.current.style.setProperty("--hero-parallax-y", `${y * 8}px`);
    stageRef.current.style.setProperty("--hero-main-x", `${x * 8}px`);
    stageRef.current.style.setProperty("--hero-main-y", `${y * 6}px`);
    stageRef.current.style.setProperty("--hero-fragment-x", `${x * -10}px`);
    stageRef.current.style.setProperty("--hero-fragment-y", `${y * -8}px`);
  };

  const handlePointerLeave = () => {
    stageRef.current?.style.setProperty("--hero-parallax-x", "0px");
    stageRef.current?.style.setProperty("--hero-parallax-y", "0px");
    stageRef.current?.style.setProperty("--hero-main-x", "0px");
    stageRef.current?.style.setProperty("--hero-main-y", "0px");
    stageRef.current?.style.setProperty("--hero-fragment-x", "0px");
    stageRef.current?.style.setProperty("--hero-fragment-y", "0px");
  };

  const handleHeroTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    swipeWasDetectedRef.current = false;
  };

  const triggerHeroSwipe = (
    deltaX: number,
    deltaY: number,
    preventDefault?: () => void,
  ) => {
    const isHorizontalSwipe =
      Math.abs(deltaX) >= swipeThreshold &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.12;

    if (!isHorizontalSwipe || Date.now() - lastSwipeAtRef.current < 320) {
      return false;
    }

    lastSwipeAtRef.current = Date.now();
    swipeWasDetectedRef.current = true;
    preventDefault?.();
    goToRelativeSlide(deltaX < 0 ? 1 : -1);

    window.setTimeout(() => {
      swipeWasDetectedRef.current = false;
    }, 360);

    return true;
  };

  const handleHeroTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    const start = touchStartRef.current;

    if (!touch || !start) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (
      Math.abs(deltaX) > 14 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.15
    ) {
      swipeWasDetectedRef.current = true;
      event.preventDefault();
    }
  };

  const handleHeroTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    const start = touchStartRef.current;

    touchStartRef.current = null;

    if (!touch || !start) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    triggerHeroSwipe(deltaX, deltaY, () => event.preventDefault());
  };

  const handleHeroPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    swipeWasDetectedRef.current = false;
  };

  const handleHeroPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;

    if (!start || (event.pointerType === "mouse" && event.buttons !== 1)) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (
      Math.abs(deltaX) > 14 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.15
    ) {
      swipeWasDetectedRef.current = true;
      event.preventDefault();
    }
  };

  const handleHeroPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;

    pointerStartRef.current = null;

    if (!start) {
      return;
    }

    triggerHeroSwipe(
      event.clientX - start.x,
      event.clientY - start.y,
      () => event.preventDefault(),
    );
  };

  const handleHeroOpen = (event: MouseEvent<HTMLButtonElement>) => {
    if (swipeWasDetectedRef.current) {
      event.preventDefault();
      return;
    }

    setSelectedProject(activeProject);
  };

  if (!activeProject) {
    return null;
  }

  return (
    <>
      <div
        ref={stageRef}
        className="hero-wall hero-world relative w-full"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="pointer-events-none absolute inset-[-10%] rounded-[44px] bg-[radial-gradient(ellipse_at_52%_38%,rgba(93,247,255,0.2),transparent_35%),radial-gradient(ellipse_at_72%_66%,rgba(255,79,183,0.12),transparent_34%),radial-gradient(ellipse_at_32%_76%,rgba(255,153,102,0.08),transparent_30%),radial-gradient(ellipse_at_34%_24%,rgba(142,124,255,0.12),transparent_34%)] blur-md sm:inset-[-14%] sm:blur-xl" />

        {fragmentProjects.map((project, index) => {
          const placement = [
            "right-[-9%] top-[4%] h-[30%] w-[42%] rotate-[6deg]",
            "bottom-[10%] left-[-10%] h-[32%] w-[38%] rotate-[-7deg]",
            "left-[18%] top-[-7%] h-[22%] w-[30%] rotate-[3deg]",
          ][index];

          return (
            <div
              key={`${project.id}-fragment-${index}`}
              className={`hero-fragment-card pointer-events-none absolute ${placement} hidden overflow-hidden rounded-[34px] border border-white/10 bg-black/30 shadow-[0_28px_90px_rgba(0,0,0,0.45)] md:block`}
              style={{ animationDelay: `${index * -3.5}s` }}
              aria-hidden="true"
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 24vw, 34vw"
                className="object-cover"
                style={{ objectPosition: getObjectPosition(project) }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,5,7,0.52)_78%),linear-gradient(180deg,rgba(3,5,7,0.05),rgba(3,5,7,0.42))]" />
            </div>
          );
        })}

        <div
          className="hero-main-stage group relative z-10 block h-[min(105vw,420px)] min-h-0 w-full overflow-hidden rounded-[30px] border border-white/10 bg-[#05070a] text-left shadow-[0_32px_110px_rgba(0,0,0,0.62),0_0_52px_rgba(93,247,255,0.1)] transition-[border-color,box-shadow] duration-500 hover:border-[#5df7ff]/36 hover:shadow-[0_42px_140px_rgba(0,0,0,0.7),0_0_74px_rgba(93,247,255,0.15)] sm:aspect-[16/10] sm:h-auto sm:min-h-[430px] sm:rounded-[36px] lg:aspect-auto lg:h-[min(78vh,800px)] lg:min-h-[590px]"
          onPointerDown={handleHeroPointerDown}
          onPointerMove={handleHeroPointerMove}
          onPointerUp={handleHeroPointerUp}
          onPointerCancel={() => {
            pointerStartRef.current = null;
          }}
          onTouchStart={handleHeroTouchStart}
          onTouchMove={handleHeroTouchMove}
          onTouchEnd={handleHeroTouchEnd}
          onTouchCancel={() => {
            touchStartRef.current = null;
            window.setTimeout(() => {
              swipeWasDetectedRef.current = false;
            }, 120);
          }}
        >
          <div className="absolute inset-0 bg-[#030507]" />
          {heroProjects.map((project, index) => {
            const active = index === safeActiveIndex;
            const portrait = hasPortraitTreatment(project);

            return (
              <div
                key={project.id}
                aria-hidden={!active}
                data-active={active ? "true" : "false"}
                className={`hero-slide-layer absolute inset-0 transition-opacity duration-1000 ease-out ${
                  active
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                {portrait ? (
                  <>
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 58vw, 96vw"
                      className="hero-active-image scale-[1.1] object-cover brightness-[0.52] saturate-[1.16] blur-md"
                      style={{ objectPosition: getObjectPosition(project) }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_58%_44%,rgba(93,247,255,0.14),transparent_34%),radial-gradient(ellipse_at_72%_70%,rgba(255,79,183,0.11),transparent_32%)]" />
                    <Image
                      src={project.image}
                      alt={`${project.title} ${heroCopy.visualWork}`}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 58vw, 96vw"
                      className="hero-active-image object-contain p-3 brightness-[1.1] contrast-[1.08] drop-shadow-[0_26px_70px_rgba(0,0,0,0.6)] transition duration-700 group-hover:scale-[1.01] sm:p-5 lg:p-7"
                      style={{ objectPosition: getObjectPosition(project) }}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 58vw, 96vw"
                      className="hero-active-image scale-[1.08] object-cover brightness-[0.5] saturate-[1.14] blur-md"
                      style={{ objectPosition: getObjectPosition(project) }}
                    />
                    <Image
                      src={project.image}
                      alt={`${project.title} ${heroCopy.visualWork}`}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 58vw, 96vw"
                      className="hero-active-image object-contain brightness-[1.08] contrast-[1.06] drop-shadow-[0_24px_68px_rgba(0,0,0,0.48)] transition duration-700 group-hover:scale-[1.01]"
                      style={{ objectPosition: getObjectPosition(project) }}
                    />
                  </>
                )}
              </div>
            );
          })}

          <div className="hero-refraction pointer-events-none absolute inset-0" />
          <div className="hero-shimmer pointer-events-none absolute inset-0" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,3,5,0.06)_0%,transparent_36%,rgba(1,3,5,0.58)_100%),radial-gradient(ellipse_at_12%_18%,rgba(0,0,0,0.22),transparent_34%)]" />

          <button
            type="button"
            onClick={handleHeroOpen}
            className="absolute inset-0 z-20 cursor-pointer"
            aria-label={`${heroCopy.openProject} ${activeProject.title}`}
          >
            <span className="sr-only">
              {heroCopy.openProject} {activeProject.title}
            </span>
          </button>

          <div className="absolute right-2 top-2 z-30 flex items-center gap-0.5 rounded-full border border-white/10 bg-black/34 p-1 backdrop-blur-md sm:right-5 sm:top-5 sm:gap-1">
            {heroProjects.map((project, index) => (
              <button
                key={`hero-control-${project.id}`}
                type="button"
                onClick={() => goToSlide(index)}
                className="grid h-8 w-8 place-items-center rounded-full"
                aria-label={`${heroCopy.showProject} ${project.title}`}
                aria-pressed={index === safeActiveIndex}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border transition ${
                  index === safeActiveIndex
                    ? "border-[#5df7ff] bg-[#5df7ff] shadow-[0_0_16px_rgba(93,247,255,0.55)]"
                    : "border-white/25 bg-white/18 hover:border-[#ff4fb7]/70 hover:bg-[#ff4fb7]/60"
                }`}
                />
              </button>
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-30 flex flex-wrap items-center justify-between gap-2 rounded-[22px] border border-white/10 bg-black/34 px-3 py-2.5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.42)] backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:gap-3 sm:rounded-[24px] sm:px-4 sm:py-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5df7ff]">
                {getProjectDisplaySource(activeProject, language)}
              </p>
              <p className="mt-1 text-sm font-semibold leading-tight sm:text-lg">
                {activeProject.title}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.13em] text-white/48">
                {localizedActiveProject?.category}
              </p>
            </div>
            {localizedActiveProject?.views ? (
              <span className="rounded-full border border-[#ff4fb7]/24 bg-[#ff4fb7]/10 px-2.5 py-1 text-xs font-semibold text-[#ffd6ec]">
                {localizedActiveProject.views}
              </span>
            ) : null}
          </div>

          <div className="hero-progress-track absolute inset-x-0 bottom-0 z-30 h-[3px] overflow-hidden bg-white/8">
            <span
              key={`hero-progress-${safeActiveIndex}-${progressKey}`}
              className="hero-progress-fill block h-full"
              style={{
                "--hero-progress-duration": `${slideDuration}ms`,
                animationDuration: `${slideDuration}ms`,
                animationPlayState: !isPreloaded ? "paused" : "running",
              } as CSSProperties}
            />
          </div>
        </div>
      </div>

      <PortfolioDetailModal
        project={selectedProject}
        projects={heroProjects}
        onSelect={setSelectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
