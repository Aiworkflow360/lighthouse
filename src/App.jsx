import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { motion, AnimatePresence } from 'motion/react';
import { T } from './constants/theme';
import { useDarkMode } from './hooks/useDarkMode';
import { useWizardState } from './hooks/useWizardState';
import { WizardContainer } from './components/wizard/WizardContainer';
import { ResultsContainer } from './components/results/ResultsContainer';
import { LighthouseLogo } from './components/shared/LighthouseLogo';

/* ── Keyframes injected once ─────────────────────────────── */
const styleId = 'lighthouse-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const sheet = document.createElement('style');
  sheet.id = styleId;
  sheet.textContent = `
    @keyframes lh-pulse {
      0%, 100% { box-shadow: 0 4px 14px rgba(37,99,235,0.18); }
      50%      { box-shadow: 0 4px 28px rgba(37,99,235,0.32); }
    }
    @keyframes lh-beam {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(sheet);
}

/* ── Page transition variants ────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};
const pageTransition = { duration: 0.3, ease: 'easeInOut' };

/* ── App ─────────────────────────────────────────────────── */
function App() {
  const { dark, toggle } = useDarkMode();
  const wizard = useWizardState();
  const isResults = wizard.currentStep === 'results';

  return (
    <div style={{
      minHeight: '100vh',
      background: dark ? T.bgDark : T.bg,
      fontFamily: T.font,
      fontSize: T.sizeBody,
      color: dark ? T.textDark : T.text,
      lineHeight: T.lineHeight,
      transition: T.transitionSlow,
    }}>
      {/* ── Glassmorphism header ─────────────────────────── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: dark ? T.glassBgDark : T.glassBg,
        backdropFilter: T.glassBlur,
        WebkitBackdropFilter: T.glassBlur,
        borderBottom: `1px solid ${dark ? T.borderDark : T.border}`,
      }}>
        <div style={{
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <button
            onClick={wizard.restart}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: T.font,
              fontSize: '20px',
              fontWeight: 700,
              color: dark ? T.textDark : T.text,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '-0.01em',
            }}
            aria-label="Lighthouse - go to start"
          >
            <LighthouseLogo size={28} animate />
            Lighthouse
          </button>

          {/* Dark mode toggle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{
              background: dark ? T.bgCardDark : T.bgCard,
              border: `1px solid ${dark ? T.borderDark : T.border}`,
              borderRadius: T.radiusFull,
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: T.shadow,
            }}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? 'sun' : 'moon'}
                initial={{ y: -20, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 20, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', lineHeight: 1 }}
              >
                {dark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* ── Main with page transitions ───────────────────── */}
      <main style={{ paddingTop: '8px', paddingBottom: '40px' }}>
        <AnimatePresence mode="wait">
          {wizard.currentStep === 'landing' ? (
            <motion.div
              key="landing"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Landing dark={dark} wizard={wizard} />
            </motion.div>
          ) : isResults ? (
            <motion.div
              key="results"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ResultsContainer wizard={wizard} dark={dark} />
            </motion.div>
          ) : (
            <motion.div
              key={wizard.currentStep}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <WizardContainer wizard={wizard} dark={dark} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer style={{
        padding: '32px 20px 48px',
        textAlign: 'center',
        fontFamily: T.font,
        fontSize: T.sizeSmall,
        color: dark ? T.textMutedDark : T.textMuted,
        borderTop: `1px solid ${dark ? T.borderDark : T.border}`,
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <p style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <span style={{ color: '#DC2626', fontSize: '14px' }} role="img" aria-hidden="true">{'\u2764'}</span>
          Lighthouse is free, open source, and does not store any personal data.
        </p>
        <p style={{ margin: 0 }}>
          Need to talk? Samaritans: <a href="tel:116123" style={{ color: 'inherit', fontWeight: 600 }}>116 123</a> (24/7, free)
        </p>
      </footer>
    </div>
  );
}

/* ── Hero SVG Illustration ────────────────────────────────── */
function HeroIllustration({ dark }) {
  return (
    <svg
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', margin: '0 auto 24px', opacity: dark ? 0.85 : 1 }}
      aria-hidden="true"
    >
      {/* Radiating support lines from centre */}
      <line x1="90" y1="52" x2="38" y2="28" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.35" />
      <line x1="90" y1="52" x2="142" y2="28" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.35" />
      <line x1="90" y1="52" x2="28" y2="68" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.35" />
      <line x1="90" y1="52" x2="152" y2="68" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.35" />
      <line x1="90" y1="52" x2="50" y2="98" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.35" />
      <line x1="90" y1="52" x2="130" y2="98" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" opacity="0.35" />

      {/* Outer support network nodes */}
      <circle cx="38" cy="28" r="8" fill="#2563EB" opacity="0.15" />
      <circle cx="38" cy="28" r="4" fill="#2563EB" opacity="0.5" />
      <circle cx="142" cy="28" r="8" fill="#F59E0B" opacity="0.15" />
      <circle cx="142" cy="28" r="4" fill="#F59E0B" opacity="0.5" />
      <circle cx="28" cy="68" r="8" fill="#059669" opacity="0.15" />
      <circle cx="28" cy="68" r="4" fill="#059669" opacity="0.5" />
      <circle cx="152" cy="68" r="8" fill="#2563EB" opacity="0.15" />
      <circle cx="152" cy="68" r="4" fill="#2563EB" opacity="0.5" />
      <circle cx="50" cy="98" r="8" fill="#F59E0B" opacity="0.15" />
      <circle cx="50" cy="98" r="4" fill="#F59E0B" opacity="0.5" />
      <circle cx="130" cy="98" r="8" fill="#059669" opacity="0.15" />
      <circle cx="130" cy="98" r="4" fill="#059669" opacity="0.5" />

      {/* Central parent figure — head + body arc */}
      <circle cx="80" cy="38" r="10" fill="#2563EB" opacity="0.9" />
      <path d="M68 62 Q72 50 80 48 Q88 50 92 62" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />

      {/* Child figure — smaller, nestled beside parent */}
      <circle cx="100" cy="46" r="7" fill="#F59E0B" opacity="0.9" />
      <path d="M92 64 Q95 56 100 54 Q105 56 108 64" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />

      {/* Protective arc around both figures */}
      <path d="M58 70 Q62 30 90 22 Q118 30 122 70" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.3" strokeDasharray="6 4" />

      {/* Warm glow behind centre */}
      <circle cx="90" cy="52" r="28" fill="#2563EB" opacity="0.06" />
      <circle cx="90" cy="52" r="18" fill="#F59E0B" opacity="0.06" />
    </svg>
  );
}

/* ── Inline SVG Icons for How It Works ───────────────────── */
function ClipboardIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function SearchIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CheckCircleIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ── Landing ─────────────────────────────────────────────── */
function Landing({ dark, wizard }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const mutedColor = dark ? T.textMutedDark : T.textMuted;

  const pillDotColors = {
    'Autism & ADHD': '#2563EB',
    'Mental Health': '#7C3AED',
    'Learning Disabilities': '#8B5CF6',
    'Cancer': '#DC2626',
    'Chronic Conditions': '#059669',
    'Rare Diseases': '#F59E0B',
  };

  const makePillStyle = () => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    padding: '6px 14px',
    borderRadius: T.radiusFull,
    fontSize: '13px',
    fontFamily: T.font,
    fontWeight: 500,
    color: dark ? T.textSecondaryDark : T.textSecondary,
    background: dark ? T.bgCardDark : T.bgCard,
    border: `1px solid ${dark ? T.borderDark : T.border}`,
    lineHeight: '1.3',
  });

  const trustBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    borderRadius: T.radiusFull,
    fontSize: '13px',
    fontFamily: T.font,
    fontWeight: 600,
    color: dark ? T.textDark : T.text,
    background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    lineHeight: '1.3',
  };

  const howItWorksSteps = [
    { num: 1, label: 'Tell us about your child', Icon: ClipboardIcon },
    { num: 2, label: 'We find matching resources', Icon: SearchIcon },
    { num: 3, label: 'Get your personalised action plan', Icon: CheckCircleIcon },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: T.maxWidth,
        margin: '0 auto',
        padding: `0 ${T.containerPad}`,
        textAlign: 'center',
      }}
    >
      {/* Hero gradient backdrop */}
      <div style={{
        padding: '48px 0 40px',
        margin: '0 -20px',
        background: dark ? T.gradientDark : T.gradient,
        borderRadius: T.radiusLg,
      }}>
        {/* Hero illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <HeroIllustration dark={dark} />
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          style={{
            fontFamily: T.font,
            fontSize: 'clamp(36px, 8vw, 48px)',
            fontWeight: 700,
            color: textColor,
            margin: '0 0 20px',
            lineHeight: '1.15',
            letterSpacing: '-0.02em',
            padding: '0 20px',
          }}
        >
          Every resource.<br />One place.<br />No signup.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: T.font,
            fontSize: T.sizeBody,
            color: subColor,
            margin: '0 auto 36px',
            lineHeight: T.lineHeight,
            maxWidth: '480px',
            padding: '0 20px',
          }}
        >
          Find grants, charities, therapists, and support groups for families of children with any condition or additional need. Personalised to your child and location. Free forever.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <motion.button
            onClick={wizard.next}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: T.radius,
              padding: '18px 44px',
              fontFamily: T.font,
              fontSize: T.sizeBody,
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: T.touchMin,
              boxShadow: '0 4px 14px rgba(37,99,235,0.18)',
              transition: T.transition,
              animation: 'lh-pulse 4s ease-in-out infinite',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            Find resources for my family
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: '2px' }}>
              <line x1="3" y1="9" x2="15" y2="9" />
              <polyline points="10 4 15 9 10 14" />
            </svg>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: T.font,
            fontSize: T.sizeSmall,
            color: mutedColor,
            marginTop: '14px',
            marginBottom: 0,
          }}
        >
          Takes about 60 seconds. No account needed.
        </motion.p>
      </div>

      {/* Trust bar — conditions coverage */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        style={{
          marginTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {Object.entries(pillDotColors).map(([label, dotColor]) => (
          <span key={label} style={makePillStyle()}>
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: dotColor,
              flexShrink: 0,
              opacity: 0.85,
            }} aria-hidden="true" />
            {label}
          </span>
        ))}
      </motion.div>

      {/* Trust indicators row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          marginTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <span style={trustBadgeStyle}>
          <span style={{ color: T.secondary }} aria-hidden="true">{'\u2713'}</span>
          100% free
        </span>
        <span style={trustBadgeStyle}>
          <span style={{ color: T.secondary }} aria-hidden="true">{'\u2713'}</span>
          No signup needed
        </span>
        <span style={trustBadgeStyle}>
          <span style={{ color: T.secondary }} aria-hidden="true">{'\u2713'}</span>
          Open source
        </span>
      </motion.div>

      {/* ── How It Works section ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        style={{
          marginTop: '48px',
          paddingTop: '40px',
          borderTop: `1px solid ${dark ? T.borderDark : T.border}`,
        }}
      >
        <h2 style={{
          fontFamily: T.font,
          fontSize: T.sizeH2,
          fontWeight: 700,
          color: textColor,
          margin: '0 0 36px',
          letterSpacing: '-0.01em',
        }}>
          How it works
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          alignItems: 'stretch',
          maxWidth: '400px',
          margin: '0 auto',
        }}>
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {/* Dashed connector line (skip before first step) */}
              {i > 0 && (
                <div style={{
                  width: '2px',
                  height: '28px',
                  backgroundImage: `repeating-linear-gradient(to bottom, ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'} 0px, ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'} 4px, transparent 4px, transparent 8px)`,
                  flexShrink: 0,
                }} />
              )}

              {/* Step card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 20px',
                borderRadius: T.radius,
                background: dark ? T.bgCardDark : T.bgCard,
                border: `1px solid ${dark ? T.borderDark : T.border}`,
                width: '100%',
                textAlign: 'left',
                boxShadow: T.shadow,
              }}>
                {/* Numbered circle */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: T.primary,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: T.font,
                  fontSize: '15px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {step.num}
                </div>

                {/* Icon */}
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <step.Icon color={dark ? T.textSecondaryDark : T.textSecondary} />
                </div>

                {/* Label */}
                <span style={{
                  fontFamily: T.font,
                  fontSize: '15px',
                  fontWeight: 500,
                  color: textColor,
                  lineHeight: '1.4',
                }}>
                  {step.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
