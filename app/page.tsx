import { AmbientModeButton } from "@/components/AmbientModeButton";
import { CursorGlow } from "@/components/CursorGlow";
import { OceanBackground } from "@/components/OceanBackground";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getHeroProjects,
  getPortfolioProjects,
  getVisualLabProjects,
} from "@/data/portfolio-data";
import { LanguageProvider } from "@/i18n/language";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Hero } from "@/sections/Hero";
import { PublishedOnStrip } from "@/sections/PublishedOnStrip";
import { Process } from "@/sections/Process";
import { Results } from "@/sections/Results";
import { SelectedWork } from "@/sections/SelectedWork";
import { Services } from "@/sections/Services";
import { VisualLab } from "@/sections/VisualLab";

export default function Home() {
  const portfolioProjects = getPortfolioProjects();

  return (
    <LanguageProvider>
      <main className="min-h-screen overflow-x-clip text-white">
        <OceanBackground />
        <CursorGlow />
        <SiteHeader />
        <Hero projects={getHeroProjects(portfolioProjects)} />
        <PublishedOnStrip />
        <Results />
        <Services />
        <VisualLab projects={getVisualLabProjects(portfolioProjects)} />
        <SelectedWork projects={portfolioProjects} />
        <Process />
        <About />
        <Contact />
        <AmbientModeButton />
      </main>
    </LanguageProvider>
  );
}
