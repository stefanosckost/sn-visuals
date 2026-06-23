import type { PortfolioProject } from "@/data/portfolio-data";
import {
  translateMetadata,
  type Language,
} from "@/i18n/language";

const hiddenTagLabels = new Set([
  "guga foods",
  "howard",
  "thumbnail",
]);

function projectText(project: PortfolioProject) {
  return [
    project.title,
    project.category,
    project.client,
    project.views ?? "",
    ...project.tags,
  ]
    .join(" ")
    .toLowerCase();
}

export function getProjectDisplaySource(
  project: PortfolioProject,
  language: Language = "en",
) {
  const text = projectText(project);

  if (project.views?.toLowerCase().includes("views")) {
    return translateMetadata("High-performing upload", language);
  }

  if (text.includes("creator packaging") || text.includes("howard")) {
    return translateMetadata("Creator packaging", language);
  }

  if (text.includes("food")) {
    return translateMetadata("Published thumbnail", language);
  }

  if (text.includes("portrait")) {
    return translateMetadata("Portrait study", language);
  }

  if (text.includes("composite") || text.includes("ai")) {
    return translateMetadata("AI composite", language);
  }

  return translateMetadata("Published work", language);
}

export function getProjectMetaLine(
  project: PortfolioProject,
  language: Language = "en",
) {
  return `${getProjectDisplaySource(project, language)} / ${translateMetadata(project.category, language)}`;
}

export function getProjectDisplayTags(
  project: PortfolioProject,
  limit = 2,
  language: Language = "en",
) {
  const tags = project.tags.filter((tag) => {
    const normalized = tag.toLowerCase();

    return (
      !hiddenTagLabels.has(normalized) &&
      normalized !== project.category.toLowerCase() &&
      normalized !== project.client.toLowerCase()
    );
  });

  return Array.from(new Set(tags))
    .slice(0, limit)
    .map((tag) => translateMetadata(tag, language));
}
