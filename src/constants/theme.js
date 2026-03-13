// Lighthouse Theme — warm, calming, accessible
// Inline styles pattern (same as CWS `C` object)

export const T = {
  // Primary — accessible blue
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryLight: '#DBEAFE',
  primaryText: '#FFFFFF',

  // Secondary — calming green for CTAs
  secondary: '#059669',
  secondaryHover: '#047857',
  secondaryLight: '#D1FAE5',

  // Backgrounds — warm, not clinical
  bg: '#FAFAF9',
  bgCard: '#FFFFFF',
  bgDark: '#1C1917',
  bgCardDark: '#292524',
  bgHover: '#F5F5F4',
  bgHoverDark: '#3D3835',

  // Text
  text: '#1C1917',
  textSecondary: '#57534E',
  textMuted: '#A8A29E',
  textDark: '#FAFAF9',
  textSecondaryDark: '#D6D3D1',
  textMutedDark: '#78716C',

  // Borders
  border: '#E7E5E4',
  borderDark: '#44403C',

  // Category colours
  financial: '#D97706',
  financialLight: '#FEF3C7',
  medical: '#2563EB',
  medicalLight: '#DBEAFE',
  emotional: '#7C3AED',
  emotionalLight: '#EDE9FE',
  practical: '#059669',
  practicalLight: '#D1FAE5',
  education: '#8B5CF6',
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
  sizeH1: '28px',
  sizeH2: '22px',
  sizeH3: '18px',
  lineHeight: '1.6',

  // Spacing
  radius: '12px',
  radiusLg: '16px',
  radiusFull: '9999px',
  touchMin: '48px',

  // Gradients
  gradient: 'linear-gradient(135deg, #EFF6FF 0%, #EDE9FE 100%)',
  gradientDark: 'linear-gradient(135deg, #1E1B4B 0%, #1E293B 100%)',

  // Glassmorphism
  glassBg: 'rgba(255,255,255,0.7)',
  glassBgDark: 'rgba(28,25,23,0.7)',
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
