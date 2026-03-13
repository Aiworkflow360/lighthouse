import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T, CATEGORIES } from '../../constants/theme';
import { ResourceCard } from './ResourceCard';
import { Button } from '../shared/Button';
import { DEMO_RESOURCES } from '../../lib/demoData';

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

export function ResultsContainer({ wizard, dark }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const cardsRef = useRef(null);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  // Phase 1: filter demo data by wizard state
  // Phase 2: this becomes a Supabase query
  const resources = useMemo(() => {
    let filtered = DEMO_RESOURCES;

    // Filter by selected needs
    if (wizard.needs.length > 0 && wizard.needs.length < 4) {
      filtered = filtered.filter(r => wizard.needs.includes(r.category));
    }

    // Filter by condition category if set
    if (wizard.conditionCategory) {
      filtered = filtered.filter(r =>
        !r.conditionCategory || r.conditionCategory === wizard.conditionCategory || r.conditionCategory === 'all'
      );
    }

    // Sort: condition-specific first, then by category priority
    filtered.sort((a, b) => {
      const aSpecific = a.conditionCategory && a.conditionCategory !== 'all' ? 0 : 1;
      const bSpecific = b.conditionCategory && b.conditionCategory !== 'all' ? 0 : 1;
      return aSpecific - bSpecific;
    });

    return filtered;
  }, [wizard.needs, wizard.conditionCategory]);

  const displayed = activeFilter === 'all'
    ? resources
    : resources.filter(r => r.category === activeFilter);

  const animatedCount = useCountUp(resources.length, 500);

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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ marginBottom: '24px' }}
      >
        <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
          We found <span style={{ fontVariantNumeric: 'tabular-nums' }}>{animatedCount}</span> resources for you
        </h1>
        <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: 0, lineHeight: T.lineHeight }}>
          For {conditionLabel}
          {wizard.postcodeData ? ` near ${wizard.postcodeData.localAuthority || wizard.postcodeData.outcode}` : ' (nationwide)'}
        </p>
      </motion.div>

      {/* Crisis banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        style={{
          background: dark ? '#3B1C1C' : '#FEF2F2',
          border: `1px solid ${dark ? '#7F1D1D' : '#FECACA'}`,
          borderLeft: `4px solid ${dark ? '#EF4444' : '#DC2626'}`,
          borderRadius: T.radius,
          padding: '14px 18px',
          marginBottom: '24px',
          fontFamily: T.font,
          fontSize: T.sizeSmall,
          color: dark ? '#FCA5A5' : '#991B1B',
          lineHeight: '1.5',
        }}
      >
        <strong>Need to talk right now?</strong>{' '}
        Samaritans:{' '}
        <motion.a
          href="tel:116123"
          style={{ color: 'inherit', fontWeight: 700, textDecoration: 'none' }}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          116 123
        </motion.a>
        {' '}(24/7, free)
        {' '}&bull;{' '}
        NSPCC:{' '}
        <motion.a
          href="tel:08088005000"
          style={{ color: 'inherit', fontWeight: 700, textDecoration: 'none' }}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        >
          0808 800 5000
        </motion.a>
      </motion.div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '20px',
        overflowX: 'auto', paddingBottom: '4px',
        position: 'relative',
      }}>
        {filterKeys.map((key) => {
          const isAll = key === 'all';
          const cat = isAll ? null : CATEGORIES[key];
          const count = isAll ? resources.length : resources.filter(r => r.category === key).length;
          const label = isAll ? 'All' : cat.label;
          const color = isAll ? T.primary : cat.color;

          return (
            <FilterTab
              key={key}
              filterKey={key}
              label={label}
              active={activeFilter === key}
              onClick={() => setActiveFilter(key)}
              dark={dark}
              color={color}
              count={count}
            />
          );
        })}
      </div>

      {/* Resource cards */}
      <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <AnimatePresence mode="popLayout">
          {displayed.map((r, i) => (
            <motion.div
              key={r.id || `card-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{
                duration: 0.35,
                delay: i * 0.08,
                ease: 'easeOut',
              }}
              layout
            >
              <ResourceCard resource={r} dark={dark} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {displayed.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontFamily: T.font, fontSize: T.sizeBody, color: subColor,
              textAlign: 'center', padding: '40px 20px',
            }}
          >
            No resources found for this filter. Try selecting "All" above.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
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
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span style={{ color: T.secondary, fontSize: '18px' }}>&#10003;</span> Copied!
              </motion.span>
            ) : (
              <motion.span
                key="share"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                Share these results
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
        <Button onClick={() => window.print()} variant="ghost" style={{ flex: '1 1 auto', minWidth: '120px' }}>
          Print this page
        </Button>
        <Button onClick={wizard.restart} variant="ghost" style={{ flex: '1 1 auto', minWidth: '120px' }}>
          Start again
        </Button>
      </motion.div>

      {/* Back to top floating button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
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

function FilterTab({ filterKey, label, active, onClick, dark, color, count }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: T.font,
      fontSize: T.sizeSmall,
      fontWeight: active ? 700 : 500,
      color: active ? '#FFFFFF' : (dark ? T.textSecondaryDark : T.textSecondary),
      background: 'transparent',
      border: `1.5px solid ${active ? 'transparent' : (dark ? T.borderDark : T.border)}`,
      borderRadius: T.radiusFull,
      padding: '8px 16px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      minHeight: '36px',
      transition: T.transition,
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Animated pill background */}
      {active && (
        <motion.div
          layoutId="activeFilterPill"
          style={{
            position: 'absolute',
            inset: '-1.5px',
            borderRadius: T.radiusFull,
            background: color || T.primary,
            zIndex: -1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span style={{ position: 'relative', zIndex: 2 }}>
        {label} ({count})
      </span>
    </button>
  );
}
