export type CatalogScreen = {
  id: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  stats: { label: string; value: string }[];
  rows: string[];
};

export type CatalogProject = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  cover: string;
  screens: CatalogScreen[];
};

export const CATALOG_PROJECTS: CatalogProject[] = [
  {
    id: "finance-saas",
    title: "Aurora Finance",
    category: "SaaS Financeiro",
    tagline: "Dashboard de billing, cobranças e métricas em tempo real.",
    cover: "from-cyan-500/30 via-sky-500/10 to-transparent",
    screens: [
      {
        id: "overview",
        label: "Overview",
        title: "Visão geral financeira",
        description: "Receita, churn e MRR atualizados ao vivo.",
        accent: "#00EFFC",
        stats: [
          { label: "MRR", value: "R$ 184k" },
          { label: "Churn", value: "1.8%" },
          { label: "Clientes", value: "1.242" },
        ],
        rows: ["Assinatura Pro renovada", "Invoice #492 paga", "Alerta de inadimplência"],
      },
      {
        id: "billing",
        label: "Billing",
        title: "Gestão de cobranças",
        description: "Faturas, planos e conciliação automática.",
        accent: "#38bdf8",
        stats: [
          { label: "Em aberto", value: "37" },
          { label: "Pagos hoje", value: "128" },
          { label: "Ticket médio", value: "R$ 890" },
        ],
        rows: ["Plano Enterprise", "Cartão •••• 4421", "Webhook Stripe OK"],
      },
      {
        id: "analytics",
        label: "Analytics",
        title: "Analytics avançado",
        description: "Cohorts, funis e previsão de receita.",
        accent: "#22d3ee",
        stats: [
          { label: "Conversão", value: "4.6%" },
          { label: "LTV", value: "R$ 12.4k" },
          { label: "Forecast", value: "+18%" },
        ],
        rows: ["Cohort Jan/26", "Funil checkout", "Meta Q3 atingida"],
      },
    ],
  },
  {
    id: "ops-hub",
    title: "Nexus Ops",
    category: "Sistema Empresarial",
    tagline: "Operações, estoque e times em um só painel.",
    cover: "from-emerald-400/25 via-teal-500/10 to-transparent",
    screens: [
      {
        id: "ops",
        label: "Operações",
        title: "Central de operações",
        description: "SLAs, filas e status de entregas.",
        accent: "#34d399",
        stats: [
          { label: "Pedidos", value: "862" },
          { label: "SLA", value: "98.2%" },
          { label: "Equipes", value: "14" },
        ],
        rows: ["Rota SP-04 despachada", "Estoque crítico: SKU-221", "Turno noite ativo"],
      },
      {
        id: "inventory",
        label: "Estoque",
        title: "Inventário inteligente",
        description: "Previsão de reposição e alertas.",
        accent: "#2dd4bf",
        stats: [
          { label: "SKUs", value: "4.180" },
          { label: "Rupturas", value: "6" },
          { label: "Cobertura", value: "21 dias" },
        ],
        rows: ["Recebimento CD Sul", "Transferência #88", "Inventário ciclo B"],
      },
      {
        id: "team",
        label: "Times",
        title: "Gestão de times",
        description: "Produtividade e distribuição de tarefas.",
        accent: "#10b981",
        stats: [
          { label: "Ativos", value: "96" },
          { label: "Tasks", value: "312" },
          { label: "Concluídas", value: "78%" },
        ],
        rows: ["Sprint 24 em andamento", "Onboarding novo operador", "KPI logística ↑"],
      },
    ],
  },
  {
    id: "ai-desk",
    title: "Pulse AI Desk",
    category: "Inteligência Artificial",
    tagline: "Assistente corporativo com RAG e automações.",
    cover: "from-violet-400/25 via-fuchsia-500/10 to-transparent",
    screens: [
      {
        id: "chat",
        label: "Chat",
        title: "Assistente interno",
        description: "Respostas com contexto privado da empresa.",
        accent: "#a78bfa",
        stats: [
          { label: "Sessões", value: "2.4k" },
          { label: "Latência", value: "820ms" },
          { label: "CSAT", value: "4.9" },
        ],
        rows: ["Base knowledge sync", "Prompt: política RH", "Escalou para humano"],
      },
      {
        id: "knowledge",
        label: "Knowledge",
        title: "Base de conhecimento",
        description: "Documentos indexados e fontes auditáveis.",
        accent: "#c084fc",
        stats: [
          { label: "Docs", value: "1.180" },
          { label: "Fontes", value: "42" },
          { label: "Freshness", value: "99%" },
        ],
        rows: ["PDF contratos v3", "Notion wiki sync", "Drive pasta Legal"],
      },
      {
        id: "automations",
        label: "Automações",
        title: "Fluxos inteligentes",
        description: "Triggers, ações e monitoramento.",
        accent: "#e879f9",
        stats: [
          { label: "Flows", value: "58" },
          { label: "Runs/dia", value: "940" },
          { label: "Falhas", value: "0.4%" },
        ],
        rows: ["Ticket → Slack", "Lead → CRM", "Resumo diário e-mail"],
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
