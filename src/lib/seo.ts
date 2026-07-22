export const SITE_URL = "https://www.2jtech.net";
export const SITE_NAME = "2J Tech";
export const SITE_LEGAL_NAME = "2J Tech Softwares, Consultoria & Gestão";
export const SITE_EMAIL = "contato@2jtech.net";

export const SITE_TITLE =
  "2J Tech | Empresa de Software, Sistemas e Desenvolvimento Sob Medida";

export const SITE_DESCRIPTION =
  "Empresa de software especializada em sistemas web, plataformas, APIs, inteligência artificial, integrações e desenvolvimento sob medida. Softwares, consultoria e gestão para empresas que querem crescer com tecnologia.";

export const SITE_KEYWORDS = [
  "2J Tech",
  "2jtech",
  "empresa de software",
  "empresa de sistemas",
  "software house",
  "software house Brasil",
  "desenvolvimento de software",
  "desenvolvimento de sistemas",
  "desenvolvimento sob medida",
  "sistema sob medida",
  "software sob medida",
  "criar sistema para empresa",
  "desenvolver software empresarial",
  "sistemas web",
  "aplicações web",
  "desenvolvimento web",
  "sistemas empresariais",
  "ERP sob medida",
  "CRM sob medida",
  "plataforma digital",
  "APIs",
  "desenvolvimento de API",
  "integrações de sistemas",
  "automação de processos",
  "inteligência artificial",
  "IA para empresas",
  "chatbot empresarial",
  "consultoria tecnológica",
  "consultoria de software",
  "transformação digital",
  "soluções digitais",
  "fábrica de software",
  "empresa de TI",
  "desenvolvimento de aplicativos",
  "landing page profissional",
  "Next.js",
  "React",
  "Node.js",
] as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512.png`,
  image: `${SITE_URL}/og-image.png`,
  email: SITE_EMAIL,
  description: SITE_DESCRIPTION,
  foundingDate: "2024",
  sameAs: [],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE_EMAIL,
      availableLanguage: ["Portuguese", "pt-BR"],
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "Brazil",
  },
  knowsAbout: [
    "Desenvolvimento de software",
    "Sistemas empresariais",
    "APIs",
    "Inteligência Artificial",
    "Integrações",
    "Consultoria tecnológica",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "pt-BR",
};

export const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: SITE_LEGAL_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  description: SITE_DESCRIPTION,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "BR",
  serviceType: [
    "Desenvolvimento de Software",
    "Desenvolvimento de Sistemas",
    "APIs e Integrações",
    "Inteligência Artificial",
    "Consultoria Tecnológica",
    "Automações",
  ],
};
