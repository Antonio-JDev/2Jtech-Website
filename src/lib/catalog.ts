export type CatalogScreen = {
  id: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  stats: { label: string; value: string }[];
  rows: string[];
  /** @deprecated Prefer `images` — kept for single-shot screenshots */
  image?: string;
  /** One or more real screenshots under /public */
  images?: string[];
};

export type CatalogProject = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  cover: string;
  screens: CatalogScreen[];
  /** Live product URL when available */
  url?: string;
  /** Short brand/domain label shown in the preview chrome */
  domain?: string;
  /** Extra classes for carousel thumbnail (object-position / scale) */
  thumbnailClassName?: string;
};

/** Normalize single/multi photo fields for cards and previews. */
export function getScreenImages(screen: CatalogScreen): string[] {
  if (screen.images && screen.images.length > 0) return screen.images;
  if (screen.image) return [screen.image];
  return [];
}

/** All photos across screens — used for gallery / open validation. */
export function getProjectImages(project: CatalogProject): string[] {
  return project.screens.flatMap(getScreenImages);
}

export function buildQuoteHref(project: CatalogProject): string {
  const params = new URLSearchParams({
    projeto: project.id,
    titulo: project.title,
  });
  return `/?${params.toString()}#contato`;
}

export const CATALOG_PROJECTS: CatalogProject[] = [
  {
    id: "thelive",
    title: "thelive.com",
    category: "Multistream SaaS",
    tagline:
      "Transmita para YouTube, Twitch, Kick, TikTok, Instagram e Kwai ao mesmo tempo — um sinal, várias plataformas.",
    cover: "from-cyan-400/35 via-teal-500/15 to-transparent",
    url: "https://www.thelive.com.br",
    domain: "www.thelive.com.br",
    screens: [
      {
        id: "landing",
        label: "Landing",
        title: "Página de aquisição",
        description:
          "Hero com proposta clara de multistream, CTA de trial e prova social das plataformas suportadas.",
        accent: "#00F7FF",
        images: ["/catalog/thelive/landing.png"],
        stats: [
          { label: "Trial", value: "7 dias" },
          { label: "Plataformas", value: "6+" },
          { label: "Sinal", value: "1 HD" },
        ],
        rows: [
          "OBS Studio ou celular → um único envio",
          "Distribuição automática para várias redes",
          "CTA: Experimente grátis por 7 dias",
        ],
      },
      {
        id: "dashboard",
        label: "Dashboard",
        title: "Live Room / Global Control",
        description:
          "Painel ao vivo com destinos ativos, chat unificado, viewers simultâneos e alertas em tempo real.",
        accent: "#00E5FF",
        images: ["/catalog/thelive/dashboard.png"],
        stats: [
          { label: "Viewers", value: "3.902" },
          { label: "Destinos", value: "5" },
          { label: "Status", value: "LIVE" },
        ],
        rows: [
          "YouTube · Twitch · Kick com chat ativo",
          "Super Chat unificado entre plataformas",
          "Alertas: follows, subs e Super Chat",
        ],
      },
      {
        id: "accounts",
        label: "Contas",
        title: "Gerenciar Contas",
        description:
          "Conexão de plataformas via OAuth real (Google/YouTube) e configuração RTMP onde a API exige.",
        accent: "#22D3EE",
        images: ["/catalog/thelive/contas.png"],
        stats: [
          { label: "OAuth", value: "YouTube" },
          { label: "RTMP", value: "TikTok/IG" },
          { label: "Plano", value: "PRO" },
        ],
        rows: [
          "YouTube com OAuth Google",
          "Twitch conectado (alexstorm_tv)",
          "TikTok e Instagram via chave RTMP",
        ],
      },
    ],
  },
  {
    id: "pd-finance",
    title: "PD Finance",
    category: "Gestão Financeira",
    tagline:
      "Painel de gestão financeira para obras e equipes — saldo, lançamentos, medições e relatórios em um só lugar.",
    cover: "from-orange-500/30 via-amber-500/10 to-transparent",
    domain: "PD Finance · Gestão",
    // Dashboard UI is darker/sparser than landing shots — slight zoom matches thelive fill.
    thumbnailClassName: "scale-[1.22] origin-top object-[center_top]",
    screens: [
      {
        id: "dashboard",
        label: "Dashboard",
        title: "Visão Empresa",
        description:
          "Saldo da empresa, fluxo de caixa mensal, pró-labore e histórico recente de movimentações.",
        accent: "#FF6B00",
        images: ["/catalog/pd-financy/dasboard.png"],
        stats: [
          { label: "Saldo", value: "R$ 63,5k" },
          { label: "Pró-labore", value: "R$ 8,5k" },
          { label: "Fluxo", value: "Mensal" },
        ],
        rows: [
          "Transferir e pagar direto do painel",
          "Fluxo de caixa com destaque no mês atual",
          "Histórico de medições, recebimentos e retiradas",
        ],
      },
      {
        id: "financeiro",
        label: "Financeiro",
        title: "Contas a pagar e receber",
        description:
          "Lançamentos com filtros por fluxo e vencimento, quitação rápida e conciliação de obras.",
        accent: "#F97316",
        images: ["/catalog/pd-financy/financeiro.png"],
        stats: [
          { label: "A receber", value: "R$ 5,5k" },
          { label: "A pagar", value: "R$ 3,2k" },
          { label: "Recebido/mês", value: "R$ 26,5k" },
        ],
        rows: [
          "Filtros: Todos · A Receber · A Pagar",
          "Status: Pagas, a vencer e vencidas",
          "Novo lançamento e conta a pagar em um clique",
        ],
      },
      {
        id: "previsoes",
        label: "Previsões",
        title: "Previsionamento financeiro",
        description:
          "Calendário mensal com entradas e gastos previstos nos lançamentos pendentes, saldo do dia e detalhe por data.",
        accent: "#FB923C",
        images: ["/catalog/pd-financy/calendario-de-previsoes.png"],
        stats: [
          { label: "Entradas", value: "R$ 5,5k" },
          { label: "Gastos", value: "R$ 3,2k" },
          { label: "Saldo prev.", value: "R$ 2,3k" },
        ],
        rows: [
          "Visão mensal com totais de entradas e gastos",
          "Dias com lançamentos destacados no calendário",
          "Detalhe do dia: parcela, cliente e saldo",
        ],
      },
      {
        id: "projetos",
        label: "Projetos",
        title: "Projetos & Obras Ativas",
        description:
          "Obras com progresso físico, parcelas negociadas e status de execução em cards.",
        accent: "#FB923C",
        images: ["/catalog/pd-financy/projetos.png"],
        stats: [
          { label: "Obras", value: "Ativas" },
          { label: "Parcelas", value: "Negociadas" },
          { label: "Progresso", value: "Físico %" },
        ],
        rows: [
          "Busca por obra, cliente ou cidade",
          "Valor por parcela e total negociado",
          "Status: Executando · Aprovado",
        ],
      },
      {
        id: "equipe",
        label: "Equipe",
        title: "Equipe & Medições",
        description:
          "Colaboradores, fichas de fechamento de diária/produção e geração de conta a pagar.",
        accent: "#EA580C",
        images: ["/catalog/pd-financy/equipe.png"],
        stats: [
          { label: "Regime", value: "CLT / Diária" },
          { label: "Medições", value: "Por m²" },
          { label: "Vales", value: "PIX" },
        ],
        rows: [
          "Lista de colaboradores com busca",
          "Itens de medição com subtotal automático",
          "Resumo consolidado e gerar conta a pagar",
        ],
      },
      {
        id: "folha",
        label: "Folha",
        title: "Folha de fechamento",
        description:
          "Detalhamento da folha do colaborador com itens lançados, vales e valor líquido a pagar.",
        accent: "#C2410C",
        images: ["/catalog/pd-financy/folha-funcionario.png"],
        stats: [
          { label: "Produção", value: "R$ 3,3k" },
          { label: "Vales", value: "R$ 0" },
          { label: "Líquido", value: "R$ 3,3k" },
        ],
        rows: [
          "Cargo, regime e custo base da diária",
          "Itens lançados com unidade e subtotal",
          "Resumo com valor líquido a pagar",
        ],
      },
      {
        id: "relatorio",
        label: "Relatório",
        title: "Relatório financeiro",
        description:
          "Filtros por período, tipo de pagamento e classificações — despesas, receitas ou comparativo.",
        accent: "#FF6B00",
        images: [
          "/catalog/pd-financy/relatorio.png",
          "/catalog/pd-financy/relatorio-comparativo.png",
        ],
        stats: [
          { label: "Despesas", value: "R$ 45,5k" },
          { label: "Receitas", value: "R$ 82,4k" },
          { label: "Saldo", value: "R$ 36,9k" },
        ],
        rows: [
          "Atalhos de 1 a 12 meses",
          "Exportar PDF do relatório",
          "Comparativo com gráfico e insights",
        ],
      },
    ],
  },
  {
    id: "s3e-engenharia",
    title: "S3E Engenharia",
    category: "Site Institucional",
    tagline:
      "Site institucional de engenharia elétrica — projetos, subestações, quadros e eficiência energética com CTA de orçamento e WhatsApp.",
    cover: "from-blue-500/30 via-sky-500/10 to-transparent",
    domain: "s3eengenharia.com.br",
    screens: [
      {
        id: "hero",
        label: "Home",
        title: "Hero de aquisição",
        description:
          "Proposta clara de eficiência elétrica, CTAs de orçamento e WhatsApp, com hero fotográfico de campo.",
        accent: "#2563EB",
        images: ["/catalog/s3e-engenharia/secao-hero.png"],
        stats: [
          { label: "CTA", value: "Orçamento" },
          { label: "Canal", value: "WhatsApp" },
          { label: "Foco", value: "Elétrica" },
        ],
        rows: [
          "Soluções em eficiência e efetividade elétrica",
          "Projetos, quadros, subestações e manutenções",
          "Navbar com Serviços, Sobre e Contato",
        ],
      },
      {
        id: "diferenciais",
        label: "Diferenciais",
        title: "Por que escolher a S3E?",
        description:
          "Seção de autoridade com +15 anos de experiência, segurança NR e soluções personalizadas.",
        accent: "#3B82F6",
        images: ["/catalog/s3e-engenharia/what-s3e.png"],
        stats: [
          { label: "Experiência", value: "+15 anos" },
          { label: "Normas", value: "NR-10" },
          { label: "Escopo", value: "Sob medida" },
        ],
        rows: [
          "Experiência e qualidade certificada",
          "Segurança em primeiro lugar (NR-10 / NBR-5410)",
          "Compromisso e pós-venda com o cliente",
        ],
      },
      {
        id: "servicos-home",
        label: "Serviços",
        title: "Serviços especializados",
        description:
          "Grade de serviços com fotos reais — capacitores, manutenção, fotovoltaica, quadros e subestação.",
        accent: "#60A5FA",
        images: ["/catalog/s3e-engenharia/services-home.png"],
        stats: [
          { label: "Serviços", value: "8+" },
          { label: "CTA", value: "Ver todos" },
          { label: "Diferenciais", value: "4" },
        ],
        rows: [
          "Banco de capacitores e eficiência energética",
          "Quadros de comando e medição",
          "Subestação aérea até 300kVA",
        ],
      },
      {
        id: "servicos-detalhe",
        label: "Detalhe",
        title: "Subestação aérea até 300kVA",
        description:
          "Página de serviço com checklist técnico, vantagens e foto de instalação real.",
        accent: "#1D4ED8",
        images: ["/catalog/s3e-engenharia/services.png"],
        stats: [
          { label: "Potência", value: "300kVA" },
          { label: "Escopo", value: "Projeto+Obra" },
          { label: "Público", value: "R/I" },
        ],
        rows: [
          "Transformadores de 15kVA a 300kVA",
          "Proteções completas e padronização",
          "Atalhos Residencial e Industrial",
        ],
      },
      {
        id: "sobre",
        label: "Sobre",
        title: "Trajetória e institutional",
        description:
          "Números da empresa, história da S3E e pilares de excelência, segurança e inovação.",
        accent: "#38BDF8",
        images: ["/catalog/s3e-engenharia/statics-about-section.png"],
        stats: [
          { label: "Projetos", value: "+2000" },
          { label: "Clientes", value: "+1200" },
          { label: "Anos", value: "+12" },
        ],
        rows: [
          "Trajetória em números com ícones",
          "Sobre a S3E com foto e checklist",
          "CTA: Conheça nossa história",
        ],
      },
    ],
  },
  {
    id: "pd-gesso-drywall",
    title: "PD Gesso Drywall",
    category: "Site Institucional",
    tagline:
      "Site institucional dark/orange para empreiteira de drywall e steel frame — grandes obras, portfólio e orçamento via WhatsApp.",
    cover: "from-orange-500/30 via-amber-400/10 to-transparent",
    domain: "pdgessodrywall.com.br",
    screens: [
      {
        id: "hero",
        label: "Home",
        title: "Hero institucional",
        description:
          "Proposta para grandes obras e empreendimentos, com CTAs de orçamento e soluções.",
        accent: "#FF9F00",
        images: ["/catalog/pd-gesso-drywall/hero-section.png"],
        stats: [
          { label: "Foco", value: "Grandes obras" },
          { label: "CTA", value: "WhatsApp" },
          { label: "Estilo", value: "Dark" },
        ],
        rows: [
          "Soluções em drywall para empreendimentos",
          "Badge: prediais · residenciais · grandes obras",
          "Navbar com Portfólio, Serviços e Orçamento",
        ],
      },
      {
        id: "sobre",
        label: "Sobre",
        title: "Empresa e números",
        description:
          "Prova social com métricas, base em Itajaí/SC e CTAs para conhecer a empresa ou falar com especialista.",
        accent: "#F59E0B",
        images: ["/catalog/pd-gesso-drywall/about-section.png"],
        stats: [
          { label: "Anos", value: "10+" },
          { label: "Obras", value: "500+" },
          { label: "Google", value: "4.9" },
        ],
        rows: [
          "Empreiteira de drywall e steel frame",
          "Atendimento SC + Brasil",
          "Equipe própria e acabamento premium",
        ],
      },
      {
        id: "solucoes",
        label: "Soluções",
        title: "Soluções em drywall e steel frame",
        description:
          "Carrossel de soluções: compartimentação corporativa, logística e forros em grandes áreas.",
        accent: "#FB923C",
        images: ["/catalog/pd-gesso-drywall/solutions-section.png"],
        stats: [
          { label: "Cards", value: "Carousel" },
          { label: "CTA", value: "Orçamento" },
          { label: "Escopo", value: "Premium" },
        ],
        rows: [
          "Compartimentação corporativa",
          "Centros logísticos e distribuição",
          "Forro acartonado em grandes áreas",
        ],
      },
      {
        id: "portfolio",
        label: "Portfólio",
        title: "Portfólio de obras",
        description:
          "Galeria filtrável de obras em drywall e steel frame — prediais, residenciais e acabamento.",
        accent: "#EA580C",
        images: ["/catalog/pd-gesso-drywall/portfolio-page.png"],
        stats: [
          { label: "Filtros", value: "5" },
          { label: "Tipo", value: "Galeria" },
          { label: "CTA", value: "Orçamento" },
        ],
        rows: [
          "Filtros: Grandes obras · Forros · Residencial",
          "Registro visual de empreendimentos",
          "Hero com CTA Solicitar Orçamento",
        ],
      },
    ],
  },
  {
    id: "api-gateway",
    title: "Vertex Gateway",
    category: "APIs & Integrações",
    tagline: "Gateway unificado com observabilidade total.",
    cover: "from-amber-400/25 via-orange-500/10 to-transparent",
    screens: [
      {
        id: "traffic",
        label: "Traffic",
        title: "Tráfego de APIs",
        description: "Latência, erros e throughput por rota.",
        accent: "#fbbf24",
        stats: [
          { label: "RPS", value: "3.2k" },
          { label: "p95", value: "118ms" },
          { label: "Erros", value: "0.12%" },
        ],
        rows: ["/v1/payments OK", "/v1/users 429 rate-limit", "Deploy canary 20%"],
      },
      {
        id: "connectors",
        label: "Connectors",
        title: "Conectores",
        description: "ERP, CRM e gateways de pagamento.",
        accent: "#fb923c",
        stats: [
          { label: "Ativos", value: "26" },
          { label: "Filas", value: "8" },
          { label: "Retries", value: "14" },
        ],
        rows: ["SAP sync", "Salesforce push", "Pagar.me webhook"],
      },
      {
        id: "security",
        label: "Security",
        title: "Segurança & tokens",
        description: "Scopes, rotação e auditoria.",
        accent: "#f59e0b",
        stats: [
          { label: "Tokens", value: "412" },
          { label: "Scopes", value: "63" },
          { label: "Audit", value: "ON" },
        ],
        rows: ["Key rotacionada", "IP allowlist atualizada", "OAuth client novo"],
      },
    ],
  },
  {
    id: "retail-os",
    title: "Lumen Retail OS",
    category: "Varejo Digital",
    tagline: "Catálogo, PDV e omnichannel sincronizados.",
    cover: "from-rose-400/25 via-pink-500/10 to-transparent",
    screens: [
      {
        id: "catalog",
        label: "Catálogo",
        title: "Catálogo omnichannel",
        description: "Produtos, preços e disponibilidade.",
        accent: "#fb7185",
        stats: [
          { label: "SKUs", value: "9.4k" },
          { label: "Canais", value: "7" },
          { label: "Sync", value: "Live" },
        ],
        rows: ["Preço promo flash", "Stock marketplace", "Coleção inverno"],
      },
      {
        id: "pos",
        label: "PDV",
        title: "Ponto de venda",
        description: "Checkout rápido com antifraude.",
        accent: "#f43f5e",
        stats: [
          { label: "Vendas", value: "1.1k" },
          { label: "Ticket", value: "R$ 216" },
          { label: "Tempo médio", value: "41s" },
        ],
        rows: ["Loja Centro", "PIX confirmado", "Troca #221"],
      },
      {
        id: "crm",
        label: "CRM",
        title: "Clientes & loyalty",
        description: "Segmentos, campanhas e retenção.",
        accent: "#e11d48",
        stats: [
          { label: "Base", value: "88k" },
          { label: "NPS", value: "72" },
          { label: "Ativos", value: "61%" },
        ],
        rows: ["Campanha VIP", "Cupom aniversário", "Segmento churn risk"],
      },
    ],
  },
  {
    id: "clinic-flow",
    title: "Orbit Clinic",
    category: "Healthtech",
    tagline: "Agendamentos, prontuário e faturamento clínico.",
    cover: "from-blue-400/25 via-indigo-500/10 to-transparent",
    screens: [
      {
        id: "agenda",
        label: "Agenda",
        title: "Agenda inteligente",
        description: "Slots, confirmações e no-show.",
        accent: "#60a5fa",
        stats: [
          { label: "Hoje", value: "64" },
          { label: "Confirmados", value: "91%" },
          { label: "No-show", value: "3%" },
        ],
        rows: ["Dr. Lima 14:00", "WhatsApp confirmado", "Encaixe urgente"],
      },
      {
        id: "records",
        label: "Prontuário",
        title: "Prontuário eletrônico",
        description: "Histórico seguro e compartilhado.",
        accent: "#818cf8",
        stats: [
          { label: "Pacientes", value: "12.6k" },
          { label: "Anexos", value: "48k" },
          { label: "LGPD", value: "OK" },
        ],
        rows: ["Laudo anexado", "Prescrição digital", "Encaminhamento"],
      },
      {
        id: "billing-clinic",
        label: "Faturamento",
        title: "Faturamento clínico",
        description: "Convênios, glosas e repasses.",
        accent: "#6366f1",
        stats: [
          { label: "Guias", value: "220" },
          { label: "Glosas", value: "2.1%" },
          { label: "Repasse", value: "R$ 96k" },
        ],
        rows: ["Lote Unimed", "NF-e emitida", "Auditoria interna"],
      },
    ],
  },
];
