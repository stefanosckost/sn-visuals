"use client";

import Image from "next/image";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { PortfolioProject } from "@/data/portfolio-data";
import { getLocalizedProject, useLanguage } from "@/i18n/language";
import {
  getProjectDisplayTags,
  getProjectMetaLine,
} from "@/utils/project-display";

type PortfolioDetailModalProps = {
  project: PortfolioProject | null;
  projects: PortfolioProject[];
  onSelect: (project: PortfolioProject) => void;
  onClose: () => void;
};

export function PortfolioDetailModal({
  project,
  projects,
  onSelect,
  onClose,
}: PortfolioDetailModalProps) {
  const { copy, language } = useLanguage();
  const modalCopy = copy.modal;
  const [comparisonMode, setComparisonMode] = useState<"side-by-side" | "slider">(
    "side-by-side",
  );
  const [sliderPosition, setSliderPosition] = useState(52);
  const currentIndex = useMemo(() => {
    if (!project) {
      return -1;
    }

    return projects.findIndex((item) => item.id === project.id);
  }, [project, projects]);

  const canNavigate = projects.length > 1 && currentIndex >= 0;
  const hasBeforeAfter = Boolean(project?.beforeImage && project.afterImage);

  const showPrevious = useCallback(() => {
    if (!canNavigate) {
      return;
    }

    const previousIndex = (currentIndex - 1 + projects.length) % projects.length;
    const previousProject = projects[previousIndex];

    if (previousProject) {
      onSelect(previousProject);
    }
  }, [canNavigate, currentIndex, onSelect, projects]);

  const showNext = useCallback(() => {
    if (!canNavigate) {
      return;
    }

    const nextIndex = (currentIndex + 1) % projects.length;
    const nextProject = projects[nextIndex];

    if (nextProject) {
      onSelect(nextProject);
    }
  }, [canNavigate, currentIndex, onSelect, projects]);

  useEffect(() => {
    if (!project) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, project, showNext, showPrevious]);

  if (!project) {
    return null;
  }

  const localizedProject = getLocalizedProject(project, language);
  const displayTags = getProjectDisplayTags(project, 6, language);

  const modal = (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#010205]/90 p-0 animate-[modal-fade_180ms_ease-out] sm:p-5"
      onPointerDown={onClose}
      role="presentation"
    >
      <div
        className="relative min-h-[100svh] max-h-[100svh] w-full max-w-7xl overflow-hidden rounded-none border border-white/12 bg-[#03060c]/97 shadow-[0_34px_110px_rgba(0,0,0,0.82),0_0_58px_rgba(93,247,255,0.08)] backdrop-blur-sm animate-[modal-scale_220ms_cubic-bezier(0.22,1,0.36,1)] sm:min-h-0 sm:max-h-[94svh] sm:rounded-[44px]"
        onPointerDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-detail-title"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_12%,rgba(93,247,255,0.13),transparent_24rem),radial-gradient(ellipse_at_92%_20%,rgba(255,79,183,0.09),transparent_20rem),radial-gradient(ellipse_at_64%_90%,rgba(142,124,255,0.08),transparent_22rem)]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-[calc(12px+env(safe-area-inset-top))] z-30 grid h-11 w-11 place-items-center rounded-full border border-white/14 bg-black/54 text-2xl leading-none text-white/84 backdrop-blur transition hover:scale-105 hover:border-[#ff4fb7]/70 hover:text-white sm:right-5 sm:top-5 sm:h-10 sm:w-10"
          aria-label={modalCopy.close}
        >
          ×
        </button>

        {canNavigate ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-black/42 text-2xl text-white/82 backdrop-blur transition hover:scale-105 hover:border-[#5df7ff]/65 hover:text-white lg:grid"
              aria-label={modalCopy.previousProject}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/12 bg-black/42 text-2xl text-white/82 backdrop-blur transition hover:scale-105 hover:border-[#ff4fb7]/65 hover:text-white lg:grid"
              aria-label={modalCopy.nextProject}
            >
              ›
            </button>
          </>
        ) : null}

        <div className="relative grid max-h-[100svh] overflow-y-auto sm:max-h-[94svh] lg:grid-cols-[minmax(0,1.9fr)_minmax(320px,0.72fr)]">
          <div className="relative m-0 min-h-[44svh] overflow-hidden rounded-none bg-black sm:m-2 sm:min-h-[520px] sm:rounded-[32px] lg:min-h-[min(76vh,760px)] lg:rounded-[38px]">
            {hasBeforeAfter ? (
              <BeforeAfterStage
                project={project}
                mode={comparisonMode}
                onModeChange={setComparisonMode}
                sliderPosition={sliderPosition}
                onSliderChange={setSliderPosition}
              />
            ) : (
              <>
                <Image
                  key={project.image}
                  src={project.image}
                  alt={`${project.title} ${copy.hero.visualWork}`}
                  fill
                  sizes="(min-width: 1024px) 65vw, 96vw"
                  className="object-contain animate-[modal-image_320ms_cubic-bezier(0.22,1,0.36,1)]"
                  priority
                />
                {localizedProject.views ? (
                  <p className="absolute bottom-4 left-4 rounded-full border border-white/12 bg-black/62 px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#5df7ff] backdrop-blur sm:bottom-5 sm:left-5">
                    {localizedProject.views}
                  </p>
                ) : null}
              </>
            )}
          </div>

          <div className="animate-[modal-copy_320ms_ease-out] p-5 sm:p-7 lg:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5df7ff]">
              {modalCopy.selectedWork}
            </p>
            <h2
              id="portfolio-detail-title"
              className="mt-3 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl"
            >
              {project.title}
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[0.13em] text-[#f4f1ea]/54">
              {getProjectMetaLine(project, language)}
            </p>
            {localizedProject.views ? (
              <p className="mt-3 text-lg font-semibold text-[#ff4fb7]">
                {localizedProject.views}
              </p>
            ) : null}

            <section className="mt-5 rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5df7ff]">
                {modalCopy.story}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#f5f5f5]/82">
                {localizedProject.story}
              </p>
            </section>

            <section className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.025] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff4fb7]">
                {modalCopy.goal}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#f4f1ea]/72">
                {localizedProject.goal}
              </p>
            </section>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f4f1ea]/52">
                {modalCopy.tools}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {localizedProject.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-[#f4f1ea]/74"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {displayTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#46f0e5]/18 bg-[#46f0e5]/8 px-2.5 py-1 text-xs text-[#f5f5f5]/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {canNavigate ? (
              <div className="mt-7 grid grid-cols-2 gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="rounded-full border border-white/12 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#5df7ff]/60"
                >
                  {modalCopy.previous}
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="rounded-full border border-white/12 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#ff4fb7]/60"
                >
                  {modalCopy.next}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

function BeforeAfterStage({
  project,
  mode,
  onModeChange,
  sliderPosition,
  onSliderChange,
}: {
  project: PortfolioProject;
  mode: "side-by-side" | "slider";
  onModeChange: (mode: "side-by-side" | "slider") => void;
  sliderPosition: number;
  onSliderChange: (value: number) => void;
}) {
  const { copy, language } = useLanguage();
  const modalCopy = copy.modal;
  const localizedProject = getLocalizedProject(project, language);
  const beforeImage = project.beforeImage ?? project.image;
  const afterImage = project.afterImage ?? project.image;
  const updateSliderFromClientX = (
    clientX: number,
    element: HTMLDivElement,
  ) => {
    const rect = element.getBoundingClientRect();
    const nextValue = ((clientX - rect.left) / rect.width) * 100;

    onSliderChange(Math.max(8, Math.min(92, Math.round(nextValue))));
  };
  const handleSliderPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    updateSliderFromClientX(event.clientX, event.currentTarget);
  };
  const handleSliderPointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.buttons !== 1) {
      return;
    }

    event.preventDefault();
    updateSliderFromClientX(event.clientX, event.currentTarget);
  };
  const handleSliderTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    event.preventDefault();
    updateSliderFromClientX(touch.clientX, event.currentTarget);
  };
  const handleSliderTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    event.preventDefault();
    updateSliderFromClientX(touch.clientX, event.currentTarget);
  };
  const handleSliderKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSliderChange(Math.max(8, sliderPosition - 4));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      onSliderChange(Math.min(92, sliderPosition + 4));
    }
  };

  return (
    <div className="relative h-full min-h-[inherit] animate-[modal-image_320ms_cubic-bezier(0.22,1,0.36,1)]">
      <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2 sm:left-5 sm:top-5">
        <span className="rounded-full border border-[#5df7ff]/35 bg-black/66 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/86 backdrop-blur">
          {modalCopy.beforeAfter}
        </span>
        <div className="flex overflow-hidden rounded-full border border-white/12 bg-black/54 p-1 backdrop-blur">
          <button
            type="button"
            onClick={() => onModeChange("side-by-side")}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
              mode === "side-by-side"
                ? "bg-[#5df7ff] text-black"
                : "text-white/66 hover:text-white"
            }`}
          >
            {modalCopy.sideBySide}
          </button>
          <button
            type="button"
            onClick={() => onModeChange("slider")}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition ${
              mode === "slider"
                ? "bg-[#ff4fb7] text-black"
                : "text-white/66 hover:text-white"
            }`}
          >
            {modalCopy.slider}
          </button>
        </div>
      </div>

      {localizedProject.views ? (
        <p className="absolute bottom-4 left-4 z-20 rounded-full border border-white/12 bg-black/62 px-3 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#5df7ff] backdrop-blur sm:bottom-5 sm:left-5">
          {localizedProject.views}
        </p>
      ) : null}

      {mode === "slider" ? (
        <div className="block h-full min-h-[inherit]">
          <div className="relative h-full min-h-[inherit] overflow-hidden">
            <Image
              src={afterImage}
              alt={`${project.title} ${modalCopy.finalImage}`}
              fill
              sizes="(min-width: 1024px) 65vw, 96vw"
              className="object-contain"
              priority
              unoptimized
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <Image
                src={beforeImage}
                alt={`${project.title} ${modalCopy.originalImage}`}
                fill
                sizes="(min-width: 1024px) 65vw, 96vw"
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <div
              className="absolute inset-y-0 z-10 w-px bg-white/72 shadow-[0_0_30px_rgba(93,247,255,0.55)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/62 text-xs font-semibold text-white backdrop-blur">
                ↔
              </span>
            </div>
            <span className="absolute left-5 top-20 z-10 rounded-full border border-white/12 bg-black/58 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/76 backdrop-blur">
              {modalCopy.before}
            </span>
            <span className="absolute right-5 top-20 z-10 rounded-full border border-[#ff4fb7]/24 bg-black/58 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/86 backdrop-blur">
              {modalCopy.after}
            </span>
          </div>
          <div
            role="slider"
            tabIndex={0}
            aria-label={modalCopy.adjustComparison}
            aria-valuemin={8}
            aria-valuemax={92}
            aria-valuenow={sliderPosition}
            onPointerDown={handleSliderPointerDown}
            onPointerMove={handleSliderPointerMove}
            onTouchStart={handleSliderTouchStart}
            onTouchMove={handleSliderTouchMove}
            onKeyDown={handleSliderKeyDown}
            className="comparison-range absolute inset-x-6 bottom-5 z-30 h-8 cursor-ew-resize accent-[#5df7ff] sm:inset-x-10 sm:bottom-7"
          />
        </div>
      ) : null}

      <div
        className={`grid h-full min-h-[inherit] overflow-hidden rounded-[30px] bg-[#020407] ${
          mode === "slider" ? "hidden" : "md:grid-cols-2"
        }`}
      >
        <ComparisonImagePanel
          src={beforeImage}
          label={modalCopy.before}
          alt={`${project.title} ${modalCopy.originalImage}`}
          accent="cyan"
        />
        <ComparisonImagePanel
          src={afterImage}
          label={modalCopy.after}
          alt={`${project.title} ${modalCopy.finalImage}`}
          accent="pink"
        />
      </div>
    </div>
  );
}

function ComparisonImagePanel({
  src,
  label,
  alt,
  accent,
}: {
  src: string;
  label: string;
  alt: string;
  accent: "cyan" | "pink";
}) {
  return (
    <div className="relative min-h-[300px] overflow-hidden border-white/10 md:min-h-[inherit] md:border-r">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 34vw, 96vw"
        className="object-contain"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/16" />
      <span
        className={`absolute left-4 top-20 rounded-full border bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/86 backdrop-blur ${
          accent === "cyan" ? "border-[#5df7ff]/30" : "border-[#ff4fb7]/30"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
