"use client";

import { useEffect, useRef, useState } from "react";

import { LanguageToggle, useLanguage } from "@/i18n/language";

const navItems = [
  { copyKey: "work", href: "#work" },
  { copyKey: "services", href: "#services" },
  { copyKey: "process", href: "#process" },
  { copyKey: "about", href: "#about" },
  { copyKey: "contact", href: "#contact" },
] as const;

export function SiteHeader() {
  const { copy } = useLanguage();
  const [activeSection, setActiveSection] = useState("#top");
  const [hasScrolled, setHasScrolled] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const sectionIds = ["top", "work", "services", "process", "about", "contact"];

    const updateHeaderState = () => {
      setHasScrolled(window.scrollY > 18);

      let currentSection = "top";

      for (let index = sectionIds.length - 1; index >= 0; index -= 1) {
        const id = sectionIds[index];
        const section = document.getElementById(id);

        if (section && section.offsetTop - 140 <= window.scrollY) {
          currentSection = id;
          break;
        }
      }

      setActiveSection(`#${currentSection}`);
    };

    const scheduleHeaderState = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateHeaderState();
      });
    };

    updateHeaderState();
    window.addEventListener("scroll", scheduleHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleHeaderState);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <header
      className="sticky top-2 z-50 mx-auto w-[calc(100%-1rem)] max-w-7xl overflow-visible sm:w-[calc(100%-3rem)] md:top-5 md:h-0"
    >
      <nav
        className={`grid gap-2 rounded-[24px] border px-3 py-2.5 backdrop-blur-md transition-[background-color,border-color,box-shadow] sm:rounded-[34px] sm:px-5 sm:py-3 md:gap-3 ${
        hasScrolled
          ? "border-white/12 bg-[#07080d]/88 shadow-[0_18px_60px_rgba(0,0,0,0.36)]"
          : "border-white/8 bg-[#07080d]/62"
      }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[13px] border border-white/15 bg-white text-xs font-bold text-black sm:h-10 sm:w-10 sm:rounded-[14px] sm:text-sm">
              SN
            </span>
            <span className="grid min-w-0">
              <span className="font-display truncate text-base font-semibold leading-none text-white sm:text-xl">
                S.N. Visuals
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-[#f4f1ea]/68 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                label={copy.nav[item.copyKey]}
                isActive={activeSection === item.href}
              />
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <LanguageToggle />
            <a
              href="#contact"
              className="lab-button shrink-0 rounded-full border border-[#46f0e5]/50 px-2.5 py-2 text-[11px] font-medium text-white transition hover:border-[#46f0e5] hover:bg-[#46f0e5] hover:text-black sm:px-4 sm:text-sm"
            >
              {copy.nav.startProject}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-1 text-[11px] text-[#f4f1ea]/62 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              label={copy.nav[item.copyKey]}
              isActive={activeSection === item.href}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  item,
  label,
  isActive,
}: {
  item: (typeof navItems)[number];
  label: string;
  isActive: boolean;
}) {
  return (
    <a
      href={item.href}
      className={`shrink-0 transition hover:text-white ${
        isActive ? "text-[#46f0e5]" : ""
      }`}
    >
      {label}
    </a>
  );
}
