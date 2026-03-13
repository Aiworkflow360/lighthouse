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

/* ── Keyframes injected once ─────────────────────────────── */
const styleId = 'lighthouse-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const sheet = document.createElement('style');
  sheet.id = styleId;
  sheet.textContent = `
    @keyframes lh-pulse {
      0%, 100% { box-shadow: 0 4px 12px rgba(37,99,235,0.25); }
      50%      { box-shadow: 0 4px 24px rgba(37,99,235,0.45); }
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
            <span style={{ fontSize: '22px', lineHeight: 1 }} role="img" aria-hidden="true">
              🏠
            </span>
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

/* ── Landing ─────────────────────────────────────────────── */
function Landing({ dark, wizard }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const mutedColor = dark ? T.textMutedDark : T.textMuted;

  const pillStyle = {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: T.radiusFull,
    fontSize: '13px',
    fontFamily: T.font,
    fontWeight: 500,
    color: dark ? T.textSecondaryDark : T.textSecondary,
    background: dark ? T.bgCardDark : T.bgCard,
    border: `1px solid ${dark ? T.borderDark : T.border}`,
    lineHeight: '1.3',
  };

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
        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
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
          transition={{ duration: 0.6, delay: 0.2 }}
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
          Find hospitals, grants, charities, and support groups for families of seriously ill children. Personalised to your child's diagnosis and location. Free forever.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            onClick={wizard.next}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: T.primary,
              color: '#FFFFFF',
              border: 'none',
              borderRadius: T.radius,
              padding: '18px 44px',
              fontFamily: T.font,
              fontSize: T.sizeBody,
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: T.touchMin,
              boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
              transition: T.transition,
              animation: 'lh-pulse 2.5s ease-in-out infinite',
            }}
          >
            Find resources for my family
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          marginTop: '28px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <span style={pillStyle}>Cancer</span>
        <span style={pillStyle}>Heart conditions</span>
        <span style={pillStyle}>Neurological</span>
        <span style={pillStyle}>Genetic</span>
        <span style={pillStyle}>Rare diseases</span>
      </motion.div>

      {/* Trust indicators row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
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
    </motion.div>
  );
}

export default App;
