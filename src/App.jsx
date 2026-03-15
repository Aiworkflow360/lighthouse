import { useState, useEffect, useRef, useMemo } from 'react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { motion, AnimatePresence } from 'motion/react';
import { T } from './constants/theme';
import { useDarkMode } from './hooks/useDarkMode';
import { useBreakpoint } from './hooks/useBreakpoint';
import { useWizardState } from './hooks/useWizardState';
import { WizardContainer } from './components/wizard/WizardContainer';
import { ResultsContainer } from './components/results/ResultsContainer';
import { COMMON_CONDITIONS } from './constants/conditions';


/* ── Keyframes injected once ─────────────────────────────── */
const styleId = 'lighthouse-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const sheet = document.createElement('style');
  sheet.id = styleId;
  sheet.textContent = `
    @keyframes lh-beam {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    .skip-link {
      position: absolute;
      top: -60px;
      left: 0;
      background: #2563EB;
      color: #FFFFFF;
      padding: 12px 20px;
      z-index: 200;
      font-family: Inter, system-ui, sans-serif;
      font-weight: 600;
      font-size: 14px;
      border-radius: 0 0 8px 0;
      transition: top 0.2s ease;
      text-decoration: none;
    }
    .skip-link:focus {
      top: 0;
      outline: 2px solid #F59E0B;
      outline-offset: 2px;
    }
    :focus-visible {
      outline: 2px solid #F59E0B;
      outline-offset: 2px;
    }
    @media (min-width: 768px) {
      [data-grid="scenarios"] {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (forced-colors: active) {
      [data-grid="resources"] > *, [data-grid="tools"] > * {
        border: 2px solid ButtonText !important;
      }
      button, a {
        border: 1px solid ButtonText !important;
      }
    }
    @media print {
      header, footer, .skip-link,
      [data-print-hide] {
        display: none !important;
      }
      body {
        background: white !important;
        color: black !important;
      }
      a[href]::after {
        content: " (" attr(href) ")";
        font-size: 0.8em;
        color: #666;
      }
      a[href^="tel:"]::after,
      a[href^="#"]::after {
        content: "" !important;
      }
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

/* ── Hash-based routing ──────────────────────────────────── */
function useHash() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return hash;
}

/* ── App ─────────────────────────────────────────────────── */
function App() {
  const { dark, toggle } = useDarkMode();
  const wizard = useWizardState();
  const hash = useHash();
  const bp = useBreakpoint();
  const isResults = wizard.currentStep === 'results';

  const staticPage = hash === '#/about' ? 'about'
    : hash === '#/privacy' ? 'privacy'
    : hash === '#/accessibility' ? 'accessibility'
    : null;

  const handleLogoClick = () => {
    window.location.hash = '';
    wizard.restart();
  };

  // Back navigation logic — works across all views
  const showBackButton = staticPage || wizard.currentStep !== 'landing';
  const handleBack = () => {
    if (staticPage) {
      window.location.hash = '';
    } else {
      wizard.back();
    }
  };

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
          maxWidth: T.maxWidthFull,
          margin: '0 auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Back button — visible on all views except landing */}
            <AnimatePresence>
              {showBackButton && (
                <motion.button
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleBack}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '40px',
                    minHeight: '40px',
                    borderRadius: T.radius,
                    color: dark ? T.textSecondaryDark : T.textSecondary,
                    transition: T.transition,
                  }}
                  aria-label="Go back"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4l-6 6 6 6" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={handleLogoClick}
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
          </div>

          {/* Dark mode toggle */}
          <motion.button
            data-print-hide
            onClick={toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            style={{
              background: dark ? T.bgCardDark : T.bgCard,
              border: `1px solid ${dark ? T.borderDark : T.border}`,
              borderRadius: T.radiusFull,
              width: T.touchMin,
              height: T.touchMin,
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
      <main id="main-content" style={{ paddingTop: '8px', paddingBottom: (bp === 'mobile' && isResults) ? '80px' : '40px' }}>
        <AnimatePresence mode="wait">
          {staticPage ? (
            <motion.div
              key={staticPage}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              {staticPage === 'about' && <AboutPage dark={dark} />}
              {staticPage === 'privacy' && <PrivacyPage dark={dark} />}
              {staticPage === 'accessibility' && <AccessibilityPage dark={dark} />}
            </motion.div>
          ) : wizard.currentStep === 'landing' ? (
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
        maxWidth: T.maxWidthWide,
        margin: '0 auto',
      }}>
        <p style={{ margin: '0 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <span style={{ color: '#DC2626', fontSize: '14px' }} role="img" aria-hidden="true">{'\u2764'}</span>
          Lighthouse is free, always will be, and never stores your data.
        </p>
        <p style={{ margin: '0 0 16px' }}>
          Need to talk? Samaritans: <a href="tel:116123" style={{ color: 'inherit', fontWeight: 600 }}>116 123</a> (24/7, free)
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <a href="#/about" style={{ color: dark ? T.textSecondaryDark : T.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '12px 8px', display: 'inline-block' }}>About</a>
          <a href="#/privacy" style={{ color: dark ? T.textSecondaryDark : T.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '12px 8px', display: 'inline-block' }}>Privacy</a>
          <a href="#/accessibility" style={{ color: dark ? T.textSecondaryDark : T.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '12px 8px', display: 'inline-block' }}>Accessibility</a>
        </div>
        <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.5', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          Information was accurate as of March 2026. Always verify directly with the organisation. Lighthouse does not provide professional advice.
        </p>
      </footer>

      {/* ── Persistent mobile crisis bar ─────────────────── */}
      {bp === 'mobile' && isResults && (
        <div data-print-hide style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: dark ? 'rgba(28,25,23,0.95)' : 'rgba(255,255,255,0.95)',
          backdropFilter: T.glassBlur,
          WebkitBackdropFilter: T.glassBlur,
          borderTop: `1px solid ${dark ? T.borderDark : 'rgba(245,158,11,0.15)'}`,
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: T.font,
          fontSize: '13px',
        }}>
          <span style={{ color: dark ? T.textSecondaryDark : T.textSecondary }}>Need to talk?</span>
          <a
            href="tel:116123"
            style={{
              color: '#FFFFFF',
              background: T.primary,
              padding: '6px 14px',
              borderRadius: T.radiusFull,
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {'\u260E'} Samaritans 116 123
          </a>
        </div>
      )}
    </div>
  );
}

/* ── Hero Video with poster + lazy loading ───────────────── */
function HeroIllustration({ dark }) {
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData;

  useEffect(() => {
    if (saveData) return; // skip video loading on data-saver
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [saveData]);

  const imgStyle = {
    display: 'block',
    margin: '0 auto 24px',
    maxWidth: 'min(400px, 85vw)',
    height: 'auto',
    borderRadius: T.radius,
    opacity: dark ? 0.92 : 1,
    filter: dark ? 'brightness(1.1)' : 'none',
  };

  if (saveData) {
    return <img src="/lighthouse-hero-poster.jpg" alt="" width={400} height={225} style={imgStyle} />;
  }

  return (
    <video
      ref={videoRef}
      src={inView ? '/lighthouse-hero.mp4' : undefined}
      poster="/lighthouse-hero-poster.jpg"
      autoPlay={inView}
      muted
      loop
      playsInline
      aria-hidden="true"
      width={400}
      height={225}
      style={imgStyle}
    />
  );
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

/* ── Hero Search (condition typeahead in hero) ───────────── */
function HeroSearch({ dark, wizard, placeholder }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const textColor = dark ? T.textDark : T.text;
  const borderColor = dark ? T.borderDark : T.border;
  const listboxId = 'hero-search-listbox';

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return COMMON_CONDITIONS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.terms.some(t => t.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [query]);

  const handleSelect = (condition) => {
    wizard.setCondition(condition.name);
    wizard.setConditionCategory(condition.category);
    wizard.next();
    wizard.next();
  };

  const handleKeyDown = (e) => {
    if (!filtered.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx(i => (i + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx(i => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && highlightIdx >= 0) {
      e.preventDefault();
      handleSelect(filtered[highlightIdx]);
    } else if (e.key === 'Escape') {
      setFocused(false);
      setHighlightIdx(-1);
    }
  };

  const showDropdown = filtered.length > 0 && focused;

  return (
    <div style={{ position: 'relative', maxWidth: '440px', margin: '0 auto', textAlign: 'left' }}>
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
          fontSize: '18px', color: focused ? T.warm : T.textMuted, pointerEvents: 'none',
          transition: 'color 0.2s ease',
        }}>{'\u{1F50D}'}</span>
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setHighlightIdx(-1); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => { setFocused(false); setHighlightIdx(-1); }, 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "e.g. autism, ADHD, dyslexia..."}
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-activedescendant={highlightIdx >= 0 ? `hero-option-${highlightIdx}` : undefined}
          aria-autocomplete="list"
          aria-label="Search for your child's condition"
          style={{
            width: '100%', padding: '14px 20px 14px 44px',
            fontFamily: T.font, fontSize: '16px',
            border: `2px solid ${focused ? T.warm : borderColor}`,
            borderRadius: T.radius, background: dark ? T.bgCardDark : '#FFFFFF',
            color: textColor, outline: 'none', boxSizing: 'border-box',
            minHeight: T.touchMin,
            boxShadow: focused ? '0 0 0 3px rgba(245,158,11,0.2)' : T.shadow,
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        />
      </div>
      {showDropdown && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Matching conditions"
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 20,
            marginTop: '4px', borderRadius: T.radius, overflow: 'hidden',
            background: dark ? T.bgCardDark : '#FFFFFF',
            border: `1px solid ${dark ? T.borderDark : T.border}`,
            boxShadow: T.shadowMd,
          }}
        >
          {filtered.map((c, i) => (
            <button
              key={c.name}
              id={`hero-option-${i}`}
              role="option"
              aria-selected={i === highlightIdx}
              onMouseDown={() => handleSelect(c)}
              onMouseEnter={() => setHighlightIdx(i)}
              style={{
                display: 'block', width: '100%', padding: '12px 16px',
                background: i === highlightIdx ? (dark ? T.bgHoverDark : T.bgHover) : 'none',
                border: 'none', cursor: 'pointer',
                fontFamily: T.font, fontSize: '15px', color: textColor,
                textAlign: 'left', borderBottom: `1px solid ${dark ? T.borderDark : T.border}`,
              }}
            >
              <div style={{ fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: '12px', color: dark ? T.textMutedDark : T.textMuted, marginTop: '2px', textTransform: 'capitalize' }}>
                {c.category.replace('_', ' ')}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: T.maxWidthFull,
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
          When your child has additional needs, finding the right support shouldn't be this hard. We've gathered the grants, charities, therapists, and support groups in one place — so you don't have to.
        </motion.p>

        {/* Hero search — start finding help immediately */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.13 }}
          style={{ marginBottom: '20px', padding: '0 20px' }}
        >
          <p style={{
            fontFamily: T.font, fontSize: T.sizeSmall, color: subColor,
            margin: '0 0 10px', textAlign: 'center',
          }}>
            {"What's your child's condition?"}
          </p>
          <HeroSearch dark={dark} wizard={wizard} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          style={{
            fontFamily: T.font,
            fontSize: T.sizeSmall,
            color: mutedColor,
            margin: '0 0 16px',
            textAlign: 'center',
          }}
        >
          or
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {'Browse all conditions \u2192'}
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

        <div data-grid="scenarios" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          maxWidth: T.maxWidthWide,
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
              role="button"
              tabIndex={0}
              aria-label={`${card.title}: ${card.desc}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
              onClick={wizard.next}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); wizard.next(); } }}
              whileHover={{ y: -4, boxShadow: T.shadowCardHover }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '20px',
                borderRadius: T.radius,
                background: dark ? T.bgCardDark : T.bgCard,
                border: `1px solid ${dark ? T.borderDark : T.border}`,
                borderLeft: `3px solid ${card.color}`,
                textAlign: 'left',
                boxShadow: T.shadow,
                cursor: 'pointer',
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
              <div style={{
                fontFamily: T.font,
                fontSize: '13px',
                fontWeight: 600,
                color: T.primary,
                marginTop: '10px',
              }}>
                Find support {'\u2192'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Built for families ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{
          marginTop: '48px',
          paddingTop: '40px',
          borderTop: `1px solid ${dark ? T.borderDark : T.border}`,
          textAlign: 'center',
        }}
      >
        <p style={{
          fontFamily: T.font,
          fontSize: T.sizeBody,
          fontStyle: 'italic',
          color: subColor,
          maxWidth: '420px',
          margin: '0 auto',
          lineHeight: T.lineHeight,
        }}>
          Built by a parent who got tired of searching. Every resource on Lighthouse has been checked by hand, and every link goes directly to the organisation that can help you.
        </p>
      </motion.div>

    </motion.div>
  );
}

/* ── Static Pages ────────────────────────────────────────── */
function StaticPageLayout({ dark, children }) {
  return (
    <div style={{
      maxWidth: T.maxWidthWide,
      margin: '0 auto',
      padding: `32px ${T.containerPad}`,
    }}>
      {children}
    </div>
  );
}

function AboutPage({ dark }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  return (
    <StaticPageLayout dark={dark}>
      <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 24px', fontWeight: 700 }}>
        About Lighthouse
      </h1>
      <div style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, lineHeight: T.lineHeight }}>
        <p style={{ margin: '0 0 16px' }}>
          Lighthouse was built by a parent who got tired of searching.
        </p>
        <p style={{ margin: '0 0 16px' }}>
          When your child receives a diagnosis or has an additional need, you quickly discover that the support is out there — but finding it is a full-time job. There are grants you never knew existed, charities doing incredible work in your exact area, and rights your child has that no one told you about.
        </p>
        <p style={{ margin: '0 0 16px' }}>
          Lighthouse gathers all of it into one place. You tell us your child's condition and what kind of help you need, and we show you everything that's relevant — in 60 seconds, with no signup, and completely free.
        </p>
        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '32px 0 12px', fontWeight: 700 }}>
          Our mission
        </h2>
        <p style={{ margin: '0 0 16px' }}>
          No family should have to spend hours searching for help that already exists. Every resource on Lighthouse has been checked by hand, and every link goes directly to the organisation that can help you.
        </p>
        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '32px 0 12px', fontWeight: 700 }}>
          Open source
        </h2>
        <p style={{ margin: '0 0 16px' }}>
          Lighthouse is open source under the MIT licence. If you'd like to contribute resources, report an issue, or help improve the site, you're welcome to.
        </p>
        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '32px 0 12px', fontWeight: 700 }}>
          Contact
        </h2>
        <p style={{ margin: 0 }}>
          If you have suggestions, corrections, or want to get in touch, please reach out via the GitHub repository.
        </p>
      </div>
    </StaticPageLayout>
  );
}

function PrivacyPage({ dark }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  return (
    <StaticPageLayout dark={dark}>
      <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 24px', fontWeight: 700 }}>
        Privacy Policy
      </h1>
      <div style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, lineHeight: T.lineHeight }}>
        <p style={{ margin: '0 0 16px', fontWeight: 600, color: textColor }}>
          Last updated: March 2026
        </p>

        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '24px 0 12px', fontWeight: 700 }}>
          What we collect
        </h2>
        <p style={{ margin: '0 0 16px' }}>
          Lighthouse is designed to be as private as possible. Here is exactly what happens with your data:
        </p>
        <ul style={{ margin: '0 0 16px', paddingLeft: '24px' }}>
          <li style={{ marginBottom: '8px' }}><strong>Postcode:</strong> If you enter a postcode, we extract the outcode (the first half, e.g. "SW1A" from "SW1A 1AA") and send it to <a href="https://postcodes.io" target="_blank" rel="noopener noreferrer" style={{ color: T.primary }}>postcodes.io</a> to look up your local authority area. This helps us show you services near you. Your full postcode is never stored or sent anywhere — only the outcode leaves your browser, and only to postcodes.io.</li>
          <li style={{ marginBottom: '8px' }}><strong>Condition search:</strong> Your search happens entirely in your browser. No search data is sent to any server.</li>
          <li style={{ marginBottom: '8px' }}><strong>Saved resources:</strong> When you save a resource, it's stored in your browser's localStorage only. We cannot see it.</li>
          <li style={{ marginBottom: '8px' }}><strong>Dark mode preference:</strong> Stored in your browser's localStorage.</li>
        </ul>

        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '24px 0 12px', fontWeight: 700 }}>
          What we don't collect
        </h2>
        <ul style={{ margin: '0 0 16px', paddingLeft: '24px' }}>
          <li style={{ marginBottom: '8px' }}>No cookies</li>
          <li style={{ marginBottom: '8px' }}>No analytics or tracking</li>
          <li style={{ marginBottom: '8px' }}>No personal data stored on our servers</li>
          <li style={{ marginBottom: '8px' }}>No accounts or passwords</li>
        </ul>

        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '24px 0 12px', fontWeight: 700 }}>
          Third-party services
        </h2>
        <p style={{ margin: '0 0 16px' }}>
          The only external service we use is <a href="https://postcodes.io" target="_blank" rel="noopener noreferrer" style={{ color: T.primary }}>postcodes.io</a>, a free, open API built on UK government postcode data. When you enter your postcode, we send only the outcode (first half) to this service to find your local authority area. Postcodes.io does not require an account, does not track users, and is open source.
        </p>

        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '24px 0 12px', fontWeight: 700 }}>
          Share URLs
        </h2>
        <p style={{ margin: 0 }}>
          If you use the share feature, the URL contains your selected condition category and needs — but not your postcode or any personal information.
        </p>
      </div>
    </StaticPageLayout>
  );
}

function AccessibilityPage({ dark }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  return (
    <StaticPageLayout dark={dark}>
      <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 24px', fontWeight: 700 }}>
        Accessibility Statement
      </h1>
      <div style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, lineHeight: T.lineHeight }}>
        <p style={{ margin: '0 0 16px' }}>
          Lighthouse aims to be accessible to all users, including those with disabilities. We are working towards WCAG 2.1 Level AA conformance.
        </p>

        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '24px 0 12px', fontWeight: 700 }}>
          What we've done
        </h2>
        <ul style={{ margin: '0 0 16px', paddingLeft: '24px' }}>
          <li style={{ marginBottom: '8px' }}>All interactive elements have a minimum touch target of 48px</li>
          <li style={{ marginBottom: '8px' }}>Colour contrast ratios meet WCAG AA standards</li>
          <li style={{ marginBottom: '8px' }}>Full keyboard navigation support</li>
          <li style={{ marginBottom: '8px' }}>Skip-to-content link for screen reader users</li>
          <li style={{ marginBottom: '8px' }}>ARIA labels on all interactive elements</li>
          <li style={{ marginBottom: '8px' }}>Dark mode for users who prefer reduced light</li>
          <li style={{ marginBottom: '8px' }}>Semantic HTML structure</li>
          <li style={{ marginBottom: '8px' }}>Animations respect prefers-reduced-motion</li>
        </ul>

        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '24px 0 12px', fontWeight: 700 }}>
          Known issues
        </h2>
        <ul style={{ margin: '0 0 16px', paddingLeft: '24px' }}>
          <li style={{ marginBottom: '8px' }}>Some animations may not fully respect prefers-reduced-motion in all cases</li>
          <li style={{ marginBottom: '8px' }}>The condition search dropdown may need improved screen reader announcements</li>
        </ul>

        <h2 style={{ fontFamily: T.font, fontSize: T.sizeH2, color: textColor, margin: '24px 0 12px', fontWeight: 700 }}>
          Report a problem
        </h2>
        <p style={{ margin: 0 }}>
          If you experience any accessibility issues using Lighthouse, please let us know via the GitHub repository. We take accessibility seriously and will work to fix any issues as quickly as possible.
        </p>
      </div>
    </StaticPageLayout>
  );
}

export default App;
