"use client";

import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/i18n/language";

const baseResults = [
  {
    target: 10,
    suffix: "M+",
  },
  {
    target: 80,
    suffix: "+",
  },
  {
    target: 3.3,
    suffix: "M",
  },
  {
    textKey: "text",
  },
];

export function Results() {
  const { copy } = useLanguage();
  const resultsCopy = copy.results;

  return (
    <section id="results" className="pt-[72px] pb-10 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader
            label={resultsCopy.label}
            title={resultsCopy.title}
            body={resultsCopy.body}
          />
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {baseResults.map((result, index) => {
            const resultCopy = resultsCopy.items[index];
            const counterText = "text" in resultCopy ? resultCopy.text : undefined;

            return (
            <Reveal key={resultCopy.label} delay={index * 90}>
              <details className="lab-panel group relative overflow-hidden border border-white/10 bg-[#0b0b0d]/82 p-5 transition-[transform,border-color,background-color] duration-300 open:border-[#46f0e5]/48 open:bg-[#101014] hover:-translate-y-1 hover:scale-[1.01] hover:border-[#46f0e5]/45 hover:bg-[#101014]">
                <summary className="cursor-pointer list-none">
                  <p className="text-5xl font-semibold leading-none text-[#46f0e5] sm:text-6xl">
                    <AnimatedCounter
                      target={"target" in result ? result.target : undefined}
                      suffix={"suffix" in result ? result.suffix : undefined}
                      text={counterText}
                    />
                  </p>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                    {resultCopy.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#f4f1ea]/55">
                    {resultCopy.note}
                  </p>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#f4f1ea]/34">
                    {resultsCopy.more}
                  </p>
                </summary>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-6 text-[#f4f1ea]/72">
                  {resultCopy.detail}
                </p>
                <div className="mt-5 grid grid-cols-5 gap-1">
                  {Array.from({ length: 5 }).map((_, barIndex) => (
                    <span
                      key={barIndex}
                      className="h-1 rounded-full bg-[#46f0e5]/25"
                      style={{ opacity: 0.35 + barIndex * 0.13 }}
                    />
                  ))}
                </div>
              </details>
            </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
