export const SITE_URL = "https://www.2jtech.net";
export const SITE_NAME = "2J Tech";
export const SITE_BRAND_TITLE = "2J Tech Softwares";
export const SITE_LEGAL_NAME = "2J Tech Softwares, Consultoria & Gestão";
export const SITE_LOCATION = "Itajaí, SC — Brasil";

export const SITE_EMAIL = "contato@2jtech.net";
export const SITE_SUPPORT_EMAIL = "suporte@2jtech.net";
export const SITE_ADMIN_EMAIL = "adm@2jtech.net";
export const SITE_PHONE_DISPLAY = "(47) 9636-2471";
export const SITE_PHONE_RAW = "554796362471";
export const SITE_GITHUB_URL = "https://github.com/2jtechsoftware";

export const SITE_TITLE =
  "2J Tech | Desenvolvimento de Software que Transforma Negócios";

export const SITE_DESCRIPTION =
  "Criamos sistemas, plataformas e soluções tecnológicas sob medida para empresas que precisam automatizar processos, integrar operações e crescer com tecnologia. Do planejamento à entrega, tecnologia com propósito.";

export const SITE_KEYWORDS = [
  "2J Tech Softwares",
  "2J Tech",
  "desenvolvimento de software sob medida",
  "sistemas corporativos",
  "desenvolvimento de sistemas B2B",
  "APIs e integrações",
  "automação com inteligência artificial",
  "consultoria tecnológica",
  "software house Itajaí SC",
  "sistemas web empresariais",
] as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_BRAND_TITLE,
  alternateName: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icons/icon-512.png`,
  image: `${SITE_URL}/og-image.png`,
  email: SITE_EMAIL,
  telephone: "+55-47-9636-2471",
  description: SITE_DESCRIPTION,
  sameAs: [SITE_GITHUB_URL],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Itajaí",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE_EMAIL,
      telephone: "+55-47-9636-2471",
      availableLanguage: ["Portuguese", "pt-BR"],
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      email: SITE_SUPPORT_EMAIL,
      availableLanguage: ["Portuguese", "pt-BR"],
    },
  ],
  areaServed: {
    "@type": "Country",
    name: "Brazil",
  },
  knowsAbout: [
    "Desenvolvimento de sistemas sob medida",
    "Sistemas empresariais",
    "Arquitetura de APIs e integrações",
    "Automação e Inteligência Artificial aplicada",
    "Consultoria técnica em software",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_BRAND_TITLE,
  description: SITE_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "pt-BR",
};

export const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: SITE_BRAND_TITLE,
  legalName: SITE_LEGAL_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  description: SITE_DESCRIPTION,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "BR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Itajaí",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  serviceType: [
    "Sistemas Corporativos Sob Medida",
    "APIs e Integrações Empresariais",
    "Automação e IA Aplicada",
    "Consultoria e Arquitetura de Software",
  ],
};
