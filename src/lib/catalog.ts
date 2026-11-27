export type CatalogScreen = {
  id: string;
  label: string;
  title: string;
  description: string;
  accent: string;
  stats: { label: string; value: string }[];
  rows: string[];
  images?: string[];
};

export type CatalogProject = {
  id: string;
  title: string;
  category: string;
  sector: string;
  tagline: string;
  challenge: string;
  solution: string;
  stack: string[];
  screens: CatalogScreen[];
  url?: string;
  domain?: string;
  thumbnailClassName?: string;
};

export function getScreenImages(screen: CatalogScreen): string[] {
  return screen.images ?? [];
}

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
    id: "pd-finance",
    title: "PD Finance",
    category: "Sistema Corporativo",
    sector: "Construção Civil & Gestão",
    tagline:
      "Plataforma de gestão financeira para obras e equipes — fluxo de caixa, medições por m², folha e relatórios comparativos.",
    challenge:
      "Centralizar o controle financeiro de múltiplas obras simultâneas, fechamentos de diária/produção por colaborador e previsões de caixa antes dispersos em controles manuais.",
    solution:
      "Desenvolvimento de sistema web sob medida com visão consolidada da empresa, contas a pagar e receber, calendário de provisionamento, gestão de equipes/medições e exportação de relatórios em PDF.",
    stack: ["Plataforma Web", "Gestão Financeira", "Medições & Folha", "Relatórios PDF"],
    domain: "PD Finance · Sistema Interno",
    thumbnailClassName: "scale-[1.12] origin-top object-[center_top]",
    screens: [
      {
        id: "dashboard",
        label: "Visão Empresa",
        title: "Painel executivo e fluxo de caixa",
        description:
          "Saldo consolidado, movimentação mensal, pró-labore e histórico de recebimentos e retiradas por obra.",
        accent: "#22D3EE",
        images: ["/catalog/pd-financy/dasboard.png"],
        stats: [
          { label: "Módulo", value: "Visão Caixa" },
          { label: "Escopo", value: "Multiobras" },
          { label: "Visão", value: "Mensal" },
        ],
        rows: [
          "Consolidado financeiro com fluxo de caixa por competência",
          "Acompanhamento de pró-labore e movimentações recentes",
          "Ações rápidas de pagamento e transferência",
        ],
      },
      {
        id: "financeiro",
        label: "Financeiro",
        title: "Contas a pagar e a receber",
        description:
          "Lançamentos filtrados por vencimento e situação, conciliação por obra e quitação ágil.",
        accent: "#38BDF8",
        images: ["/catalog/pd-financy/financeiro.png"],
        stats: [
          { label: "Filtros", value: "Fluxo / Data" },
          { label: "Status", value: "Baixa rápida" },
          { label: "Vínculo", value: "Por obra" },
        ],
        rows: [
          "Separação clara entre títulos a receber, a pagar e quitados",
          "Controle de vencimentos e alertas de pendências",
          "Registro de lançamentos vinculado a centros de custo",
        ],
      },
      {
        id: "projetos",
        label: "Obras",
        title: "Projetos e obras ativas",
        description:
          "Acompanhamento de contratos, parcelas negociadas e evolução física de cada obra.",
        accent: "#22D3EE",
        images: ["/catalog/pd-financy/projetos.png"],
        stats: [
          { label: "Contratos", value: "Rastreáveis" },
          { label: "Avanço", value: "Físico %" },
          { label: "Busca", value: "Obra / Cidade" },
        ],
        rows: [
          "Filtro por obra, cliente ou cidade atendida",
          "Controle de valor negociado e andamento das parcelas",
          "Indicadores de status operacional por projeto",
        ],
      },
      {
        id: "equipe",
        label: "Equipe",
        title: "Equipe e medições em campo",
        description:
          "Cadastro de colaboradores, fechamento por diária ou produção em m² e integração com contas a pagar.",
        accent: "#22D3EE",
        images: ["/catalog/pd-financy/equipe.png"],
        stats: [
          { label: "Regimes", value: "CLT / Diária" },
          { label: "Medição", value: "Por m²" },
          { label: "Geração", value: "Automática" },
        ],
        rows: [
          "Fichas de fechamento com subtotal automático por item medido",
          "Controle de vales e adiantamentos",
          "Conversão direta do fechamento em conta a pagar",
        ],
      },
      {
        id: "relatorio",
        label: "Relatórios",
        title: "Relatórios financeiros e comparativos",
        description:
          "Análise de receitas, despesas e resultado por período, forma de pagamento e categoria com exportação em PDF.",
        accent: "#22D3EE",
        images: ["/catalog/pd-financy/relatorio-comparativo.png"],
        stats: [
          { label: "Períodos", value: "1 a 12 meses" },
          { label: "Exportação", value: "PDF" },
          { label: "Análise", value: "Comparativa" },
        ],
        rows: [
          "Filtros avançados por classificação e método de pagamento",
          "Comparativo visual entre períodos e categorias",
          "Exportação direta em PDF para prestação de contas",
        ],
      },
      {
        id: "acesso",
        label: "Acesso",
        title: "Acesso restrito à equipe",
        description:
          "Login próprio com a identidade da PD Gesso Drywall, recuperação de senha e alternância de tema claro/escuro.",
        accent: "#38BDF8",
        images: ["/catalog/pd-financy/pd-login.png"],
        stats: [
          { label: "Acesso", value: "Autenticado" },
          { label: "Tema", value: "Claro / Escuro" },
          { label: "Marca", value: "Do cliente" },
        ],
        rows: [
          "Autenticação por e-mail e senha para a equipe interna",
          "Fluxo de recuperação de senha",
          "Interface com a identidade visual da empresa",
        ],
      },
    ],
  },
  {
    id: "thelive",
    title: "thelive.com",
    category: "Plataforma SaaS",
    sector: "Mídia & Transmissão Ao Vivo",
    tagline:
      "Plataforma SaaS de multistream para distribuir uma transmissão única simultaneamente para múltiplas redes sociais.",
    challenge:
      "Permitir que criadores e estúdios enviem apenas um sinal de vídeo e gerenciem destinos, autenticações OAuth/RTMP, chat e alertas em uma sala única.",
    solution:
      "Arquitetura web com autenticação OAuth oficial (Google/YouTube), gestão de chaves RTMP, painel de controle ao vivo e agregação de eventos em tempo real.",
    stack: ["SaaS Multi-destino", "OAuth 2.0", "RTMP", "Painel Tempo Real"],
    url: "https://www.thelive.com.br",
    domain: "www.thelive.com.br",
    screens: [
      {
        id: "landing",
        label: "Aquisição",
        title: "Página de aquisição e posicionamento",
        description:
          "Apresentação clara da proposta de multistream, plataformas suportadas e fluxo de entrada para teste.",
        accent: "#22D3EE",
        images: ["/catalog/thelive/landing.png"],
        stats: [
          { label: "Entrada", value: "1 sinal HD" },
          { label: "Canais", value: "6+ redes" },
          { label: "Modelo", value: "SaaS" },
        ],
        rows: [
          "Integração direta a partir de OBS Studio ou dispositivo móvel",
          "Distribuição simultânea para YouTube, Twitch, Kick, TikTok, Instagram e Kwai",
          "Jornada de onboarding objetiva para novos assinantes",
        ],
      },
      {
        id: "dashboard",
        label: "Live Room",
        title: "Painel de controle ao vivo",
        description:
          "Monitoramento centralizado de destinos ativos, audiência simultânea, chat unificado e alertas.",
        accent: "#38BDF8",
        images: ["/catalog/thelive/dashboard.png"],
        stats: [
          { label: "Operação", value: "Ao vivo" },
          { label: "Chat", value: "Unificado" },
          { label: "Eventos", value: "Tempo real" },
        ],
        rows: [
          "Consolidação de interações e mensagens de múltiplas plataformas",
          "Visão de status de transmissão por destino conectado",
          "Notificações unificadas de eventos da audiência",
        ],
      },
      {
        id: "accounts",
        label: "Integrações",
        title: "Gestão de contas OAuth & RTMP",
        description:
          "Conexão segura com provedores via OAuth e configuração assistida via chaves RTMP.",
        accent: "#22D3EE",
        images: ["/catalog/thelive/contas.png"],
        stats: [
          { label: "Auth", value: "OAuth Google" },
          { label: "Stream", value: "RTMP" },
          { label: "Gestão", value: "Centralizada" },
        ],
        rows: [
          "Fluxo OAuth integrado para YouTube e plataformas compatíveis",
          "Suporte a chaves RTMP dedicadas por canal",
          "Controle de assinatura e limites por plano",
        ],
      },
    ],
  },
  {
    id: "s3e-engenharia",
    title: "S3E Engenharia",
    category: "Presença Corporativa B2B",
    sector: "Engenharia Elétrica",
    tagline:
      "Portal institucional para empresa de engenharia elétrica com foco em credibilidade técnica, normas regulatórias e geração de orçamentos.",
    challenge:
      "Traduzir mais de uma década de atuação em subestações, quadros elétricos e conformidade NR-10 em uma presença digital que gere confiança para clientes industriais.",
    solution:
      "Estruturação de portal institucional com páginas detalhadas por serviço técnico, destaque de certificações/normas e jornada direta para solicitação de proposta.",
    stack: ["Next.js", "SEO Técnico", "Arquitetura de Conteúdo", "Conversão B2B"],
    domain: "s3eengenharia.com.br",
    screens: [
      {
        id: "hero",
        label: "Home",
        title: "Posicionamento principal",
        description:
          "Comunicação direta de eficiência elétrica para indústria e comércio, com canais claros de orçamento.",
        accent: "#38BDF8",
        images: ["/catalog/s3e-engenharia/secao-hero.png"],
        stats: [
          { label: "Foco", value: "Industrial/Com." },
          { label: "Conversão", value: "Orçamento" },
          { label: "Canal", value: "WhatsApp" },
        ],
        rows: [
          "Apresentação objetiva de projetos, quadros, subestações e manutenção",
          "Navegação estruturada entre serviços técnicos e histórico da empresa",
          "CTAs diretos para contato comercial",
        ],
      },
      {
        id: "diferenciais",
        label: "Autoridade",
        title: "Pilares técnicos e conformidade",
        description:
          "Destaque para experiência acumulada, normas NR-10 / NBR-5410 e atendimento pós-obra.",
        accent: "#38BDF8",
        images: ["/catalog/s3e-engenharia/what-s3e.png"],
        stats: [
          { label: "Normas", value: "NR-10 / NBR" },
          { label: "Escopo", value: "Sob medida" },
          { label: "Pós-venda", value: "Dedicado" },
        ],
        rows: [
          "Reforço de segurança operacional e conformidade normativa",
          "Comunicação clara para tomada de decisão técnica",
          "Alinhamento visual com a identidade de engenharia",
        ],
      },
      {
        id: "servicos-home",
        label: "Catálogo Técnico",
        title: "Portfólio de serviços elétricos",
        description:
          "Organização visual de frentes como banco de capacitores, fotovoltaica, quadros e subestações.",
        accent: "#22D3EE",
        images: ["/catalog/s3e-engenharia/services-home.png"],
        stats: [
          { label: "Frentes", value: "8+ serviços" },
          { label: "Registro", value: "Fotos reais" },
          { label: "Navegação", value: "Modular" },
        ],
        rows: [
          "Estrutura escaneável para serviços de média e baixa tensão",
          "Material visual com obras e instalações reais",
          "Direcionamento para páginas de detalhamento técnico",
        ],
      },
      {
        id: "servicos-detalhe",
        label: "Detalhamento",
        title: "Página técnica — Subestação até 300kVA",
        description:
          "Detalhamento de especificações, proteções e escopo entre projeto e execução.",
        accent: "#38BDF8",
        images: ["/catalog/s3e-engenharia/services.png"],
        stats: [
          { label: "Capacidade", value: "Até 300kVA" },
          { label: "Entrega", value: "Projeto + Obra" },
          { label: "Segmento", value: "B2B / Resid." },
        ],
        rows: [
          "Checklist técnico de transformadores e proteções",
          "Segmentação clara entre aplicações residenciais e industriais",
          "Conversão contextualizada por tipo de serviço",
        ],
      },
      {
        id: "sobre",
        label: "Institucional",
        title: "Trajetória e números da empresa",
        description:
          "Apresentação da história, histórico de entregas e princípios de segurança e qualidade.",
        accent: "#22D3EE",
        images: ["/catalog/s3e-engenharia/statics-about-section.png"],
        stats: [
          { label: "Trajetória", value: "Consolidada" },
          { label: "Prova", value: "Histórico real" },
          { label: "Foco", value: "Credibilidade" },
        ],
        rows: [
          "Consolidação de indicadores históricos da empresa",
          "Narrativa institucional clara e objetiva",
          "Integração com fluxo de orçamento técnico",
        ],
      },
    ],
  },
  {
    id: "pd-gesso-drywall",
    title: "PD Gesso Drywall",
    category: "Presença Corporativa B2B",
    sector: "Construção a Seco & Obras",
    tagline:
      "Site institucional e portfólio filtrável de grandes obras em drywall e steel frame para construtoras e empreendimentos em Santa Catarina.",
    challenge:
      "Posicionar uma empreiteira especializada de Itajaí/SC para contratos de grande porte (corporativos, logísticos e prediais) com portfólio visual organizado.",
    solution:
      "Construção de portal institucional com galeria filtrável de obras por tipologia, apresentação de soluções técnicas e captação direta de orçamentos.",
    stack: ["Portal Institucional", "Galeria Filtrável", "UX Responsiva", "SEO Local SC"],
    domain: "pdgessodrywall.com.br",
    screens: [
      {
        id: "hero",
        label: "Home",
        title: "Posicionamento para grandes empreendimentos",
        description:
          "Proposta focada em obras prediais, corporativas e residenciais de alto padrão.",
        accent: "#38BDF8",
        images: ["/catalog/pd-gesso-drywall/hero-section.png"],
        stats: [
          { label: "Mercado", value: "Grandes obras" },
          { label: "Região", value: "SC + Brasil" },
          { label: "Contato", value: "Direto" },
        ],
        rows: [
          "Segmentação imediata para construtoras e incorporadoras",
          "Navegação direta para portfólio de obras e serviços",
          "CTAs posicionados para solicitação de orçamento",
        ],
      },
      {
        id: "sobre",
        label: "Empresa",
        title: "Estrutura e histórico em Itajaí/SC",
        description:
          "Apresentação institucional com equipe própria, área de atendimento e reputação consolidada.",
        accent: "#22D3EE",
        images: ["/catalog/pd-gesso-drywall/about-section.png"],
        stats: [
          { label: "Base", value: "Itajaí / SC" },
          { label: "Equipe", value: "Própria" },
          { label: "Foco", value: "Padrão técnico" },
        ],
        rows: [
          "Destaque de estrutura própria de execução em obra",
          "Apresentação de histórico e avaliações reais",
          "Acesso direto para atendimento com especialista",
        ],
      },
      {
        id: "solucoes",
        label: "Soluções",
        title: "Soluções em drywall e steel frame",
        description:
          "Organização das especialidades técnicas: compartimentação corporativa, centros logísticos e forros.",
        accent: "#38BDF8",
        images: ["/catalog/pd-gesso-drywall/solutions-section.png"],
        stats: [
          { label: "Sistemas", value: "Drywall / Steel" },
          { label: "Aplicação", value: "Corporativa" },
          { label: "Jornada", value: "Orçamento" },
        ],
        rows: [
          "Detalhamento de compartimentação e fechamentos corporativos",
          "Soluções para galpões logísticos e grandes vãos",
          "Apresentação técnica clara para engenheiros e compradores",
        ],
      },
      {
        id: "portfolio",
        label: "Portfólio",
        title: "Galeria filtrável de empreendimentos",
        description:
          "Catálogo visual categorizado por tipo de obra para comprovação prática de capacidade executiva.",
        accent: "#22D3EE",
        images: ["/catalog/pd-gesso-drywall/portfolio-page.png"],
        stats: [
          { label: "Filtros", value: "Por categoria" },
          { label: "Acervo", value: "Obras reais" },
          { label: "Ação", value: "Orçamento" },
        ],
        rows: [
          "Filtros por grandes obras, forros e projetos residenciais",
          "Registro fotográfico de execuções entregues",
          "Conversão integrada ao fluxo de contato comercial",
        ],
      },
    ],
  },
  {
    id: "grappy",
    title: "Grappy",
    category: "Plataforma SaaS",
    sector: "Varejo & E-commerce",
    tagline:
      "Núcleo ERP + e-commerce multi-segmento: PDV, estoque, fiscal, financeiro e loja online no mesmo sistema, com packs que adaptam cada nicho.",
    challenge:
      "Atender varejistas de segmentos muito diferentes — assistência técnica, moda, autopeças, pet, food e distribuidoras — sem manter um sistema separado para cada nicho.",
    solution:
      "Plataforma multi-tenant com núcleo único (PDV e caixa, estoque unificado, NF-e/NFC-e, financeiro, multi-loja com RBAC e e-commerce B2C) e packs por segmento que adaptam fluxos como OS e IMEI, grade cor/tamanho e comandas com KDS.",
    stack: ["SaaS Multi-tenant", "PDV & NF-e/NFC-e", "E-commerce B2C", "Multi-loja & RBAC"],
    url: "https://grappy.com.br",
    domain: "grappy.com.br",
    thumbnailClassName: "object-[left_top]",
    screens: [
      {
        id: "nucleo",
        label: "Núcleo",
        title: "PDV, estoque, fiscal e loja online no mesmo núcleo",
        description:
          "Um tenant, várias lojas: operação de balcão, estoque, emissão fiscal, financeiro e vitrine online compartilhando a mesma base — no desktop e no celular.",
        accent: "#22D3EE",
        images: ["/catalog/grappy/grappy-hero.png"],
        stats: [
          { label: "Operação", value: "PDV & Caixa" },
          { label: "Fiscal", value: "NF-e / NFC-e" },
          { label: "Lojas", value: "Multi-loja" },
        ],
        rows: [
          "PDV e caixa integrados ao estoque unificado",
          "Emissão de NF-e e NFC-e e controle financeiro",
          "E-commerce B2C com o mesmo saldo do balcão",
        ],
      },
      {
        id: "ordens-servico",
        label: "Ordens de serviço",
        title: "Pack Assistência Técnica: ordens de serviço",
        description:
          "Abertura, acompanhamento e finalização de OS com checklist, fotos e assinatura, organizadas por etapa do reparo.",
        accent: "#38BDF8",
        images: ["/catalog/grappy/grappy-OS.png"],
        stats: [
          { label: "Etapas", value: "Análise → Entrega" },
          { label: "Busca", value: "OS / IMEI" },
          { label: "Orçamento", value: "Envio direto" },
        ],
        rows: [
          "Funil por etapa: aberta, análise, aprovação, reparo, peças, pronto e entregue",
          "Busca por OS, cliente, IMEI ou modelo do aparelho",
          "Envio de orçamento, impressão e mensagem ao cliente a partir da OS",
        ],
      },
      {
        id: "acesso",
        label: "Acesso",
        title: "Entrada única para ERP, vitrine e operação",
        description:
          "Login e criação de conta self-service — o lojista entra e já opera o núcleo e o pack do seu segmento.",
        accent: "#22D3EE",
        images: ["/catalog/grappy/grappy-login.png"],
        stats: [
          { label: "Cadastro", value: "Self-service" },
          { label: "Acesso", value: "RBAC" },
          { label: "Licença", value: "SaaS" },
        ],
        rows: [
          "Criação de conta e login no mesmo fluxo",
          "Permissões por papel em cada loja",
          "Um acesso para ERP, vitrine e operação",
        ],
      },
    ],
  },
  {
    id: "app-csc",
    title: "APP CSC",
    category: "Sistema Corporativo",
    sector: "Contabilidade",
    tagline:
      "Sistema de gestão da Contabilidade Santa Catarina: cobranças e notas fiscais por competência, financeiro, alvarás e agenda do escritório.",
    challenge:
      "Controlar honorários, cobranças, notas fiscais, vencimentos de alvarás e a rotina de tarefas de um escritório contábil que atende dezenas de empresas, antes espalhados em planilhas e lembretes.",
    solution:
      "Plataforma web sob medida com painel por competência, ciclo automático de cobrança e NFS-e, controle financeiro multibanco com boleto/Pix, gestão de licenças por urgência de vencimento e agenda operacional da equipe.",
    stack: ["Plataforma Web", "Cobrança Boleto/Pix", "NFS-e Automática", "Gestão de Alvarás"],
    url: "https://portal.contabilidadestacatarina.com.br",
    domain: "portal.contabilidadestacatarina.com.br",
    screens: [
      {
        id: "competencia",
        label: "Competência",
        title: "Painel da competência",
        description:
          "Cobranças, recebimentos e notas fiscais do mês, com destaque para o que precisa de intervenção humana.",
        accent: "#22D3EE",
        images: ["/catalog/appCSC/dashboard-CSC.jpeg"],
        stats: [
          { label: "Ciclo", value: "Mensal" },
          { label: "Fiscal", value: "NFS-e auto" },
          { label: "Exportação", value: "CSV" },
        ],
        rows: [
          "A receber, recebido no banco e notas autorizadas em um só painel",
          "Alertas de pagas sem nota, vencidas e aguardando pagamento",
          "Reprocessamento de notas presas com um clique",
        ],
      },
      {
        id: "financeiro",
        label: "Financeiro",
        title: "Controle financeiro multibanco",
        description:
          "Contas a pagar e a receber, fluxo de caixa e geração das cobranças do mês por banco emissor.",
        accent: "#38BDF8",
        images: ["/catalog/appCSC/CSC-controle-financeiro.png"],
        stats: [
          { label: "Cobrança", value: "Boleto / Pix" },
          { label: "Bancos", value: "Multibanco" },
          { label: "Previsão", value: "Por período" },
        ],
        rows: [
          "Geração das cobranças do mês e serviços avulsos",
          "Baixa, boleto, prorrogação e promessa de pagamento por conta",
          "Previsão de entrada no período com parcelas em atraso",
        ],
      },
      {
        id: "alvaras",
        label: "Alvarás",
        title: "Licenças e certificados por urgência",
        description:
          "Alvarás, AVCB, licenças sanitárias e certificados digitais dos clientes ordenados pelo vencimento.",
        accent: "#22D3EE",
        images: ["/catalog/appCSC/CSC-alvaras.png"],
        stats: [
          { label: "Ordem", value: "Por urgência" },
          { label: "Regras", value: "Anual / 365d" },
          { label: "Aviso", value: "Ao cliente" },
        ],
        rows: [
          "Situação vencida, crítica, atenção ou em dia por documento",
          "Regras de validade por tipo de documento e município",
          "Aviso ao cliente e renovação direto da lista",
        ],
      },
      {
        id: "agenda",
        label: "Agenda",
        title: "Agenda e tarefas do escritório",
        description:
          "Calendário operacional de compromissos, tarefas e metas, separado por agendas como folha, alvarás e finanças.",
        accent: "#38BDF8",
        images: ["/catalog/appCSC/CSC-agenda.png"],
        stats: [
          { label: "Visão", value: "Mês / Semana" },
          { label: "Agendas", value: "Por área" },
          { label: "Tarefas", value: "Em lote" },
        ],
        rows: [
          "Compromissos e tarefas em um calendário compartilhado",
          "Agendas por área: folha, alvarás, pagamentos e finanças",
          "Criação rápida de tarefas em lote",
        ],
      },
      {
        id: "acesso",
        label: "Acesso",
        title: "Acesso com a identidade do escritório",
        description:
          "Login próprio da Contabilidade Santa Catarina para a gestão contábil, honorários, societário e faturamento.",
        accent: "#22D3EE",
        images: ["/catalog/appCSC/CSC-login.png"],
        stats: [
          { label: "Acesso", value: "Autenticado" },
          { label: "Marca", value: "Do cliente" },
          { label: "Escopo", value: "Escritório" },
        ],
        rows: [
          "Autenticação por e-mail e senha",
          "Identidade visual do escritório",
          "Ponto de entrada único para toda a operação",
        ],
      },
    ],
  },
  {
    id: "s3e-system-pro",
    title: "S3E System Pro",
    category: "Sistema Corporativo",
    sector: "Engenharia Elétrica",
    tagline:
      "Sistema que conecta gestão comercial, projetos, operações e estoque da S3E Engenharia — com WhatsApp integrado e assistente de IA.",
    challenge:
      "Unificar funil de atendimento, orçamentos, ordens de serviço, estoque e a comunicação com clientes e obras, antes divididos entre planilhas e conversas soltas no WhatsApp.",
    solution:
      "Plataforma web sob medida com dashboard de indicadores, funil comercial, orçamentos e vendas, ordens de serviço, tarefas internas, gestão de frota e central de WhatsApp integrada ao sistema, com assistente de IA.",
    stack: ["Plataforma Web", "WhatsApp Integrado", "Assistente IA", "Gestão Comercial & OS"],
    domain: "S3E System Pro · Sistema Interno",
    thumbnailClassName: "object-[left_top]",
    screens: [
      {
        id: "dashboard",
        label: "Dashboard",
        title: "Desempenho e evolução da operação",
        description:
          "Orçamentos aprovados, OS em andamento, quadros produzidos e clientes atendidos, com evolução por período.",
        accent: "#22D3EE",
        images: ["/catalog/s3e-system-pro/S3E-dashboard.png"],
        stats: [
          { label: "Período", value: "Configurável" },
          { label: "KPIs", value: "Comercial & OS" },
          { label: "Saída", value: "Relatórios" },
        ],
        rows: [
          "Cards de indicadores com variação no período",
          "Evolução de orçamentos criados, aprovados e em análise",
          "Evolução de ordens de serviço por estágio de progresso",
        ],
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        title: "Central de WhatsApp integrada",
        description:
          "Conversas de clientes, obras e equipe dentro do sistema, ligadas a contatos, orçamentos e ordens de serviço.",
        accent: "#38BDF8",
        images: ["/catalog/s3e-system-pro/s3e-whatsapp-web.png"],
        stats: [
          { label: "Canal", value: "WhatsApp" },
          { label: "Filtros", value: "Grupos / Clientes" },
          { label: "Vínculo", value: "OS & Contatos" },
        ],
        rows: [
          "Conversas individuais e grupos de obra em uma só tela",
          "Filtros por não lidas, favoritas, grupos e clientes",
          "Atendimento integrado ao funil e às ordens de serviço",
        ],
      },
      {
        id: "acesso",
        label: "Acesso",
        title: "Acesso da equipe S3E",
        description:
          "Login próprio com a identidade da S3E Engenharia Elétrica e recuperação de senha.",
        accent: "#22D3EE",
        images: ["/catalog/s3e-system-pro/S3E-login.png"],
        stats: [
          { label: "Acesso", value: "Autenticado" },
          { label: "Marca", value: "Do cliente" },
          { label: "Uso", value: "Interno" },
        ],
        rows: [
          "Autenticação por e-mail e senha",
          "Recuperação de senha self-service",
          "Identidade visual da S3E Engenharia",
        ],
      },
    ],
  },
];
