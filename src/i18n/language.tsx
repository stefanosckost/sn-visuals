"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { PortfolioProject } from "@/data/portfolio-data";

export type Language = "en" | "es";

const languageStorageKey = "sn-visuals-language";

export const copy = {
  en: {
    languageToggle: {
      label: "Language",
    },
    nav: {
      work: "Work",
      services: "Services",
      process: "Process",
      about: "About",
      contact: "Contact",
      startProject: "Start a project",
    },
    hero: {
      eyebrow: "S.N. Visual Lab",
      headline: "Premium visual packaging for creators & content brands.",
      subheadline:
        "Thumbnails, portraits, food visuals, and cinematic composites built for clarity, emotion, and click potential.",
      startProject: "Start a Project",
      viewWork: "View Work",
      emptyTitle: "Selected image folder is ready",
      emptyBody:
        "Place selected portfolio images in /public/images/selected-work/ to activate the hero and portfolio.",
      openProject: "Open project for",
      showProject: "Show",
      visualWork: "visual work",
    },
    rail: {
      published: "Published Work",
      creator: "Creator Packaging",
      food: "Food Visuals",
      portraits: "Portraits",
      ai: "AI Composites",
      personal: "Personal Experiments",
    },
    services: {
      label: "Services",
      title: "What the studio builds.",
      body: "Premium visual packaging for creators, brands, and content-driven businesses.",
      support:
        "Sharper visual clarity, stronger perceived value, and better click potential without a bloated process.",
      items: [
        {
          title: "YouTube Thumbnails",
          body: "High-performance thumbnail design for stronger concepts, clearer storytelling, and more competitive visual packaging.",
        },
        {
          title: "Creator Packaging",
          body: "Premium visual systems for creators who need a stronger, more consistent, and more recognizable channel identity.",
        },
        {
          title: "Cinematic Composites",
          body: "Photoshop and AI-assisted composites for posters, campaigns, thumbnails, portraits, and high-impact visual concepts.",
        },
        {
          title: "Food & Product Visuals",
          body: "Food and product-focused visuals designed to make dishes, products, and ideas feel cinematic, appetizing, and high-value.",
        },
      ],
    },
    results: {
      label: "Results",
      title: "Proof, not pitch.",
      body: "Performance, range, and upload-ready rhythm.",
      more: "More",
      items: [
        {
          label: "Selected thumbnail views",
          note: "Real performance signals",
          detail:
            "A quick proof point from selected published work, not a vanity portfolio claim.",
        },
        {
          label: "Published projects",
          note: "Built for upload cycles",
          detail:
            "Images built for real creator schedules, revisions, and fast decisions.",
        },
        {
          label: "Top selected project",
          note: "One published upload",
          detail:
            "The strongest selected result in the current archive: Formula One Food Challenge.",
        },
        {
          text: "Weekly",
          label: "Real publishing rhythm",
          note: "Fast creator workflow",
          detail:
            "A workflow designed for upload momentum, not slow portfolio-only visuals.",
        },
      ],
    },
    visualLab: {
      label: "The Visual Lab",
      title: "The range lives in the mix.",
      body: "A quick pass through the archive.",
      lanes: [
        "Published thumbnails",
        "AI portraits",
        "Food creator visuals",
        "Photoshop composites",
        "Personal experiments",
      ],
      emptyTitle: "Waiting for selected visuals",
      emptyBody:
        "This moodboard only uses files from /public/images/selected-work/.",
      open: "Open",
    },
    selectedWork: {
      label: "Selected Work",
      title: "A living visual archive.",
      body: "Thumbnails, portraits, food visuals, and experiments.",
      emptyTitle: "No selected work loaded yet",
      emptyBody:
        "Place selected portfolio images in /public/images/selected-work/ and add or enable matching entries in portfolio-data.ts.",
      filters: {
        all: "All",
        published: "Published Work",
        creator: "Creator Packaging",
        food: "Food Visuals",
        portraits: "Portraits",
        ai: "AI Composites",
        personal: "Personal Experiments",
      },
    },
    card: {
      beforeAfter: "Before / After",
      viewProject: "View project",
      openDetails: "Open details for",
    },
    modal: {
      close: "Close project details",
      previousProject: "Previous project",
      nextProject: "Next project",
      selectedWork: "Selected Work",
      story: "Story",
      goal: "Goal",
      tools: "Tools",
      previous: "Previous",
      next: "Next",
      beforeAfter: "Before / After",
      sideBySide: "Side by side",
      slider: "Slider",
      before: "Before",
      after: "After",
      adjustComparison: "Adjust before and after comparison",
      originalImage: "original image",
      finalImage: "final edited image",
    },
    process: {
      label: "Process",
      title: "A simple studio process.",
      body: "Clear scope. Premium execution. Clean delivery.",
      more: "More",
      payment:
        "Projects are quoted after reviewing the idea, references, assets, deadline, and intended use. A deposit is required before production begins. Final files are delivered after approval.",
      steps: [
        {
          title: "Submit Your Project",
          body: "Send the idea, references, assets, timeline, and goals.",
          detail:
            "The clearest starting point is the video idea, brand context, visual references, deadline, and what the upload needs to communicate.",
        },
        {
          title: "Creative Direction & Quote",
          body: "We review the scope and recommend the best visual direction.",
          detail:
            "You get a focused direction, recommended deliverables, timeline, and price before production begins.",
        },
        {
          title: "Deposit / Approval",
          body: "A deposit confirms the scope before production begins.",
          detail:
            "Once the direction, timeline, and quote are approved, the project is scheduled and production starts.",
        },
        {
          title: "Production",
          body: "The visual is built with a cinematic workflow.",
          detail:
            "Photoshop craft, AI-assisted support, compositing, lighting, retouching, and feed-size clarity are handled inside one polished process.",
        },
        {
          title: "Review & Delivery",
          body: "Final adjustments are made, then approved files are delivered.",
          detail:
            "The final package is prepared cleanly for upload, campaign use, or creator publishing cycles.",
        },
      ],
    },
    about: {
      label: "About",
      title: "Small studio. High-impact visuals.",
      body: "S.N. Visuals is a boutique creative studio for premium thumbnails, creator packaging, cinematic composites, and food visuals built for real publishing cycles.",
    },
    contact: {
      label: "Contact",
      title: "Have a project in mind?",
      body: "Send the idea and we'll recommend the best visual direction. Not sure what you need? We'll guide you.",
      subject: "New Project Inquiry",
      emailBodyTitle: "New project inquiry from S.N. Visuals website",
      name: "Name",
      email: "Email",
      channel: "Channel / Brand",
      projectIdea: "Video Title or Project Idea",
      deadline: "Deadline / Timeline",
      deadlineBody: "Deadline",
      message: "Message / References",
      messagePlaceholder: "Links, references, video angle, thumbnail goal.",
      openDraft: "Open Email Draft",
      emailStefano: "Email Stefano",
      prepared: "Project note ready in your email app.",
      preferEmail: "Prefer direct email?",
      footerLeft: "S.N. Visuals LLC",
      footerRight: "Premium Visual Packaging / Creator Packaging / AI Compositing",
    },
    ambient: {
      title: "Toggle Ambient Mode music",
      prefix: "Ambient Mode:",
      on: "On",
      off: "Off",
      retry: "Retry",
      mute: "Mute",
      unmute: "Unmute",
      muteTitle: "Mute Ambient Mode",
      unmuteTitle: "Unmute Ambient Mode",
    },
  },
  es: {
    languageToggle: {
      label: "Idioma",
    },
    nav: {
      work: "Trabajos",
      services: "Servicios",
      process: "Proceso",
      about: "Acerca",
      contact: "Contacto",
      startProject: "Iniciar proyecto",
    },
    hero: {
      eyebrow: "S.N. Visual Lab",
      headline: "Packaging visual premium para creadores y marcas de contenido.",
      subheadline:
        "Thumbnails, retratos, visuales de comida y composiciones cinematográficas creadas para claridad, emoción y potencial de click.",
      startProject: "Iniciar proyecto",
      viewWork: "Ver trabajos",
      emptyTitle: "La carpeta de imágenes seleccionadas está lista",
      emptyBody:
        "Coloca las imágenes aprobadas en /public/images/selected-work/ para activar el hero y el portfolio.",
      openProject: "Abrir proyecto de",
      showProject: "Mostrar",
      visualWork: "trabajo visual",
    },
    rail: {
      published: "Trabajos publicados",
      creator: "Packaging de creator",
      food: "Visuales de comida",
      portraits: "Retratos",
      ai: "Composiciones IA",
      personal: "Experimentos personales",
    },
    services: {
      label: "Servicios",
      title: "Lo que construye el estudio.",
      body: "Packaging visual premium para creadores, marcas y negocios basados en contenido.",
      support:
        "Más claridad visual, mayor valor percibido y mejor potencial de click sin un proceso pesado.",
      items: [
        {
          title: "Thumbnails para YouTube",
          body: "Diseño de thumbnails de alto rendimiento para conceptos más fuertes, storytelling más claro y packaging visual más competitivo.",
        },
        {
          title: "Packaging de creator",
          body: "Sistemas visuales premium para creadores que necesitan una identidad de canal más fuerte, consistente y reconocible.",
        },
        {
          title: "Composiciones cinematográficas",
          body: "Composiciones con Photoshop e IA para posters, campañas, thumbnails, retratos y conceptos visuales de alto impacto.",
        },
        {
          title: "Visuales de comida y producto",
          body: "Visuales enfocados en comida y producto para que platos, productos e ideas se sientan cinematográficos, apetitosos y de alto valor.",
        },
      ],
    },
    results: {
      label: "Resultados",
      title: "Prueba, no promesa.",
      body: "Rendimiento, rango y ritmo listo para publicar.",
      more: "Ver más",
      items: [
        {
          label: "Vistas en thumbnails seleccionados",
          note: "Señales reales de rendimiento",
          detail:
            "Un punto de prueba tomado de trabajos publicados seleccionados, no una afirmación vacía de portfolio.",
        },
        {
          label: "Proyectos publicados",
          note: "Hechos para ciclos de publicación",
          detail:
            "Imágenes construidas para calendarios reales de creadores, revisiones y decisiones rápidas.",
        },
        {
          label: "Proyecto seleccionado más alto",
          note: "Un upload publicado",
          detail:
            "El resultado más fuerte del archivo actual: Formula One Food Challenge.",
        },
        {
          text: "Semanal",
          label: "Ritmo real de publicación",
          note: "Workflow rápido para creators",
          detail:
            "Un flujo pensado para mantener momentum de uploads, no sólo visuales lentos de portfolio.",
        },
      ],
    },
    visualLab: {
      label: "Visual Lab",
      title: "El rango vive en la mezcla.",
      body: "Una pasada rápida por el archivo.",
      lanes: [
        "Thumbnails publicados",
        "Retratos IA",
        "Visuales de comida",
        "Composiciones Photoshop",
        "Experimentos personales",
      ],
      emptyTitle: "Esperando visuales seleccionados",
      emptyBody:
        "Este moodboard sólo usa archivos de /public/images/selected-work/.",
      open: "Abrir",
    },
    selectedWork: {
      label: "Trabajos seleccionados",
      title: "Un archivo visual vivo.",
      body: "Thumbnails, retratos, visuales de comida y experimentos.",
      emptyTitle: "Aún no hay trabajos seleccionados cargados",
      emptyBody:
        "Coloca imágenes aprobadas en /public/images/selected-work/ y agrega o activa sus entradas en portfolio-data.ts.",
      filters: {
        all: "Todo",
        published: "Trabajos publicados",
        creator: "Packaging de creator",
        food: "Visuales de comida",
        portraits: "Retratos",
        ai: "Composiciones IA",
        personal: "Experimentos personales",
      },
    },
    card: {
      beforeAfter: "Antes / Después",
      viewProject: "Ver proyecto",
      openDetails: "Abrir detalles de",
    },
    modal: {
      close: "Cerrar detalles del proyecto",
      previousProject: "Proyecto anterior",
      nextProject: "Proyecto siguiente",
      selectedWork: "Trabajo seleccionado",
      story: "Historia",
      goal: "Objetivo",
      tools: "Herramientas",
      previous: "Anterior",
      next: "Siguiente",
      beforeAfter: "Antes / Después",
      sideBySide: "Lado a lado",
      slider: "Comparador",
      before: "Antes",
      after: "Después",
      adjustComparison: "Ajustar comparación antes y después",
      originalImage: "imagen original",
      finalImage: "imagen final editada",
    },
    process: {
      label: "Proceso",
      title: "Un proceso de estudio simple.",
      body: "Alcance claro. Ejecución premium. Entrega limpia.",
      more: "Ver más",
      payment:
        "Los proyectos se cotizan después de revisar la idea, referencias, assets, fecha límite y uso previsto. Se requiere un depósito antes de iniciar producción. Los archivos finales se entregan después de la aprobación.",
      steps: [
        {
          title: "Envía tu proyecto",
          body: "Comparte la idea, referencias, assets, timeline y objetivos.",
          detail:
            "El mejor punto de partida es la idea del video, contexto de marca, referencias visuales, deadline y lo que el upload necesita comunicar.",
        },
        {
          title: "Dirección creativa y cotización",
          body: "Revisamos el alcance y recomendamos la mejor dirección visual.",
          detail:
            "Recibes una dirección enfocada, entregables recomendados, timeline y precio antes de iniciar producción.",
        },
        {
          title: "Depósito / aprobación",
          body: "Un depósito confirma el alcance antes de iniciar producción.",
          detail:
            "Cuando la dirección, timeline y cotización están aprobados, el proyecto se agenda y comienza la producción.",
        },
        {
          title: "Producción",
          body: "El visual se construye con un workflow cinematográfico.",
          detail:
            "Photoshop, apoyo con IA, composición, iluminación, retoque y claridad a tamaño feed se trabajan dentro de un proceso pulido.",
        },
        {
          title: "Revisión y entrega",
          body: "Se hacen ajustes finales y luego se entregan los archivos aprobados.",
          detail:
            "El paquete final se prepara limpio para upload, campaña o ciclos de publicación de creators.",
        },
      ],
    },
    about: {
      label: "Acerca",
      title: "Estudio pequeño. Visuales de alto impacto.",
      body: "S.N. Visuals es un estudio creativo boutique para thumbnails premium, creator packaging, composiciones cinematográficas y visuales de comida construidos para ciclos reales de publicación.",
    },
    contact: {
      label: "Contacto",
      title: "¿Tienes un proyecto en mente?",
      body: "Envía la idea y recomendaremos la mejor dirección visual. ¿No sabes exactamente qué necesitas? Te guiamos.",
      subject: "Nueva consulta de proyecto",
      emailBodyTitle: "Nueva consulta de proyecto desde el website de S.N. Visuals",
      name: "Nombre",
      email: "Email",
      channel: "Canal / Marca",
      projectIdea: "Título del video o idea del proyecto",
      deadline: "Deadline / Timeline",
      deadlineBody: "Deadline",
      message: "Mensaje / Referencias",
      messagePlaceholder: "Links, referencias, ángulo del video, objetivo del thumbnail.",
      openDraft: "Abrir borrador de email",
      emailStefano: "Email Stefano",
      prepared: "Nota del proyecto lista en tu app de email.",
      preferEmail: "¿Prefieres email directo?",
      footerLeft: "S.N. Visuals LLC",
      footerRight: "Packaging Visual Premium / Creator Packaging / Composición IA",
    },
    ambient: {
      title: "Activar música de Modo ambiente",
      prefix: "Modo ambiente:",
      on: "ON",
      off: "OFF",
      retry: "Reintentar",
      mute: "Silenciar",
      unmute: "Activar audio",
      muteTitle: "Silenciar Modo ambiente",
      unmuteTitle: "Activar audio de Modo ambiente",
    },
  },
} as const;

type Copy = (typeof copy)[Language];

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: Copy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const hasLoadedStoredLanguageRef = useRef(false);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);

    const loadPreferenceTimer = window.setTimeout(() => {
      hasLoadedStoredLanguageRef.current = true;

      if (isLanguage(storedLanguage)) {
        setLanguageState(storedLanguage);
      }
    }, 0);

    return () => window.clearTimeout(loadPreferenceTimer);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredLanguageRef.current) {
      return;
    }

    document.documentElement.lang = language;
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      copy: copy[language],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}

export function LanguageToggle() {
  const { language, setLanguage, copy: activeCopy } = useLanguage();

  return (
    <div
      className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/[0.035] p-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/58"
      aria-label={activeCopy.languageToggle.label}
      role="group"
    >
      {(["en", "es"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={`min-h-8 rounded-full px-2.5 transition ${
            language === option
              ? "bg-[#5df7ff] text-black shadow-[0_0_18px_rgba(93,247,255,0.22)]"
              : "text-white/58 hover:text-white"
          }`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const metadataTranslations: Record<string, string> = {
  "ai composite": "Composición IA",
  "ai portrait": "Retrato IA",
  "character portrait": "Retrato de personaje",
  "client work": "Trabajo para cliente",
  color: "Color",
  composites: "Composiciones",
  "composite finish": "Acabado de composición",
  "composite layout": "Layout compuesto",
  compositing: "Composición",
  "creator packaging": "Packaging de creator",
  "fantasy composite": "Composición fantástica",
  "food retouching": "Retoque gastronómico",
  "food visuals": "Visuales de comida",
  "high-performing upload": "Upload de alto rendimiento",
  howard: "Creator packaging",
  lighting: "Iluminación",
  "multi-person": "Multi-persona",
  "personal experiment": "Experimento personal",
  "personal experiments": "Experimentos personales",
  photoshop: "Photoshop",
  "photoshop + ai": "Photoshop + IA",
  "portrait study": "Estudio de retrato",
  portraits: "Retratos",
  "premium cue": "Señal premium",
  "product composite": "Composición de producto",
  "product cue": "Señal de producto",
  "published project": "Proyecto publicado",
  "published thumbnail": "Thumbnail publicado",
  "published work": "Trabajo publicado",
  retouching: "Retoque",
  thumbnail: "Thumbnail",
  "transformation portrait": "Retrato de transformación",
  travel: "Viaje",
  "travel packaging": "Packaging de viaje",
};

const projectSpanishCopy: Record<
  string,
  {
    story: string;
    goal: string;
  }
> = {
  "saffron-butter-steak": {
    story:
      "Un experimento premium de steak construido alrededor del color, el apetito y una lectura instantánea de textura.",
    goal:
      "Hacer que la transformación con mantequilla de saffron se sintiera rica, extraña y clickeable incluso a tamaño feed.",
  },
  "formula-one-food-challenge": {
    story:
      "Un thumbnail de challenge diseñado para sentirse como un gran evento de creators con stakes inmediatos.",
    goal:
      "Hacer que el cast, la premisa y la competencia se entiendan antes de que el viewer lea el título.",
  },
  "dr-pepper-steak": {
    story:
      "Una bebida reconocible convertida en experimento de steak con un hook de curiosidad claro.",
    goal:
      "Usar una señal de producto instantáneamente reconocible para que el experimento se sintiera sorprendente.",
  },
  "maple-syrup-dry-age": {
    story:
      "Un concepto de dry-age de steak construido alrededor de un ingrediente pegajoso, inesperado y fácil de entender.",
    goal:
      "Hacer que la idea del maple syrup se sintiera clara, extraña y apetitosa en un solo vistazo.",
  },
  "japan-food-experience": {
    story:
      "Un thumbnail de viaje y comida diseñado alrededor de abundancia, señales de destino y variedad inmediata.",
    goal:
      "Hacer que la experiencia de comida en Japón se sintiera completa, cálida y legible a tamaño feed.",
  },
  "royal-jelly-steak": {
    story:
      "Un ingrediente premium y extraño presentado como experimento de steak.",
    goal:
      "Hacer que el ingrediente se sintiera raro, costoso y visualmente obvio.",
  },
  "sesame-oil-steak": {
    story:
      "Un thumbnail limpio de experimento gastronómico construido alrededor de un ingrediente familiar y una transformación directa del steak.",
    goal:
      "Mantener el sujeto simple mientras la señal del ingrediente se siente visible y clickeable.",
  },
  "arepas-leo-2": {
    story:
      "Un visual para food creator construido alrededor del apetito, la textura y el reconocimiento rápido del producto.",
    goal:
      "Hacer que la comida se sintiera cálida, cercana e inmediatamente entendible dentro de un feed social.",
  },
  "howard-creator-thumbnail": {
    story:
      "Un thumbnail de creator preparado para un entorno de upload centrado en comida.",
    goal:
      "Equilibrar identidad de creator con claridad visual de la comida.",
  },
  "cesar-portrait": {
    story:
      "Un retrato de transformación construido alrededor del calor, el personaje y una identidad cinematográfica.",
    goal:
      "Crear un retrato de transformación con una lectura fuerte de personaje y acabado de composición.",
  },
  "fefe-portrait": {
    story:
      "Un retrato estilizado de personaje construido para mood, identidad y presencia.",
    goal:
      "Convertir un retrato en un visual centrado en personaje con una primera lectura fuerte.",
  },
  "luna-portrait": {
    story:
      "Un retrato fantástico y onírico que explora suavidad, atmósfera de cueva y mood de personaje.",
    goal:
      "Construir un entorno fantástico emocional alrededor de un sujeto de retrato claro.",
  },
  "stefano-portrait": {
    story:
      "Un experimento de retrato personal construido alrededor del mood, fuego, iluminación cinematográfica y presencia de personaje.",
    goal:
      "Convertir un retrato raw simple en una imagen editorial/fantasy terminada sin hacer que el sitio se sienta como una página de selfies.",
  },
  "golden-glow-study": {
    story:
      "Un estudio visual experimental enfocado en glow, mood, color y atmósfera.",
    goal:
      "Mantener el archivo abierto a experimentos visuales, no sólo a thumbnails publicados.",
  },
};

export function translateMetadata(value: string, language: Language) {
  if (language === "en") {
    return value;
  }

  const translated = metadataTranslations[value.toLowerCase()];

  return translated ?? value;
}

export function translateViews(value: string | null, language: Language) {
  if (!value) {
    return null;
  }

  if (language === "en") {
    return value;
  }

  if (value.toLowerCase().includes("views")) {
    return value.replace(/views/gi, "vistas");
  }

  return translateMetadata(value, language);
}

export function getLocalizedProject(project: PortfolioProject, language: Language) {
  const translatedProject = projectSpanishCopy[project.id];

  return {
    category: translateMetadata(project.category, language),
    client: translateMetadata(project.client, language),
    views: translateViews(project.views, language),
    tags: project.tags.map((tag) => translateMetadata(tag, language)),
    tools: project.tools.map((tool) => translateMetadata(tool, language)),
    story:
      language === "es" && translatedProject
        ? translatedProject.story
        : project.story,
    goal:
      language === "es" && translatedProject
        ? translatedProject.goal
        : project.goal,
  };
}
