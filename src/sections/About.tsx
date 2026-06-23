"use client";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/i18n/language";

export function About() {
  const { copy } = useLanguage();
  const aboutCopy = copy.about;

  return (
    <section id="about" className="pt-[72px] pb-10 sm:py-24">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeader
            label={aboutCopy.label}
            title={aboutCopy.title}
            body={aboutCopy.body}
          />
        </Reveal>
      </Container>
    </section>
  );
}
