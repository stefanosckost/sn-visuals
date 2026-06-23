"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/i18n/language";

export function Process() {
  const { copy } = useLanguage();
  const processCopy = copy.process;
  const processSteps = processCopy.steps;

  return (
    <section id="process" className="pt-[72px] pb-10 sm:py-20">
      <Container>
        <Reveal>
        <SectionHeader
          label={processCopy.label}
          title={processCopy.title}
          body={processCopy.body}
        />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 80}
            >
              <details className="lab-panel group relative border border-white/10 bg-[#0b0b0d] p-5 transition duration-300 open:border-[#46f0e5]/60 open:bg-[#101014] hover:-translate-y-1 hover:border-[#46f0e5]/60">
                {index < processSteps.length - 1 ? (
                  <span className="absolute right-[-18px] top-8 z-10 hidden h-px w-9 bg-[#46f0e5]/45 lg:block" />
                ) : null}
                <summary className="cursor-pointer list-none">
                  <p className="text-sm font-semibold text-[#46f0e5]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#f4f1ea]/62">
                    {step.body}
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-[0.14em] text-[#f4f1ea]/35">
                    {processCopy.more}
                  </p>
                </summary>
                <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-[#f4f1ea]/74">
                  {step.detail}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal delay={220}>
          <p className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.035] px-5 py-4 text-sm leading-6 text-[#f4f1ea]/64">
            {processCopy.payment}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
