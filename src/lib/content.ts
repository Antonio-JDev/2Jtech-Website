export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#tecnologias", label: "Tecnologias" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
] as const;

export const BENEFITS = [
  "Desenvolvimento Sob Medida",
  "Inteligência Artificial",
  "APIs & Integrações",
  "Consultoria Tecnológica",
] as const;

export const HERO_STATS = [
  { value: "+30", label: "Projetos" },
  { value: "100%", label: "Código Próprio" },
  { value: "24/7", label: "Suporte Especializado" },
  { value: "∞", label: "Arquitetura Escalável" },
] as const;

export const CLIENTS = [
  "Nexus",
  "Aurora",
  "Vertex",
  "Pulse",
  "Orbit",
  "Lumen",
] as const;

export const SERVICES = [
  {
    title: "Desenvolvimento Web",
    description:
      "Aplicações web modernas, rápidas e preparadas para escalar com o seu negócio.",
  },
  {
    title: "APIs",
    description:
      "APIs robustas, documentadas e seguras para integrar sistemas e produtos.",
  },
  {
    title: "Sistemas Empresariais",
    description:
      "ERPs, CRMs e plataformas internas sob medida para a operação da sua empresa.",
  },
  {
    title: "Landing Pages",
    description:
      "Páginas de alta conversão com visual premium e performance de ponta.",
  },
  {
    title: "Integrações",
    description:
      "Conectamos ferramentas, bancos e serviços em fluxos estáveis e monitorados.",
  },
  {
    title: "MCP Servers",
    description:
      "Infraestrutura para agentes e ferramentas de IA com protocolos modernos.",
  },
  {
    title: "Inteligência Artificial",
    description:
      "Soluções com GPT, Claude e modelos customizados aplicados ao seu contexto.",
  },
  {
    title: "Automações",
    description:
      "Processos repetitivos transformados em rotinas inteligentes e confiáveis.",
  },
  {
    title: "Consultoria",
    description:
      "Diagnóstico técnico, arquitetura e roadmap para decisões com confiança.",
  },
  {
    title: "Gestão de Projetos",
    description:
      "Entrega organizada, comunicação clara e foco em resultado de negócio.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Descoberta",
    description: "Entendemos o problema, o contexto e os objetivos do negócio.",
  },
  {
    step: "02",
    title: "Arquitetura",
    description: "Definimos stack, fluxos e estrutura técnica para escalar.",
  },
  {
    step: "03",
    title: "Desenvolvimento",
    description: "Construímos com qualidade, testes e entregas incrementais.",
  },
  {
    step: "04",
    title: "Evolução",
    description: "Monitoramos, otimizamos e evoluímos o produto continuamente.",
  },
] as const;

export const TECHNOLOGIES = [
  { id: "react", name: "React" },
  { id: "nextjs", name: "Next.js" },
  { id: "typescript", name: "TypeScript" },
  { id: "nodejs", name: "Node.js" },
  { id: "express", name: "Express" },
  { id: "nestjs", name: "NestJS" },
  { id: "golang", name: "Go" },
  { id: "python", name: "Python" },
  { id: "svelte", name: "Svelte" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "tailwindcss", name: "Tailwind CSS" },
  { id: "vite", name: "Vite" },
  { id: "webpack", name: "Webpack" },
  { id: "vitest", name: "Vitest" },
  { id: "jest", name: "Jest" },
  { id: "zustand", name: "Zustand" },
  { id: "yaml", name: "YAML" },
  { id: "graphql", name: "GraphQL" },
  { id: "trpc", name: "tRPC" },
  { id: "grpc", name: "gRPC" },
  { id: "swagger", name: "Swagger" },
  { id: "http", name: "HTTP" },
  { id: "http2", name: "HTTP/2" },
  { id: "oauth", name: "OAuth" },
  { id: "oauth2", name: "OAuth 2" },
  { id: "rtmp", name: "RTMP" },
  { id: "mcp", name: "MCP" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "mongodb", name: "MongoDB" },
  { id: "mysql", name: "MySQL" },
  { id: "prisma", name: "Prisma" },
  { id: "supabase", name: "Supabase" },
  { id: "pandas", name: "Pandas" },
  { id: "docker", name: "Docker" },
  { id: "portainer", name: "Portainer" },
  { id: "nginx", name: "Nginx" },
  { id: "traefik", name: "Traefik" },
  { id: "linux", name: "Linux" },
  { id: "npm", name: "npm" },
  { id: "pnpm", name: "pnpm" },
  { id: "github", name: "GitHub" },
  { id: "vercel", name: "Vercel" },
  { id: "netlify", name: "Netlify" },
  { id: "aws", name: "AWS" },
  { id: "azure", name: "Azure" },
  { id: "cloudflare", name: "Cloudflare" },
  { id: "openai", name: "OpenAI" },
  { id: "claude", name: "Claude" },
  { id: "solidity", name: "Solidity" },
  { id: "clean-architecture", name: "Clean Architecture" },
  { id: "trello", name: "Trello" },
  { id: "jira", name: "Jira" },
  { id: "notion", name: "Notion" },
] as const;

export type Technology = (typeof TECHNOLOGIES)[number];

export const PROJECTS = [
  {
    title: "Plataforma SaaS Financeira",
    category: "Web App",
    description:
      "Dashboard completo com autenticação, billing e métricas em tempo real.",
  },
  {
    title: "API de Integrações",
    category: "Backend",
    description:
      "Gateway unificado conectando ERPs, CRMs e serviços de pagamento.",
  },
  {
    title: "Assistente com IA",
    category: "Inteligência Artificial",
    description:
      "Chat corporativo com contexto privado, RAG e automações internas.",
  },
] as const;

export const DIFFERENTIALS = [
  {
    title: "Código próprio",
    description: "Sem dependência de templates frágeis. Arquitetura pensada para o longo prazo.",
  },
  {
    title: "Design premium",
    description: "Interfaces sofisticadas que comunicam confiança e autoridade técnica.",
  },
  {
    title: "Entrega consultiva",
    description: "Mais do que código: decisões estratégicas alinhadas ao negócio.",
  },
  {
    title: "Escalabilidade real",
    description: "Sistemas preparados para crescer em usuários, dados e complexidade.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "A 2J Tech elevou nosso produto a outro patamar. Qualidade técnica e comunicação impecáveis.",
    author: "Marina Costa",
    role: "CEO, Aurora Labs",
  },
  {
    quote:
      "Entregaram uma API sólida, documentada e pronta para escalar. Parceria de verdade.",
    author: "Rafael Mendes",
    role: "CTO, Vertex Systems",
  },
  {
    quote:
      "Do briefing à produção, o processo foi transparente e o resultado superou expectativas.",
    author: "Camila Duarte",
    role: "Head de Produto, Pulse Digital",
  },
] as const;
