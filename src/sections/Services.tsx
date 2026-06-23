"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/i18n/language";

export function Services() {
  const { copy } = useLanguage();
  const servicesCopy = copy.services;

  return (
    <section id="services" className="pt-[72px] pb-10 sm:py-20">
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeader
            label={servicesCopy.label}
            title={servicesCopy.title}
            body={servicesCopy.body}
          />
          <p className="max-w-xl text-sm leading-6 text-[#f4f1ea]/58 lg:justify-self-end">
            {servicesCopy.support}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {servicesCopy.items.map((service, index) => (
            <Reveal key={service.title} delay={index * 80}>
              <article className="lab-panel group relative h-full overflow-hidden border border-white/10 bg-[#0b0b0d]/82 p-5 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-1 hover:border-[#46f0e5]/50 hover:bg-[#101014]">
                <p className="text-sm font-semibold text-[#46f0e5]">
                  0{index + 1}
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#f4f1ea]/62">
                  {service.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
