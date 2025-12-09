/**
 * Design Tokens - Sistema de Hierarquia Visual
 * 
 * Este arquivo define os padrões de tamanhos para ícones, botões e badges
 * para manter consistência visual em todo o sistema.
 */

// ============================================
// HIERARQUIA DE TAMANHOS DE ÍCONES (SVGs)
// ============================================

export const iconSizes = {
  // Extra pequeno - Para badges compactos e indicadores
  xs: "w-2.5 h-2.5",  // 10px
  
  // Pequeno - Para badges, chips e elementos inline
  sm: "w-3 h-3",      // 12px
  
  // Base/Default - Para botões e itens de menu
  md: "w-4 h-4",      // 16px
  
  // Grande - Para headers e áreas de destaque
  lg: "w-5 h-5",      // 20px
  
  // Extra grande - Para seções vazias e placeholders
  xl: "w-6 h-6",      // 24px
  
  // 2XL - Para ícones de destaque em modais
  "2xl": "w-8 h-8",   // 32px
  
  // 3XL - Para ícones principais em páginas
  "3xl": "w-12 h-12", // 48px
} as const

// ============================================
// HIERARQUIA DE TAMANHOS DE BADGES
// ============================================

export const badgeSizes = {
  // Extra pequeno - Para contadores e indicadores mínimos
  xs: "text-[9px] px-1 py-0 h-4",
  
  // Pequeno - Para badges em listas compactas (chat-list, kanban)
  sm: "text-[10px] px-1.5 py-0 h-5",
  
  // Base/Default - Para badges padrão
  md: "text-xs px-2 py-0.5 h-6",
  
  // Grande - Para badges de destaque
  lg: "text-sm px-3 py-1 h-7",
} as const

// ============================================
// HIERARQUIA DE TAMANHOS DE BOTÕES
// ============================================

export const buttonSizes = {
  // Ícone pequeno - Para ações inline
  iconXs: "h-6 w-6",
  
  // Ícone padrão - Para toolbars e headers
  iconSm: "h-8 w-8",
  
  // Ícone médio
  iconMd: "h-9 w-9",
  
  // Ícone grande
  iconLg: "h-10 w-10",
} as const

// ============================================
// CORES DO SISTEMA
// ============================================

export const systemColors = {
  // Cor primária para badges (azul marinho - mesma do botão primary)
  primary: {
    bg: 'oklch(0.28 0.08 255)',
    text: '#ffffff',
    border: 'oklch(0.28 0.08 255)',
  },
  
  // Cor de destaque/notas (agora usa a mesma primary - azul marinho)
  accent: {
    bg: 'oklch(0.28 0.08 255)',
    text: '#ffffff',
    border: 'oklch(0.28 0.08 255)',
  },
  
  // Cor neutra para elementos secundários
  neutral: {
    bg: '#6b7280',
    text: '#ffffff',
    border: '#6b7280',
  },
  
  // Sucesso (verde)
  success: {
    bg: '#22c55e',
    text: '#ffffff',
    border: '#22c55e',
  },
  
  // Destrutivo (vermelho)
  destructive: {
    bg: '#ef4444',
    text: '#ffffff',
    border: '#ef4444',
  },
} as const

// ============================================
// ESPAÇAMENTOS PADRÃO
// ============================================

export const spacing = {
  // Gap entre elementos inline
  inlineGap: "gap-1",
  
  // Gap entre elementos em grupo
  groupGap: "gap-1.5",
  
  // Gap entre seções
  sectionGap: "gap-2",
  
  // Padding de cards
  cardPadding: "p-3",
  
  // Padding de modais
  modalPadding: "p-4",
} as const

// ============================================
// ARREDONDAMENTOS PADRÃO
// ============================================

export const borderRadius = {
  // Para badges e chips
  badge: "rounded-md",
  
  // Para botões
  button: "rounded-md",
  
  // Para cards
  card: "rounded-lg",
  
  // Para modais
  modal: "rounded-xl",
  
  // Circular (para avatares)
  full: "rounded-full",
} as const

// ============================================
// HELPERS - Classes prontas para uso
// ============================================

export const badgeStyles = {
  // Badge padrão compacto (para listas)
  compact: `${badgeSizes.sm} flex items-center ${spacing.inlineGap} border cursor-pointer ${borderRadius.badge}`,
  
  // Badge padrão
  default: `${badgeSizes.md} flex items-center ${spacing.inlineGap} border ${borderRadius.badge}`,
  
  // Badge grande
  large: `${badgeSizes.lg} flex items-center ${spacing.groupGap} border ${borderRadius.badge}`,
} as const

// Estilo inline para badge primary
export const primaryBadgeStyle = {
  backgroundColor: systemColors.primary.bg,
  color: systemColors.primary.text,
  borderColor: systemColors.primary.border,
}

// Estilo inline para badge accent (notas)
export const accentBadgeStyle = {
  backgroundColor: systemColors.accent.bg,
  color: systemColors.accent.text,
  borderColor: systemColors.accent.border,
}

// Estilo inline para badge neutral
export const neutralBadgeStyle = {
  backgroundColor: systemColors.neutral.bg,
  color: systemColors.neutral.text,
  borderColor: systemColors.neutral.border,
}
