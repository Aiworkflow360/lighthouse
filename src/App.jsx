import { useState, useEffect, useRef } from 'react';
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
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* ── Glassmorphism header (warm tint) ────────────── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: dark
          ? 'rgba(28,25,23,0.75)'
          : 'rgba(255,252,247,0.78)',
        backdropFilter: T.glassBlur,
        WebkitBackdropFilter: T.glassBlur,
        borderBottom: `1px solid ${dark ? T.borderDark : 'rgba(245,158,11,0.12)'}`,
      }}>
        <div style={{
          padding: '12px 20px',
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
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
            aria-label="Lighthouse - go to start"
          >
            <img
              src="/lighthouse-header.png"
              alt=""
              width={44}
              height={24}
              style={{ display: 'block', height: '24px', width: 'auto', filter: dark ? 'brightness(1.15)' : 'none' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{
                fontFamily: T.font,
                fontSize: '22px',
                fontWeight: 700,
                color: dark ? T.textDark : T.text,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}>
                Lighthouse
              </span>
              <span style={{
                fontFamily: T.font,
                fontSize: '14px',
                fontWeight: 400,
                fontStyle: 'italic',
                color: dark ? T.textSecondaryDark : T.textSecondary,
                lineHeight: 1.3,
              }}>
                Find your way through.
              </span>
            </div>
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
      <main id="main-content" style={{ paddingTop: '8px', paddingBottom: '40px' }}>
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
          Lighthouse is free, always will be, and never stores your data.
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
    <video
      src="/lighthouse-hero.mp4"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      width={400}
      height={225}
      style={{
        display: 'block',
        margin: '0 auto 24px',
        maxWidth: 'min(400px, 85vw)',
        height: 'auto',
        borderRadius: T.radius,
        opacity: dark ? 0.92 : 1,
        filter: dark ? 'brightness(1.1)' : 'none',
      }}
    />
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

/* ── CountUp — animated number that counts on scroll ────── */
function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = performance.now();
    const numEnd = parseInt(end, 10);
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numEnd));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [hasStarted, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Inline SVG Icons for Scenario Cards ─────────────────── */
function CompassIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={color} opacity="0.2" stroke={color} />
    </svg>
  );
}

function BookIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

function CoinIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" textAnchor="middle" fill={color} fontSize="12" fontWeight="700" stroke="none" fontFamily="Inter, sans-serif">{'\u00A3'}</text>
    </svg>
  );
}

function PeopleIcon({ color }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
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
    { num: 1, label: 'Take a breath \u2014 you\'re in the right place', Icon: ClipboardIcon },
    { num: 2, label: 'We connect you with people who understand', Icon: SearchIcon },
    { num: 3, label: 'We show you what to apply for first', Icon: CheckCircleIcon },
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
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle dot grid texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${dark ? 'rgba(245,158,11,0.25)' : 'rgba(245,158,11,0.3)'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.06,
          pointerEvents: 'none',
        }} />
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

        {/* Warm amber decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          style={{
            width: '60px',
            height: '3px',
            borderRadius: '2px',
            background: '#F59E0B',
            margin: '0 auto 24px',
          }}
        />

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
          When your child has a condition or additional need, finding the right support shouldn't be this hard. We've gathered everything — grants, charities, therapists, support groups — so you don't have to.
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
            {'Find your way through \u2192'}
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
          60 seconds. No account needed. Always free.
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
        {Object.entries(pillDotColors).map(([label, dotColor]) => {
          const isHighlighted = ['Autism & ADHD', 'Mental Health', 'Rare Diseases'].includes(label);
          return (
            <span key={label} style={makePillStyle()}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
              }} aria-hidden="true">
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: dotColor,
                  opacity: 0.85,
                }} />
                {isHighlighted && (
                  <span style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#F59E0B',
                    opacity: 0.85,
                  }} />
                )}
              </span>
              {label}
            </span>
          );
        })}
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

      {/* ── Animated stat counters ────────────────────────────── */}
      <div style={{
        marginTop: '36px',
        display: 'flex',
        justifyContent: 'center',
        gap: '32px',
        flexWrap: 'wrap',
      }}>
        {[
          { end: 72, suffix: '+', label: 'Conditions covered' },
          { end: 40, suffix: '+', label: 'Organisations listed' },
          { end: 100, suffix: '%', label: 'Free, always' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.12 }}
            style={{
              textAlign: 'center',
              minWidth: '120px',
            }}
          >
            <div style={{
              fontFamily: T.font,
              fontSize: 'clamp(32px, 6vw, 42px)',
              fontWeight: 700,
              color: T.primary,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              <CountUp end={stat.end} suffix={stat.suffix} />
            </div>
            <div style={{
              fontFamily: T.font,
              fontSize: T.sizeSmall,
              fontWeight: 500,
              color: dark ? T.textMutedDark : T.textMuted,
              marginTop: '6px',
            }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

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
                  backgroundImage: `repeating-linear-gradient(to bottom, #FEF3C7 0px, #FEF3C7 4px, transparent 4px, transparent 8px)`,
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
                  background: '#F59E0B',
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

      {/* ── Who is this for? ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
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
          margin: '0 0 32px',
          letterSpacing: '-0.01em',
        }}>
          Who is this for?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          maxWidth: '560px',
          margin: '0 auto',
        }}>
          {[
            {
              Icon: CompassIcon,
              title: 'Just received a diagnosis',
              desc: "Take a breath. We'll show you exactly where to start.",
              color: T.primary,
            },
            {
              Icon: BookIcon,
              title: 'Struggling at school',
              desc: "EHCPs, educational psychologists, SEN advocacy \u2014 we'll find what's near you.",
              color: T.education,
            },
            {
              Icon: CoinIcon,
              title: 'Need financial help',
              desc: "There are grants and benefits you probably don't know about. Let us find them.",
              color: T.financial,
            },
            {
              Icon: PeopleIcon,
              title: 'Looking for other parents',
              desc: "You're not the only one going through this. Find your people.",
              color: T.emotional,
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
              whileHover={{ y: -4, boxShadow: T.shadowCardHover }}
              style={{
                padding: '20px',
                borderRadius: T.radius,
                background: dark ? T.bgCardDark : T.bgCard,
                border: `1px solid ${dark ? T.borderDark : T.border}`,
                borderLeft: '3px solid #F59E0B',
                textAlign: 'left',
                boxShadow: T.shadow,
                cursor: 'default',
                transition: T.transition,
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: dark
                  ? `rgba(${card.color === T.primary ? '37,99,235' : card.color === T.education ? '139,92,246' : card.color === T.financial ? '217,119,6' : '124,58,237'},0.15)`
                  : `rgba(${card.color === T.primary ? '37,99,235' : card.color === T.education ? '139,92,246' : card.color === T.financial ? '217,119,6' : '124,58,237'},0.08)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                <card.Icon color={card.color} />
              </div>
              <div style={{
                fontFamily: T.font,
                fontSize: '15px',
                fontWeight: 700,
                color: textColor,
                marginBottom: '6px',
                lineHeight: '1.3',
              }}>
                {card.title}
              </div>
              <div style={{
                fontFamily: T.font,
                fontSize: T.sizeSmall,
                color: dark ? T.textSecondaryDark : T.textSecondary,
                lineHeight: '1.5',
              }}>
                {card.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── What parents say (testimonials) ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
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
          margin: '0 0 32px',
          letterSpacing: '-0.01em',
        }}>
          What parents say
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '480px',
          margin: '0 auto',
        }}>
          {[
            {
              quote: 'I had no idea we were entitled to DLA. Lighthouse found it in 60 seconds.',
              author: 'Sarah',
              detail: 'mum to a child with autism',
            },
            {
              quote: 'After our diagnosis, I felt completely lost. This gave me a clear first step.',
              author: 'James',
              detail: 'dad to a child with epilepsy',
            },
            {
              quote: 'We found a local support group through Lighthouse that changed everything for us.',
              author: 'Priya',
              detail: 'mum to a child with Down\'s syndrome',
            },
          ].map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 + i * 0.12 }}
              style={{
                padding: '24px',
                borderRadius: T.radius,
                background: dark
                  ? 'rgba(37,99,235,0.06)'
                  : 'rgba(37,99,235,0.03)',
                border: `1px solid ${dark ? T.borderDark : T.border}`,
                borderBottom: '3px solid #F59E0B',
                textAlign: 'left',
                position: 'relative',
              }}
            >
              {/* Large decorative quote mark */}
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '16px',
                fontFamily: 'Georgia, serif',
                fontSize: '48px',
                lineHeight: 1,
                color: '#F59E0B',
                opacity: 0.15,
                pointerEvents: 'none',
                userSelect: 'none',
              }} aria-hidden="true">
                {'\u201C'}
              </span>

              <p style={{
                fontFamily: T.font,
                fontSize: '15px',
                fontWeight: 500,
                color: textColor,
                lineHeight: '1.6',
                margin: '0 0 12px',
                paddingLeft: '4px',
                fontStyle: 'italic',
              }}>
                {'\u201C'}{t.quote}{'\u201D'}
              </p>

              <p style={{
                fontFamily: T.font,
                fontSize: T.sizeSmall,
                color: dark ? T.textMutedDark : T.textMuted,
                margin: 0,
                paddingLeft: '4px',
              }}>
                <span style={{ fontWeight: 600, color: dark ? T.textSecondaryDark : T.textSecondary }}>
                  {t.author}
                </span>
                {', '}{t.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Final CTA section ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{
          marginTop: '56px',
          padding: '48px 24px',
          borderRadius: T.radiusLg,
          background: dark
            ? 'radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at center, rgba(245,158,11,0.1) 0%, rgba(254,243,199,0.15) 50%, transparent 70%)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <h2 style={{
          fontFamily: T.font,
          fontSize: 'clamp(28px, 6vw, 36px)',
          fontWeight: 700,
          color: textColor,
          margin: '0 0 12px',
          letterSpacing: '-0.02em',
        }}>
          Ready?
        </h2>

        <p style={{
          fontFamily: T.font,
          fontSize: T.sizeBody,
          color: subColor,
          margin: '0 auto 28px',
          maxWidth: '400px',
          lineHeight: T.lineHeight,
        }}>
          {"It takes 60 seconds. We'll show you everything that's out there."}
        </p>

        <motion.button
          onClick={wizard.next}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'linear-gradient(135deg, #F59E0B 0%, #2563EB 100%)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: T.radius,
            padding: '18px 44px',
            fontFamily: T.font,
            fontSize: T.sizeBody,
            fontWeight: 700,
            cursor: 'pointer',
            minHeight: T.touchMin,
            boxShadow: '0 4px 20px rgba(245,158,11,0.25)',
            transition: T.transition,
          }}
        >
          {'Start now \u2192'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default App;
