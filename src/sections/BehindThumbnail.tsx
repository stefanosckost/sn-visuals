import Image from "next/image";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

const breakdown = [
  {
    title: "Hook",
    body: "Multi-person food battle with instant competition context.",
  },
  {
    title: "Subject",
    body: "A clear creator anchor, surrounded by recognizable characters and food categories.",
  },
  {
    title: "Readability",
    body: "Big faces, clean grouping, strong symmetry, and clear separation at feed size.",
  },
  {
    title: "Result",
    body: "3.3M views on a published creator-led food video.",
  },
];

export function BehindThumbnail() {
  return (
    <section className="pt-[72px] pb-10 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <Reveal>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#46f0e5]">
                Thumbnail Dissection
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                Behind the thumbnail.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#f4f1ea]/70 sm:text-lg">
                A thumbnail is not just the final image. It is a hook, a
                subject, a readable story, and a decision made before the viewer
                presses play.
              </p>
            </div>

            <div className="lab-panel mt-8 overflow-hidden border border-white/10 bg-[#0b0b0d] transition duration-300 hover:-translate-y-1 hover:border-[#46f0e5]/50">
              <div className="relative aspect-video">
                <Image
                  src="/images/selected-work/formula-one-food-challenge.jpg"
                  alt="Formula One Food Challenge thumbnail breakdown"
                  fill
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  className="object-cover transition duration-700 hover:scale-[1.025]"
                />
                <div className="absolute left-4 top-4 border border-white/12 bg-black/55 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/82 backdrop-blur">
                  Small-screen tested
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-2xl font-semibold text-white">
                    Formula One Food Challenge
                  </p>
                  <p className="mt-1 text-lg font-semibold uppercase tracking-[0.12em] text-[#46f0e5]">
                    3.3M views
                  </p>
                </div>
                <p className="text-sm text-[#f4f1ea]/58">
                  Published creator upload
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3">
            {breakdown.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 90}
                className="border border-white/10 bg-[#0b0b0d] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#ff4fa3]/45 hover:bg-[#101014]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#46f0e5]">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#f4f1ea]/64">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
