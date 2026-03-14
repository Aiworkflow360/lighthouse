import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T, CATEGORIES } from '../../constants/theme';
import { ResourceCard } from './ResourceCard';
import { TriageCard } from './TriageCard';
import { ActionPlanCard } from './ActionPlanCard';
import { LocalServicesCard } from './LocalServicesCard';
import { LetterGeneratorCard } from './LetterGeneratorCard';
import { Button } from '../shared/Button';
import { DEMO_RESOURCES } from '../../lib/demoData';
import { generateTriage } from '../../lib/triage';

// Optional data modules — may not exist yet.
// If missing, ActionPlanCard hides and LocalServicesCard uses fallback search links.
// Vite's import.meta.glob returns {} for missing modules (no build error).
const actionPlanModules = import.meta.glob('../../lib/actionPlans.js', { eager: true });
const localServicesModules = import.meta.glob('../../lib/localServices.js', { eager: true });
const generateActionPlan = Object.values(actionPlanModules)[0]?.generateActionPlan || null;
const getLocalServices = Object.values(localServicesModules)[0]?.getLocalServices || null;

// Inject shimmer keyframes once
const SHIMMER_STYLE_ID = 'lighthouse-shimmer';
if (typeof document !== 'undefined' && !document.getElementById(SHIMMER_STYLE_ID)) {
  const style = document.createElement('style');
  style.id = SHIMMER_STYLE_ID;
  style.textContent = `
    @keyframes lighthouseShimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `;
  document.head.appendChild(style);
}

// Counting-up hook: animates from 0 to target over duration
function useCountUp(target, duration = 500) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(target);

  useEffect(() => {
    const start = prevTarget.current !== target ? 0 : count;
    prevTarget.current = target;
    if (target === 0) { setCount(0); return; }

    const startTime = performance.now();
    let raf;
    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCount(Math.round(start + (target - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return count;
}

// Skeleton card placeholder with shimmer
function SkeletonCard({ dark }) {
  const bg = dark ? T.bgCardDark : T.bgCard;
  const shimmerBg = dark
    ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)'
    : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)';
  const lineBg = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  return (
    <div
      style={{
        background: bg,
        borderRadius: T.radiusLg,
        border: `1px solid ${dark ? T.borderDark : T.border}`,
        padding: '20px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Title line */}
      <div style={{
        height: '16px',
        width: '65%',
        background: lineBg,
        borderRadius: '8px',
        marginBottom: '12px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: shimmerBg,
          animation: 'lighthouseShimmer 1.5s ease-in-out infinite',
        }} />
      </div>
      {/* Subtitle line */}
      <div style={{
        height: '12px',
        width: '45%',
        background: lineBg,
        borderRadius: '8px',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: shimmerBg,
          animation: 'lighthouseShimmer 1.5s ease-in-out infinite',
          animationDelay: '0.15s',
        }} />
      </div>
      {/* Body lines */}
      <div style={{
        height: '12px',
        width: '90%',
        background: lineBg,
        borderRadius: '8px',
        marginBottom: '8px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: shimmerBg,
          animation: 'lighthouseShimmer 1.5s ease-in-out infinite',
          animationDelay: '0.3s',
        }} />
      </div>
      <div style={{
        height: '12px',
        width: '72%',
        background: lineBg,
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: shimmerBg,
          animation: 'lighthouseShimmer 1.5s ease-in-out infinite',
          animationDelay: '0.45s',
        }} />
      </div>
    </div>
  );
}

// Empty-state magnifying glass with question mark SVG
function EmptyStateIcon({ size = 80, dark }) {
  const strokeColor = dark ? T.textMutedDark : T.textMuted;
  const amberTint = dark ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Warm amber glow behind glass */}
      <circle cx="34" cy="34" r="24" fill={amberTint} />
      {/* Glass circle */}
      <circle cx="34" cy="34" r="22" stroke={strokeColor} strokeWidth="3" fill="none" />
      {/* Handle */}
      <line x1="50" y1="50" x2="68" y2="68" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
      {/* Question mark */}
      <path
        d="M29 27c0-4 3.5-7 7.5-7s7.5 3 7.5 7c0 3-2 4.5-4.5 5.5-1.5.6-2.5 1.5-2.5 3v1"
        stroke={strokeColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="37" cy="43" r="1.8" fill={strokeColor} />
    </svg>
  );
}

export function ResultsContainer({ wizard, dark }) {
  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'tools'
  const [activeFilter, setActiveFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const cardsRef = useRef(null);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  // Skeleton loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Phase 1: filter demo data by wizard state
  // Phase 2: this becomes a Supabase query
  const resources = useMemo(() => {
    let filtered = DEMO_RESOURCES;

    // Filter by selected needs
    if (wizard.needs.length > 0 && wizard.needs.length < 4) {
      filtered = filtered.filter(r => wizard.needs.includes(r.category));
    }

    // Filter by condition category — strict matching
    if (wizard.conditionCategory) {
      const condLower = (wizard.condition || '').toLowerCase();
      filtered = filtered.filter(r => {
        // Universal resources always show
        if (r.conditionCategory === 'all') return true;
        // Wrong category = exclude
        if (r.conditionCategory !== wizard.conditionCategory) return false;
        // Right category — if resource has condition-specific tags, check them
        if (r.conditions && condLower) {
          return r.conditions.some(tag => condLower.includes(tag));
        }
        // Right category, no specific conditions = general category resource
        return true;
      });
    }

    // Sort: condition-matched first, then general category, then universal
    filtered.sort((a, b) => {
      const condLower = (wizard.condition || '').toLowerCase();
      const aScore = a.conditions && condLower && a.conditions.some(tag => condLower.includes(tag)) ? 0
        : a.conditionCategory && a.conditionCategory !== 'all' ? 1
        : 2;
      const bScore = b.conditions && condLower && b.conditions.some(tag => condLower.includes(tag)) ? 0
        : b.conditionCategory && b.conditionCategory !== 'all' ? 1
        : 2;
      return aScore - bScore;
    });

    return filtered;
  }, [wizard.needs, wizard.conditionCategory]);

  const triage = useMemo(() => generateTriage(wizard, resources), [wizard, resources]);

  // Generate action plan if the module exists
  const actionPlan = useMemo(() => {
    if (!generateActionPlan) return null;
    try {
      return generateActionPlan(wizard, resources);
    } catch { return null; }
  }, [wizard, resources]);

  // Get local services if the module exists
  const localServices = useMemo(() => {
    if (!getLocalServices || !wizard?.postcodeData) return null;
    try {
      return getLocalServices(wizard.postcodeData);
    } catch { return null; }
  }, [wizard?.postcodeData]);

  // Count available tools for the Tools tab badge
  const toolCount = [
    actionPlan?.steps?.length > 0,
    true, // local services always available
    true, // letter generator always available
  ].filter(Boolean).length;

  const displayed = activeFilter === 'all'
    ? resources
    : resources.filter(r => r.category === activeFilter);

  const animatedCount = useCountUp(resources.length, 500);

  // Derive active filter label for summary bar
  const activeFilterLabel = useMemo(() => {
    if (activeFilter === 'all') return null;
    const cat = CATEGORIES[activeFilter];
    return cat ? cat.label : activeFilter;
  }, [activeFilter]);

  // Back to top: show after scrolling past 3 cards
  useEffect(() => {
    const handleScroll = () => {
      if (!cardsRef.current) return;
      const cards = cardsRef.current.children;
      if (cards.length >= 3) {
        const thirdCard = cards[2];
        const rect = thirdCard.getBoundingClientRect();
        setShowBackToTop(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleShare = async () => {
    const url = wizard.getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for hospital wifi / restricted browsers
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const conditionLabel = wizard.condition || (wizard.conditionCategory ?
    wizard.conditionCategory.charAt(0).toUpperCase() + wizard.conditionCategory.slice(1) + ' conditions' :
    'all conditions');

  // Build ordered filter keys for layoutId
  const filterKeys = useMemo(() => {
    const keys = ['all'];
    Object.entries(CATEGORIES).forEach(([key]) => {
      const count = resources.filter(r => r.category === key).length;
      if (count > 0) keys.push(key);
    });
    return keys;
  }, [resources]);

  return (
    <div style={{
      maxWidth: T.maxWidth,
      margin: '0 auto',
      padding: `0 ${T.containerPad}`,
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0.3, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ marginBottom: '8px' }}
      >
        <h1 role="status" aria-live="polite" style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
          We've found <span style={{ fontVariantNumeric: 'tabular-nums' }}>{animatedCount}</span> resources that could help
        </h1>
        {/* Decorative warm amber underline */}
        <div style={{
          width: '40px',
          height: '3px',
          background: T.warm,
          borderRadius: '2px',
          marginBottom: '8px',
        }} />
        <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: 0, lineHeight: T.lineHeight }}>
          For {conditionLabel}
          {wizard.postcodeData ? ` near ${wizard.postcodeData.localAuthority || wizard.postcodeData.outcode}` : ' (nationwide)'}
        </p>
      </motion.div>

      {/* Results summary bar */}
      <motion.p
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{
          fontFamily: T.font,
          fontSize: T.sizeSmall,
          color: subColor,
          margin: '0 0 24px',
          lineHeight: T.lineHeight,
        }}
      >
        Showing {displayed.length} of {resources.length} resources
        {activeFilterLabel ? ` for ${activeFilterLabel}` : ''}
      </motion.p>

      {/* Crisis banner */}
      <motion.div
        initial={{ opacity: 0.3, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        style={{
          background: dark ? '#3B2020' : '#FFF3F0',
          border: `1px solid ${dark ? '#6B2C2C' : '#FECACA'}`,
          borderLeft: `4px solid ${dark ? '#EF9A9A' : '#E57373'}`,
          borderRadius: T.radius,
          padding: '14px 18px',
          marginBottom: '24px',
          fontFamily: T.font,
          fontSize: T.sizeSmall,
          color: dark ? '#FFAB91' : '#8B3A3A',
          lineHeight: '1.5',
        }}
      >
        <strong>Need to talk right now?</strong>{' '}
        Samaritans:{' '}
        <a
          href="tel:116123"
          style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}
        >
          116 123
        </a>
        {' '}(24/7, free)
        {' '}&bull;{' '}
        NSPCC:{' '}
        <a
          href="tel:08088005000"
          style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}
        >
          0808 800 5000
        </a>
      </motion.div>

      {/* Triage — Your first 3 steps (stays high — only 3 items, most actionable) */}
      {triage.steps.length > 0 && (
        <TriageCard triage={triage} dark={dark} />
      )}

      {/* ── Primary tabs: Resources | Tools ────────────────────── */}
      <div
        role="tablist"
        aria-label="Results sections"
        style={{
          display: 'flex',
          borderBottom: `1px solid ${dark ? T.borderDark : T.border}`,
          marginBottom: '0',
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: dark ? T.bgDark : T.bg,
        }}
      >
        {[
          { key: 'resources', label: 'Resources', count: resources.length },
          { key: 'tools', label: 'Tools', count: toolCount },
        ].map(tab => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '14px 0',
              fontFamily: T.font,
              fontSize: T.sizeBody,
              fontWeight: activeTab === tab.key ? 700 : 500,
              color: activeTab === tab.key ? textColor : subColor,
              background: 'none',
              border: 'none',
              borderBottom: `3px solid ${activeTab === tab.key ? T.warm : 'transparent'}`,
              cursor: 'pointer',
              minHeight: T.touchMin,
              transition: T.transition,
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* ── Resources tab content ────────────────────────────── */}
      {activeTab === 'resources' && (
        <>
          {/* Category sub-tabs */}
          <div
            role="tablist"
            aria-label="Filter resources by category"
            style={{
              display: 'flex',
              gap: '4px',
              overflowX: 'auto',
              marginBottom: '20px',
              paddingTop: '12px',
              paddingBottom: '2px',
              position: 'relative',
            }}
          >
            {filterKeys.map((key) => {
              const isAll = key === 'all';
              const cat = isAll ? null : CATEGORIES[key];
              const count = isAll ? resources.length : resources.filter(r => r.category === key).length;
              const label = isAll ? 'All' : cat.label;
              const isActive = activeFilter === key;

              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(key)}
                  style={{
                    padding: '10px 16px',
                    fontFamily: T.font,
                    fontSize: T.sizeSmall,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? T.warm : subColor,
                    background: 'none',
                    border: 'none',
                    borderBottom: `2px solid ${isActive ? T.warm : 'transparent'}`,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    minHeight: T.touchMin,
                    transition: T.transition,
                    position: 'relative',
                  }}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>

          {/* Resource cards — skeleton or real */}
          <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeletons"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={`skel-${i}`}
                      initial={{ opacity: 0.3, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                    >
                      <SkeletonCard dark={dark} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <AnimatePresence mode="popLayout">
                    {displayed.map((r, i) => (
                      <motion.div
                        key={r.id || `card-${i}`}
                        initial={{ opacity: 0.3, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10, scale: 0.97 }}
                        transition={{
                          duration: 0.35,
                          delay: i * 0.06,
                          ease: 'easeOut',
                        }}
                        layout
                      >
                        <ResourceCard resource={r} dark={dark} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          <AnimatePresence>
            {!loading && displayed.length === 0 && (
              <motion.div
                initial={{ opacity: 0.3, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '48px 20px',
                  gap: '12px',
                }}
              >
                <EmptyStateIcon size={80} dark={dark} />
                <p style={{
                  fontFamily: T.font,
                  fontSize: T.sizeBody,
                  fontWeight: 600,
                  color: textColor,
                  margin: '8px 0 0',
                }}>
                  No matches for this filter
                </p>
                <p style={{
                  fontFamily: T.font,
                  fontSize: T.sizeSmall,
                  color: subColor,
                  margin: 0,
                  lineHeight: T.lineHeight,
                }}>
                  Try 'All' or a different category
                </p>
                <Button
                  onClick={() => setActiveFilter('all')}
                  variant="outline"
                  style={{ marginTop: '8px' }}
                >
                  Show all resources
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ── Tools tab content ────────────────────────────────── */}
      {activeTab === 'tools' && (
        <motion.div
          initial={{ opacity: 0.3, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}
        >
          {actionPlan && actionPlan.steps && actionPlan.steps.length > 0 && (
            <ActionPlanCard plan={actionPlan} dark={dark} wizard={wizard} defaultExpanded />
          )}
          <LocalServicesCard wizard={wizard} dark={dark} localServices={localServices} />
          <LetterGeneratorCard wizard={wizard} dark={dark} defaultExpanded />
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: '32px', paddingTop: '24px',
          borderTop: `1px solid ${dark ? T.borderDark : T.border}`,
          display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: '40px',
        }}
      >
        <Button onClick={handleShare} variant="outline" style={{ flex: '1 1 auto', minWidth: '140px' }}>
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0.3, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span style={{ color: T.warm, fontSize: '18px' }}>&#10003;</span> Copied!
              </motion.span>
            ) : (
              <motion.span
                key="share"
                initial={{ opacity: 0.3, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                Share this with someone
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        <Button onClick={() => window.print()} variant="ghost" style={{ flex: '1 1 auto', minWidth: '120px' }}>
          Print for later
        </Button>
        <Button onClick={wizard.back} variant="outline" style={{ flex: '1 1 auto', minWidth: '140px' }}>
          Refine search
        </Button>
        <Button onClick={wizard.restart} variant="ghost" style={{ flex: '1 1 auto', minWidth: '120px' }}>
          Start over
        </Button>
      </motion.div>

      {/* Back to top floating button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0.3, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={scrollToTop}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: T.primary,
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: T.shadowMd,
              zIndex: 50,
              fontFamily: T.font,
            }}
            whileHover={{ scale: 1.1, boxShadow: T.shadowLg }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            &#8593;
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

