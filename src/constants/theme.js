// Lighthouse Theme — warm, calming, accessible
// Inline styles pattern (same as CWS `C` object)

export const T = {
  // Primary — accessible blue
  primary: '#2563EB',
  primaryLight: '#DBEAFE',
  primaryText: '#FFFFFF',

  // Secondary — calming green for CTAs
  secondary: '#059669',

  // Warm accent — amber/gold lighthouse beam
  warm: '#F59E0B',
  warmText: '#B45309',   // WCAG AA-safe amber for text (5.74:1 on #FFFBF5)
  warmHover: '#D97706',
  warmLight: '#FEF3C7',
  warmGlow: 'rgba(245,158,11,0.15)',
  warmGlowStrong: 'rgba(245,158,11,0.3)',

  // Backgrounds — warm, not clinical
  bg: '#FFFBF5',
  bgCard: '#FFFEF9',
  bgDark: '#1C1917',
  bgCardDark: '#292524',
  bgHover: '#F5F5F4',
  bgHoverDark: '#3D3835',

  // Text
  text: '#1C1917',
  textSecondary: '#57534E',
  textMuted: '#78716C',   // stone-500, WCAG AA (4.58:1 on #FFFBF5)
  textDark: '#FAFAF9',
  textSecondaryDark: '#D6D3D1',
  textMutedDark: '#A8A29E',

  // Borders
  border: '#E7E5E4',
  borderDark: '#44403C',

  // Category colours — all pass WCAG AA (4.5:1) on #FFFBF5
  financial: '#B45309',
  financialLight: '#FEF3C7',
  medical: '#2563EB',
  medicalLight: '#DBEAFE',
  emotional: '#7C3AED',
  emotionalLight: '#EDE9FE',
  practical: '#047857',
  practicalLight: '#D1FAE5',
  education: '#6D28D9',
  educationLight: '#F5F3FF',

  // Status
  urgent: '#DC2626',
  urgentLight: '#FEE2E2',
  info: '#0EA5E9',
  infoLight: '#E0F2FE',

  // Typography
  font: "'Inter', system-ui, -apple-system, sans-serif",
  sizeBody: '18px',
  sizeSmall: '14px',
  sizeH1: '32px',
  sizeH2: '22px',
  sizeH3: '18px',
  lineHeight: '1.6',

  // Spacing
  radius: '12px',
  radiusLg: '16px',
  radiusFull: '9999px',
  touchMin: '48px',

  // Gradients
  gradient: 'linear-gradient(135deg, #FFFBF5 0%, #FEF3C7 50%, #EFF6FF 100%)',
  gradientDark: 'linear-gradient(135deg, #1A1814 0%, #1E1B4B 100%)',
  gradientCard: 'linear-gradient(135deg, rgba(245,158,11,0.03) 0%, rgba(37,99,235,0.03) 100%)',
  gradientCardDark: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.08) 100%)',

  // Glassmorphism
  glassBlur: 'blur(20px)',

  // Shadows
  shadow: '0 1px 3px rgba(0,0,0,0.08)',
  shadowMd: '0 4px 12px rgba(0,0,0,0.08)',
  shadowLg: '0 8px 24px rgba(0,0,0,0.12)',
  shadowGlow: '0 0 40px rgba(37,99,235,0.15)',
  shadowCardHover: '0 8px 32px rgba(0,0,0,0.12)',

  // Transitions
  transition: 'all 0.2s ease',
  transitionSlow: 'all 0.3s ease',

  // Layout
  maxWidth: '640px',
  maxWidthNarrow: '640px',
  maxWidthWide: '960px',
  maxWidthFull: '1200px',
  containerPad: '20px',
};

// Category metadata
export const CATEGORIES = {
  financial: { label: 'Money & Grants', color: T.financial, lightColor: T.financialLight, icon: '\u00A3' },
  medical: { label: 'Hospital & Medical', color: T.medical, lightColor: T.medicalLight, icon: '\u2695' },
  emotional: { label: 'Someone to Talk To', color: T.emotional, lightColor: T.emotionalLight, icon: '\u2665' },
  practical: { label: 'Day-to-Day Help', color: T.practical, lightColor: T.practicalLight, icon: '\u2606' },
  education: { label: 'Education & EHCP', color: T.education, lightColor: T.educationLight, icon: '\uD83C\uDF93' },
};
