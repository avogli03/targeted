export type Locale = "en" | "sq";

export type Article = {
  id: number;
  slug: string;
  category: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  image: string;
  date: string;
  featured?: boolean;
};

export const navItems: Record<Locale, string[]> = {
  en: ["Home", "Lifestyle", "Wellbeing", "Business", "Technology", "Entertainment", "People", "Marketing", "Top 5", "Contact"],
  sq: ["Kreu", "Stil jete", "Mirëqenie", "Biznes", "Teknologji", "Argëtim", "Njerëz", "Marketing", "Top 5", "Kontakt"]
};

export const ui = {
  en: {
    readMore: "Read more",
    latest: "Latest stories",
    business: "Business",
    lifestyle: "Lifestyle",
    marketing: "Marketing",
    wellbeing: "Wellbeing",
    technology: "Technology",
    people: "People",
    newsletterTitle: "Stay connected with the latest trends and ideas",
    newsletterCopy: "Weekly updates on business, digital marketing, technology and wellbeing.",
    emailPlaceholder: "Email address",
    subscribe: "Subscribe",
    language: "Language",
    leadLabel: "Featured"
  },
  sq: {
    readMore: "Lexo më shumë",
    latest: "Artikujt e fundit",
    business: "Biznes",
    lifestyle: "Stil jete",
    marketing: "Marketing",
    wellbeing: "Mirëqenie",
    technology: "Teknologji",
    people: "Njerëz",
    newsletterTitle: "Qëndro i lidhur me trendet dhe idetë më të fundit",
    newsletterCopy: "Përditësime javore për biznes, marketing digjital, teknologji dhe mirëqenie.",
    emailPlaceholder: "Adresa e emailit",
    subscribe: "Abonohu",
    language: "Gjuha",
    leadLabel: "Kryesore"
  }
} satisfies Record<Locale, Record<string, string>>;

export const articles: Article[] = [
  {
    id: 1,
    slug: "profit-growth",
    category: "Business",
    title: {
      en: "Why many companies grow revenue but not profit",
      sq: "Pse shumë kompani rrisin të ardhurat, por jo fitimin"
    },
    excerpt: {
      en: "Growth looks healthy on the surface, but weak margins, fragmented operations and unclear pricing can drain the value behind every sale.",
      sq: "Rritja duket e shëndetshme në pamje të parë, por marzhet e dobëta, operacionet e shpërndara dhe çmimet e paqarta mund të ulin vlerën e çdo shitjeje."
    },
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    date: "2026-05-28",
    featured: true
  },
  {
    id: 2,
    slug: "ai-seo-discoverability",
    category: "Marketing",
    title: {
      en: "Semantic discoverability in AI-driven SEO",
      sq: "Zbulueshmëria semantike në SEO të drejtuar nga AI"
    },
    excerpt: {
      en: "Search visibility now depends on context, entities and trusted signals that help AI systems understand what a brand actually represents.",
      sq: "Dukshmëria në kërkim tani varet nga konteksti, entitetet dhe sinjalet e besueshme që ndihmojnë sistemet AI të kuptojnë çfarë përfaqëson një markë."
    },
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    date: "2026-05-25",
    featured: true
  },
  {
    id: 3,
    slug: "remote-work-balance",
    category: "Lifestyle",
    title: {
      en: "Small routines that make remote work calmer",
      sq: "Rutina të vogla që e bëjnë punën në distancë më të qetë"
    },
    excerpt: {
      en: "A practical mix of planning, movement and boundaries can make a home office feel focused without becoming rigid.",
      sq: "Një kombinim praktik i planifikimit, lëvizjes dhe kufijve mund ta bëjë zyrën në shtëpi më të përqendruar pa u bërë e ngurtë."
    },
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    date: "2026-05-20",
    featured: true
  },
  {
    id: 4,
    slug: "founder-finance",
    category: "Business",
    title: {
      en: "The founder's weekly finance dashboard",
      sq: "Paneli javor financiar për themeluesit"
    },
    excerpt: {
      en: "Five numbers are enough to spot cash pressure, slow collections and margin shifts before they become urgent.",
      sq: "Pesë numra mjaftojnë për të parë presionin mbi paratë, arkëtimet e ngadalta dhe ndryshimet e marzhit para se të bëhen urgjente."
    },
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    date: "2026-05-18"
  },
  {
    id: 5,
    slug: "wellbeing-checklist",
    category: "Wellbeing",
    title: {
      en: "A realistic wellbeing checklist for busy weeks",
      sq: "Një listë realiste mirëqenieje për javë të ngarkuara"
    },
    excerpt: {
      en: "Sleep, hydration, short walks and digital pauses sound simple because they are. The hard part is making them visible.",
      sq: "Gjumi, hidratimi, ecjet e shkurtra dhe pauzat digjitale duken të thjeshta sepse janë të tilla. Pjesa e vështirë është t'i bësh të dukshme."
    },
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80",
    date: "2026-05-15"
  },
  {
    id: 6,
    slug: "brand-ai-relevance",
    category: "Technology",
    title: {
      en: "How AI systems evaluate brand relevance",
      sq: "Si e vlerësojnë sistemet AI rëndësinë e markës"
    },
    excerpt: {
      en: "AI assistants combine freshness, authority and contextual fit. Brands need content that answers specific questions clearly.",
      sq: "Asistentët AI kombinojnë freskinë, autoritetin dhe përshtatjen kontekstuale. Markat kanë nevojë për përmbajtje që u përgjigjet qartë pyetjeve konkrete."
    },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    date: "2026-05-12"
  },
  {
    id: 7,
    slug: "campaign-planning",
    category: "Marketing",
    title: {
      en: "Campaign planning that survives a busy quarter",
      sq: "Planifikim fushatash që i reziston një tremujori të ngarkuar"
    },
    excerpt: {
      en: "A tighter brief, fewer goals and clearer ownership help marketing teams move faster without lowering the standard.",
      sq: "Një brief më i qartë, më pak qëllime dhe përgjegjësi të përcaktuara ndihmojnë ekipet e marketingut të ecin më shpejt pa ulur standardin."
    },
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    date: "2026-05-10"
  },
  {
    id: 8,
    slug: "digital-leaders",
    category: "People",
    title: {
      en: "Digital leaders to watch this year",
      sq: "Liderë digjitalë për t'u ndjekur këtë vit"
    },
    excerpt: {
      en: "Operators, strategists and founders who are changing how teams build visibility and trust online.",
      sq: "Operatorë, strategë dhe themelues që po ndryshojnë mënyrën si ekipet ndërtojnë dukshmëri dhe besim online."
    },
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
    date: "2026-05-06"
  }
];
