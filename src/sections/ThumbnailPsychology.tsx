import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

const psychologyCards = [
  {
    title: "Hook",
    body: "Find the question before the viewer reads the title.",
    detail:
      "Find the curiosity gap before design starts. The thumbnail has to make the viewer ask a question before reading the title.",
    tags: ["Question gap", "Strange premise", "Scroll stop"],
  },
  {
    title: "Subject",
    body: "Make the food, face, or object impossible to miss.",
    detail:
      "Choose the main visual anchor: face, food, object, or transformation. One clear subject beats a crowded idea.",
    tags: ["Food texture", "Scale", "One anchor"],
  },
  {
    title: "Composite",
    body: "Build the frame with Photoshop, AI support, light, and clean cutouts.",
    detail:
      "Build the image with Photoshop, AI support, references, lighting, shadows, scale, and clean cutouts.",
    tags: ["Masks", "Lighting", "Controlled chaos"],
  },
  {
    title: "Feed Test",
    body: "Shrink it down. If it does not read in one second, simplify.",
    detail:
      "Shrink the thumbnail and test if it reads in one second. If it does not read small, simplify the idea.",
    tags: ["Small size", "Instant context", "Export ready"],
  },
  {
    title: "Upload Package",
    body: "Polish contrast, export clean, and prep variations.",
    detail:
      "Polish contrast, export clean, prepare variations, and make the image feel upload-ready before the deadline hits.",
    tags: ["Final polish", "Variations", "Upload-ready"],
  },
];

export function ThumbnailPsychology() {
  return (
    <section className="pt-[72px] pb-10 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader
            label="Visual Lab"
            title="How the click gets engineered."
            body="Small image. Fast decision."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {psychologyCards.map((card, index) => (
            <Reveal
              key={card.title}
              delay={index * 80}
            >
              <details className="lab-panel group relative overflow-hidden border border-white/10 bg-[#0b0b0d] p-5 transition duration-300 open:border-[#ff4fa3]/55 open:bg-[#101014] hover:-translate-y-1 hover:border-[#ff4fa3]/55 hover:bg-[#101014]">
                <summary className="cursor-pointer list-none">
                  <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#ff4fa3] transition duration-500 group-open:scale-x-100 group-hover:scale-x-100" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#46f0e5]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-7 text-2xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#f4f1ea]/66">
                    {card.body}
                  </p>
                  <p className="mt-5 text-xs uppercase tracking-[0.14em] text-[#ff4fa3]/70">
                    More
                  </p>
                </summary>
                <p className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-[#f4f1ea]/74">
                  {card.detail}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-[#f4f1ea]/74"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
