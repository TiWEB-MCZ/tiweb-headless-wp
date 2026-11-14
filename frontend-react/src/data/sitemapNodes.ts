export interface SitemapNode {
  id: string;
  label: string;
  tagline: string;
  category:
    | 'Hub Central'
    | 'SaaS & CRM'
    | 'EdTech & Simulação'
    | 'IA & Mídia'
    | 'Fiscal & Contábil'
    | 'Vertical Jurídica'
    | 'Governança & TDD'
    | 'Portfólio'
    | 'Ferramentas'
    | 'Atendimento';
  shortDescription: string;
  fullDescription: string;
  x: number; // Porcentagem no canvas (0-100)
  y: number; // Porcentagem no canvas (0-100)
  targetUrl: string;
  isExternal: boolean;
  accentColor: string;
  badge: string;
  techHighlights: string[];
}

export interface SitemapEdge {
  from: string;
  to: string;
}

export const SITEMAP_NODES: SitemapNode[] = [
  {
    id: 'core-hub',
    label: 'TIWEB Central',
    tagline: 'Portal B2B & Software House de Elite',
    category: 'Hub Central',
    shortDescription: 'Núcleo central de orquestração do ecossistema corporativo.',
    fullDescription: 'Plataforma umbrella central que unifica os produtos, verticais e governança de tecnologia da TIWEB.',
    x: 50,
    y: 50,
    targetUrl: '/',
    isExternal: false,
    accentColor: '#bd93f9',
    badge: 'NÚCLEO SSOT',
    techHighlights: ['React 19', 'Tailwind v4', 'Framer Motion', 'Vitest'],
  },
  {
    id: 'smartcontact',
    label: 'SmartContact',
    tagline: 'CRM & Agentes Cognitivos Omnichannel',
    category: 'SaaS & CRM',
    shortDescription: 'Orquestração de WhatsApp, Telegram e WebChat com LLMs e SLA dinâmico.',
    fullDescription: 'Plataforma omnichannel corporativa que reduz em 74% o tempo de resposta e isola bases por cliente.',
    x: 22,
    y: 25,
    targetUrl: 'https://smartcontact.tiweb.app.br',
    isExternal: true,
    accentColor: '#8be9fd',
    badge: 'PRODUÇÃO',
    techHighlights: ['FastAPI', 'PostgreSQL', 'LangChain', 'WebSocket', 'Redis'],
  },
  {
    id: 'mas-educa-ia',
    label: 'MAS / Educa-IA',
    tagline: 'Motor de Aprendizagem Smart & Simuladores 60 FPS',
    category: 'EdTech & Simulação',
    shortDescription: 'Laboratórios visuais investigativos, desafios gamificados e quizzes adaptativos.',
    fullDescription: 'Ecossistema educacional investigativo com visualizações vetoriais SVG e retenção cognitiva superior.',
    x: 78,
    y: 25,
    targetUrl: 'https://educa-ia.app.br',
    isExternal: true,
    accentColor: '#bd93f9',
    badge: 'PRODUÇÃO',
    techHighlights: ['Angular 18', 'Canvas API', 'SVG Vectors', 'Tailwind'],
  },
  {
    id: 'lisa',
    label: 'Lisa Automação',
    tagline: 'Fábrica de Conteúdo & Agente de WhatsApp/Telegram',
    category: 'IA & Mídia',
    shortDescription: 'Geração autônoma de carrosséis e qualificação de leads com aprovação humana.',
    fullDescription: 'Pipeline de criação e publicação direta na Meta Graph API com supervisão em tempo real no Telegram.',
    x: 18,
    y: 75,
    targetUrl: '/#lisa',
    isExternal: false,
    accentColor: '#50fa7b',
    badge: 'EM ESCALA',
    techHighlights: ['n8n', 'Telegram Bot API', 'Meta Graph API', 'Gemini 1.5 Pro'],
  },
  {
    id: 'spedfacil',
    label: 'SPED Fácil',
    tagline: 'Auditoria Fiscal e Bloco K para Contabilidade',
    category: 'Fiscal & Contábil',
    shortDescription: 'Validação e correção automatizada de arquivos fiscais SPED com área VIP de assinantes.',
    fullDescription: 'Solução veterana e consolidada com motor de regras fiscais e downloads seguros com JWT.',
    x: 82,
    y: 75,
    targetUrl: 'https://spedfacil.tiweb.app.br',
    isExternal: true,
    accentColor: '#ffb86c',
    badge: 'ESTÁVEL',
    techHighlights: ['Angular 17', 'PHP 8.2', 'JWT Auth', 'MySQL'],
  },
  {
    id: 'smartlegal',
    label: 'SmartLegal',
    tagline: 'Vertical Advocacia 4.0 & Ética OAB',
    category: 'Vertical Jurídica',
    shortDescription: 'Triagem 24/7, sentinela de alvarás e conformidade estrita com o Provimento 205/2021.',
    fullDescription: 'Solução sob medida para escritórios de elite recuperarem honorários retidos e agendarem consultas.',
    x: 50,
    y: 18,
    targetUrl: 'https://smartlegal.tiweb.app.br',
    isExternal: true,
    accentColor: '#8be9fd',
    badge: 'VERIFICADO',
    techHighlights: ['React 19', 'Framer Motion', 'OAB Ethics Guard'],
  },
  {
    id: 'ssot-engineering',
    label: 'Engenharia SSOT',
    tagline: 'Rigor Industrial & Cobertura TDD ≥ 93%',
    category: 'Governança & TDD',
    shortDescription: 'Zero-Spaghetti, esteiras atômicas com rollback sem downtime e LGPD multi-tenant.',
    fullDescription: 'Metodologia e manuais canônicos que protegem o caixa e garantem longevidade à arquitetura.',
    x: 85,
    y: 50,
    targetUrl: '/#engenharia',
    isExternal: false,
    accentColor: '#50fa7b',
    badge: 'AUDITADO',
    techHighlights: ['Vitest', 'Playwright', 'Git Flow Universal', 'Zero-Cópia'],
  },
  {
    id: 'cases-showcase',
    label: 'Vitrine de Cases',
    tagline: 'Projetos Comerciais em Produção',
    category: 'Portfólio',
    shortDescription: 'Cases reais de saúde, jurídico e automação corporativa de alta performance.',
    fullDescription: 'Portfólio com métricas comprovadas, como a Concept Odontologia e ferramentas proprietárias.',
    x: 15,
    y: 50,
    targetUrl: '/#cases',
    isExternal: false,
    accentColor: '#bd93f9',
    badge: 'CASE REAL',
    techHighlights: ['Headless CMS', 'High Conversion', 'Edge Caching'],
  },
  {
    id: 'roi-calculator',
    label: 'Calculadora ROI',
    tagline: 'Simulador de Retorno Financeiro Reverso',
    category: 'Ferramentas',
    shortDescription: 'Cálculo dinâmico de honorários e receita recuperada com automação inteligente.',
    fullDescription: 'Ferramenta interativa para decisores quantificarem o custo da ineficiência e o payback imediato.',
    x: 35,
    y: 85,
    targetUrl: '/#roi',
    isExternal: false,
    accentColor: '#50fa7b',
    badge: 'INTERATIVO',
    techHighlights: ['Client-Side Math', 'Dynamic Sliders', 'Realtime Projections'],
  },
  {
    id: 'contact-lisa',
    label: 'Atendimento Lisa',
    tagline: 'Canal Oficial WhatsApp com IA',
    category: 'Atendimento',
    shortDescription: 'Demonstração real da assistente da TIWEB em produção para onboarding.',
    fullDescription: 'Converse ao vivo com a Lisa para agendamento de reuniões executivas e diagnóstico de projetos.',
    x: 65,
    y: 85,
    targetUrl: 'https://wa.me/5582981880467',
    isExternal: true,
    accentColor: '#8be9fd',
    badge: '24/7 ONLINE',
    techHighlights: ['WhatsApp Cloud API', 'Contextual Memory', 'Human Fallback'],
  },
];

export const SITEMAP_EDGES: SitemapEdge[] = [
  // Conexões centrais
  { from: 'core-hub', to: 'smartcontact' },
  { from: 'core-hub', to: 'mas-educa-ia' },
  { from: 'core-hub', to: 'lisa' },
  { from: 'core-hub', to: 'spedfacil' },
  { from: 'core-hub', to: 'smartlegal' },
  { from: 'core-hub', to: 'ssot-engineering' },
  { from: 'core-hub', to: 'cases-showcase' },
  { from: 'core-hub', to: 'roi-calculator' },
  { from: 'core-hub', to: 'contact-lisa' },

  // Conexões laterais entre produtos correlacionados
  { from: 'smartlegal', to: 'smartcontact' },
  { from: 'smartlegal', to: 'roi-calculator' },
  { from: 'lisa', to: 'smartcontact' },
  { from: 'lisa', to: 'contact-lisa' },
  { from: 'ssot-engineering', to: 'spedfacil' },
  { from: 'cases-showcase', to: 'smartlegal' },
  { from: 'mas-educa-ia', to: 'ssot-engineering' },
];
