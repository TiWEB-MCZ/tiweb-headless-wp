/**
 * SSOT de Cores e Design Tokens - TIWEB Ecosystem
 * Suporte nativo a Tema Escuro (Dracula Clássico) e Tema Claro (Clean Corporate AAA).
 */

export type ThemeMode = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

export interface SemanticColorTokens {
  bgApp: string;
  bgSurface: string;
  bgCard: string;
  bgElevated: string;
  textMain: string;
  textMuted: string;
  textSecondary: string;
  borderSubtle: string;
  borderStrong: string;
  accentPurple: string;
  accentCyan: string;
  accentGreen: string;
  accentOrange: string;
  accentPink: string;
  accentYellow: string;
}

export const THEME_TOKENS: Record<ResolvedTheme, SemanticColorTokens> = {
  dark: {
    bgApp: '#282a36', // Dracula Background
    bgSurface: '#1e1f29', // Dracula Darker Contrast
    bgCard: '#282a36', // Card Background
    bgElevated: '#44475a', // Dracula Current Line / Selection
    textMain: '#f8f8f2', // Dracula Foreground
    textMuted: '#6272a4', // Dracula Comment
    textSecondary: 'rgba(248, 248, 242, 0.75)',
    borderSubtle: 'rgba(68, 71, 90, 0.6)',
    borderStrong: '#44475a',
    accentPurple: '#bd93f9', // Dracula Purple
    accentCyan: '#8be9fd', // Dracula Cyan
    accentGreen: '#50fa7b', // Dracula Green
    accentOrange: '#ffb86c', // Dracula Orange
    accentPink: '#ff79c6', // Dracula Pink
    accentYellow: '#f1fa8c', // Dracula Yellow
  },
  light: {
    bgApp: '#f8fafc', // Slate 50 - Fundo límpido e profissional
    bgSurface: '#ffffff', // Branco Puro para seções
    bgCard: '#ffffff', // Card Branco
    bgElevated: '#f1f5f9', // Slate 100 para chips e hovers
    textMain: '#0f172a', // Slate 900 - Contraste AAA 12:1
    textMuted: '#64748b', // Slate 500 - Legibilidade nítida
    textSecondary: '#334155', // Slate 700 - Subtítulos
    borderSubtle: '#e2e8f0', // Slate 200 - Divisores suaves
    borderStrong: '#cbd5e1', // Slate 300 - Bordas de cards
    accentPurple: '#7c3aed', // Violeta intenso (alta legibilidade em fundo claro)
    accentCyan: '#0284c7', // Ciano / Azul técnico corporativo
    accentGreen: '#16a34a', // Verde corporativo acessível
    accentOrange: '#ea580c', // Laranja acessível
    accentPink: '#db2777', // Magenta corporativo
    accentYellow: '#ca8a04', // Âmbar acessível
  },
};

export const STORAGE_THEME_KEY = 'tiweb-theme-mode';
