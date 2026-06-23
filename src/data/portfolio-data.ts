import { publicAssetExists } from "@/utils/public-assets";

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  client: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  views: string | null;
  tags: string[];
  story: string;
  tools: string[];
  goal: string;
  featured: boolean;
};

export const selectedWorkFolder = "/images/selected-work";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "saffron-butter-steak",
    title: "Saffron Butter Steak",
    category: "Food Visuals",
    client: "Client Work",
    image: `${selectedWorkFolder}/saffron-butter-steak.jpg`,
    views: "2.2M views",
    tags: ["Client Work", "Food Visuals", "Thumbnail"],
    story:
      "A premium steak experiment built around color, appetite, and instant texture read.",
    tools: ["Photoshop", "Compositing", "Retouching"],
    goal: "Make the saffron butter transformation feel rich, strange, and clickable at feed size.",
    featured: true,
  },
  {
    id: "formula-one-food-challenge",
    title: "Formula One Food Challenge",
    category: "Food Visuals",
    client: "Client Work",
    image: `${selectedWorkFolder}/formula-one-food-challenge.jpg`,
    views: "3.3M views",
    tags: ["Client Work", "Multi-Person", "Thumbnail"],
    story:
      "A challenge thumbnail designed to feel like a big creator event with immediate stakes.",
    tools: ["Photoshop", "Composite Layout", "Color"],
    goal: "Make the cast, premise, and competition readable before the viewer reads the title.",
    featured: true,
  },
  {
    id: "dr-pepper-steak",
    title: "Dr Pepper Steak",
    category: "Food Visuals",
    client: "Client Work",
    image: `${selectedWorkFolder}/dr-pepper-steak.png`,
    views: "1.1M views",
    tags: ["Client Work", "Product Cue", "Thumbnail"],
    story:
      "A familiar drink turned into a steak experiment with a clear curiosity hook.",
    tools: ["Photoshop", "Food Retouching", "Product Composite"],
    goal: "Use an instantly recognizable product cue to make the experiment feel surprising.",
    featured: true,
  },
  {
    id: "maple-syrup-dry-age",
    title: "Maple Syrup Dry Age",
    category: "Food Visuals",
    client: "Client Work",
    image: `${selectedWorkFolder}/maple-syrup-dry-age.jpg`,
    views: "Published project",
    tags: ["Client Work", "Food Visuals", "Thumbnail"],
    story:
      "A steak dry-age concept built around a sticky, unexpected ingredient and a fast curiosity read.",
    tools: ["Photoshop", "Food Retouching", "Compositing"],
    goal: "Make the maple syrup idea feel clear, strange, and appetizing in one glance.",
    featured: false,
  },
  {
    id: "japan-food-experience",
    title: "Japan Food Experience",
    category: "Food Visuals",
    client: "Client Work",
    image: `${selectedWorkFolder}/japan-food-experience.jpg`,
    views: "675K views",
    tags: ["Client Work", "Food Visuals", "Travel"],
    story:
      "A travel-food thumbnail shaped around abundance, destination cues, and instant variety.",
    tools: ["Photoshop", "Travel Packaging", "Color"],
    goal: "Make the Japan food experience feel full, warm, and readable at feed size.",
    featured: false,
  },
  {
    id: "royal-jelly-steak",
    title: "Royal Jelly Steak",
    category: "Food Visuals",
    client: "Client Work",
    image: `${selectedWorkFolder}/royal-jelly-steak.jpg`,
    views: "1M views",
    tags: ["Client Work", "Premium Cue", "Thumbnail"],
    story: "A strange premium ingredient framed as a steak experiment.",
    tools: ["Photoshop", "Compositing", "Retouching"],
    goal: "Make the ingredient feel rare, expensive, and visually obvious.",
    featured: false,
  },
  {
    id: "sesame-oil-steak",
    title: "Sesame Oil Steak",
    category: "Food Visuals",
    client: "Client Work",
    image: `${selectedWorkFolder}/sesame-oil-steak.jpg`,
    views: "533K views",
    tags: ["Client Work", "Food Visuals", "Thumbnail"],
    story:
      "A clean food experiment thumbnail built around a familiar ingredient and a direct steak transformation.",
    tools: ["Photoshop", "Food Retouching", "Color"],
    goal: "Keep the subject simple while making the ingredient cue visible and clickable.",
    featured: false,
  },
  {
    id: "arepas-leo-2",
    title: "Arepas Leo",
    category: "Food Visuals",
    client: "Howard",
    image: `${selectedWorkFolder}/arepas-leo-2.jpg`,
    views: "Published project",
    tags: ["Howard", "Food Visuals", "Thumbnail"],
    story:
      "A food creator visual built around appetite, texture, and fast product recognition.",
    tools: ["Photoshop", "Food Retouching", "Color"],
    goal: "Make the food feel warm, close, and instantly understood in a social feed.",
    featured: false,
  },
  {
    id: "howard-creator-thumbnail",
    title: "Howard Creator Thumbnail",
    category: "Food Visuals",
    client: "Howard",
    image: `${selectedWorkFolder}/howard-creator-thumbnail.jpg`,
    views: "Published project",
    tags: ["Howard", "Food Visuals", "Creator Packaging"],
    story: "A creator thumbnail prepared for a food-led upload environment.",
    tools: ["Photoshop", "Compositing", "Color"],
    goal: "Balance creator identity with food clarity.",
    featured: true,
  },
  {
    id: "cesar-portrait",
    title: "Cesar",
    category: "Transformation Portrait",
    client: "Personal Experiment",
    image: `${selectedWorkFolder}/cesar-portrait.jpg`,
    beforeImage: `${selectedWorkFolder}/Cesar.raw.png`,
    afterImage: `${selectedWorkFolder}/cesar-portrait.jpg`,
    views: "Transformation Portrait",
    tags: ["Transformation Portrait", "AI Portrait", "Personal Experiments"],
    story:
      "A transformation portrait built around heat, character, and cinematic identity.",
    tools: ["Photoshop", "AI", "Retouching"],
    goal: "Create a transformation portrait with a strong character read and a finished composite feel.",
    featured: true,
  },
  {
    id: "fefe-portrait",
    title: "FEFE",
    category: "Character Portrait",
    client: "Personal Experiment",
    image: `${selectedWorkFolder}/fefe-portrait.jpg`,
    beforeImage: `${selectedWorkFolder}/fefe.raw.png`,
    afterImage: `${selectedWorkFolder}/fefe-portrait.jpg`,
    views: "Character Portrait",
    tags: ["Character Portrait", "AI Portrait", "Personal Experiments"],
    story:
      "A stylized character portrait shaped for mood, identity, and presence.",
    tools: ["Photoshop", "AI", "Color"],
    goal: "Turn a portrait into a character-forward visual with a strong first read.",
    featured: false,
  },
  {
    id: "luna-portrait",
    title: "Luna",
    category: "Fantasy Composite",
    client: "Personal Experiment",
    image: `${selectedWorkFolder}/luna-portrait.jpg`,
    beforeImage: `${selectedWorkFolder}/luna.raw.png`,
    afterImage: `${selectedWorkFolder}/luna-portrait.jpg`,
    views: "Fantasy Composite",
    tags: ["Fantasy Composite", "AI Portrait", "Personal Experiments"],
    story:
      "A dreamlike fantasy portrait exploring softness, cave atmosphere, and character mood.",
    tools: ["Photoshop", "AI", "Lighting"],
    goal: "Build an emotional fantasy environment around a clear portrait subject.",
    featured: true,
  },
  {
    id: "stefano-portrait",
    title: "Stefano",
    category: "Personal Experiment",
    client: "S.N. Visuals",
    image: "/images/selected-work/stefano.JPG",
    beforeImage: "/images/selected-work/stefano.raw.jpg",
    afterImage: "/images/selected-work/stefano.JPG",
    views: null,
    tags: [
      "Portraits",
      "Personal Experiments",
      "Photoshop + AI",
      "Character Portrait",
    ],
    story:
      "A personal portrait experiment built around mood, fire, cinematic lighting, and character presence.",
    tools: ["Photoshop", "AI", "Lighting", "Retouching"],
    goal: "Turn a simple raw portrait into a finished fantasy/editorial character image without making the website feel like a personal selfie page.",
    featured: true,
  },
  {
    id: "golden-glow-study",
    title: "Golden Glow Study",
    category: "Composites",
    client: "Personal Experiment",
    image: `${selectedWorkFolder}/Golden GLow Raw copy.png`,
    views: "Composite Study",
    tags: ["Composites", "Personal Experiments", "Photoshop"],
    story:
      "An experimental image study focused on glow, mood, color, and atmosphere.",
    tools: ["Photoshop", "Color", "Composite Finish"],
    goal: "Keep the archive open to visual experiments, not only published thumbnails.",
    featured: false,
  },
];

const visualLabOrder = [
  "saffron-butter-steak",
  "arepas-leo-2",
  "cesar-portrait",
  "golden-glow-study",
  "howard-creator-thumbnail",
  "fefe-portrait",
  "stefano-portrait",
  "formula-one-food-challenge",
  "luna-portrait",
  "dr-pepper-steak",
  "japan-food-experience",
];

const heroOrder = [
  "luna-portrait",
  "cesar-portrait",
  "stefano-portrait",
  "howard-creator-thumbnail",
  "dr-pepper-steak",
  "formula-one-food-challenge",
  "saffron-butter-steak",
];

function sortByCuratedOrder(projects: PortfolioProject[], order: string[]) {
  const ranked = new Map(order.map((projectId, index) => [projectId, index]));

  return [...projects].sort((a, b) => {
    const aRank = ranked.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const bRank = ranked.get(b.id) ?? Number.MAX_SAFE_INTEGER;

    if (aRank !== bRank) {
      return aRank - bRank;
    }

    return a.title.localeCompare(b.title);
  });
}

export function getPortfolioProjects() {
  return portfolioProjects
    .filter(
      (project) =>
        project.image.startsWith(`${selectedWorkFolder}/`) &&
        publicAssetExists(project.image),
    )
    .map((project) => {
      const hasBeforeAfter =
        project.beforeImage?.startsWith(`${selectedWorkFolder}/`) &&
        project.afterImage?.startsWith(`${selectedWorkFolder}/`) &&
        publicAssetExists(project.beforeImage) &&
        publicAssetExists(project.afterImage);

      if (hasBeforeAfter) {
        return project;
      }

      const projectWithoutComparison: PortfolioProject = { ...project };

      delete projectWithoutComparison.beforeImage;
      delete projectWithoutComparison.afterImage;

      return projectWithoutComparison;
    });
}

export function getHeroProjects(projects: PortfolioProject[]) {
  const heroProjectIds = new Set(heroOrder);
  const launchHeroProjects = projects.filter((project) =>
    heroProjectIds.has(project.id),
  );

  return sortByCuratedOrder(
    launchHeroProjects.length > 0 ? launchHeroProjects : projects,
    heroOrder,
  ).slice(0, 7);
}

export function getVisualLabProjects(projects: PortfolioProject[]) {
  return sortByCuratedOrder(projects, visualLabOrder).slice(0, 10);
}
