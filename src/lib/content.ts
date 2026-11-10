export const NAV_LINKS = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#cases", label: "Cases" },
  { href: "#governanca", label: "Governança" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#sobre", label: "Sobre" },
] as const;

export const PRACTICE_AREAS = [
  {
    code: "01",
    title: "Sistemas Corporativos & Plataformas Web",
    summary:
      "Softwares desenhados especificamente para a regra de negócio da sua empresa, substituindo planilhas críticas e sistemas engessados.",
    deliverables: [
      "ERPs internos, gestão financeira, obras, equipes e medições",
      "Plataformas SaaS multiusuário com autenticação e controle de acesso",
      "Portais administrativos, painéis executivos e relatórios em PDF",
    ],
  },
  {
    code: "02",
    title: "APIs, Integrações & Arquitetura de Dados",
    summary:
      "Conectamos seus sistemas, bancos de dados e gateways externos com contratos bem definidos, observabilidade e tolerância a falhas.",
    deliverables: [
      "APIs REST e serviços backend documentados e versionados",
      "Integrações OAuth, pagamentos, webhooks e pipelines de dados",
      "Modelagem relacional segura, auditoria e migração de legados",
    ],
  },
  {
    code: "03",
    title: "IA Aplicada & Automação Operacional",
    summary:
      "Implementação pragmática de inteligência artificial e automações para reduzir gargalos operacionais com controle e rastreabilidade.",
    deliverables: [
      "Assistentes internos conectados à base privada da empresa (RAG)",
      "Servidores MCP e integração segura de ferramentas corporativas",
      "Automação de rotinas financeiras, atendimento e fluxos internos",
    ],
  },
  {
    code: "04",
    title: "Consultoria Técnica & Presença Institucional",
    summary:
      "Apoio estratégico para decisões de tecnologia, gestão de entregas e construção de canais digitais que posicionam marcas B2B com credibilidade.",
    deliverables: [
      "Diagnóstico técnico, roadmap evolutivo e revisão arquitetural",
      "Gestão de escopo, marcos de entrega e ambientes de homologação",
      "Sites institucionais de alta performance focados em autoridade B2B",
    ],
  },
] as const;

export const DELIVERY_STAGES = [
  {
    step: "01",
    title: "Diagnóstico & Escopo Documentado",
    description:
      "Mapeamos processos, riscos, integrações e regras de negócio antes de escrever código. Você aprova escopo, marcos e orçamento com clareza.",
    artifact: "Entregável: Especificação funcional e cronograma de marcos",
  },
  {
    step: "02",
    title: "Arquitetura, Dados & Segurança",
    description:
      "Definimos modelagem de dados, autenticação, papéis de permissão e infraestrutura alinhada à LGPD e à capacidade de crescimento da operação.",
    artifact: "Entregável: Desenho técnico e contrato de dados",
  },
  {
    step: "03",
    title: "Engenharia & Homologação",
    description:
      "Construção em ciclos incrementais com repositório versionado, revisões técnicas e ambiente de validação antes de ir para produção.",
    artifact: "Entregável: Sprints auditáveis e ambiente de homologação",
  },
  {
    step: "04",
    title: "Produção, Documentação & Suporte",
    description:
      "Implantação assistida, transferência de conhecimento e canal técnico dedicado para evolução contínua e sustentação operacional.",
    artifact: "Entregável: Código documentado + canal suporte@2jtech.net",
  },
] as const;

export const GOVERNANCE_COMMITMENTS = [
  {
    title: "Propriedade Intelectual Integral",
    description:
      "Todo código-fonte, repositório e documentação produzidos sob medida pertencem integralmente à sua empresa, sem aprisionamento proprietário.",
  },
  {
    title: "Conformidade Contratual e Fiscal",
    description:
      "Operação formalizada em pessoa jurídica, com escopo definido em contrato, comunicação rastreável e emissão fiscal regular.",
  },
  {
    title: "Privacidade e Segurança por Design",
    description:
      "Separação de ambientes, validação estrita de entradas, proteção de credenciais e tratamento de dados orientado às diretrizes da LGPD.",
  },
  {
    title: "Atendimento Direto com a Engenharia",
    description:
      "Sem camadas comerciais que desconectam promessa e entrega: alinhamento direto com quem projeta e desenvolve o software.",
  },
] as const;

export type TechId =
  | "react"
  | "nextjs"
  | "typescript"
  | "tailwindcss"
  | "nodejs"
  | "nestjs"
  | "python"
  | "golang"
  | "postgresql"
  | "prisma"
  | "supabase"
  | "mongodb"
  | "docker"
  | "aws"
  | "openai"
  | "claude";

export type TechItem = {
  id: TechId;
  name: string;
  role: string;
};

export const TECH_LAYERS: {
  layer: string;
  description: string;
  items: TechItem[];
}[] = [
  {
    layer: "Aplicação & Interface",
    description: "Interfaces responsivas, acessíveis e de carregamento rápido.",
    items: [
      { id: "react", name: "React", role: "Interfaces ricas" },
      { id: "nextjs", name: "Next.js", role: "SSR, App Router & SEO" },
      { id: "typescript", name: "TypeScript", role: "Tipagem estrita" },
      { id: "tailwindcss", name: "Tailwind CSS", role: "Design system consistente" },
    ],
  },
  {
    layer: "Backend & Serviços",
    description: "APIs resilientes, regras de negócio e alta concorrência.",
    items: [
      { id: "nodejs", name: "Node.js", role: "Runtime assíncrono" },
      { id: "nestjs", name: "NestJS", role: "Arquitetura modular" },
      { id: "python", name: "Python", role: "Automação & dados" },
      { id: "golang", name: "Go", role: "Serviços de alta performance" },
    ],
  },
  {
    layer: "Dados & Persistência",
    description: "Integridade transacional, auditoria e consultas eficientes.",
    items: [
      { id: "postgresql", name: "PostgreSQL", role: "Banco relacional principal" },
      { id: "prisma", name: "Prisma", role: "Modelagem e migrations" },
      { id: "supabase", name: "Supabase", role: "Auth, Postgres & Storage" },
      { id: "mongodb", name: "MongoDB", role: "Dados semiestruturados" },
    ],
  },
  {
    layer: "Cloud, Containers & IA",
    description: "Implantação controlada e integração segura de modelos.",
    items: [
      { id: "docker", name: "Docker", role: "Padronização de ambientes" },
      { id: "aws", name: "AWS", role: "Infraestrutura em nuvem" },
      { id: "openai", name: "OpenAI", role: "Modelos & automação" },
      { id: "claude", name: "Claude", role: "Raciocínio e agentes MCP" },
    ],
  },
];
