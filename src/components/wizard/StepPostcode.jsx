import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T } from '../../constants/theme';
import { lookupPostcode } from '../../lib/postcodes';
import { Button } from '../shared/Button';

function LoadingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: T.primaryText,
          }}
        />
      ))}
    </span>
  );
}

const CONFETTI_PARTICLES = [
  { angle: -40, color: T.primary, delay: 0 },
  { angle: -110, color: T.secondary, delay: 0.05 },
  { angle: -160, color: T.financial, delay: 0.1 },
  { angle: -70, color: T.emotional, delay: 0.08 },
];

function ConfettiParticle({ angle, color, delay }) {
  const rad = (angle * Math.PI) / 180;
  const dist = 40;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
      animate={{
        scale: [0, 1.2, 0],
        opacity: [1, 1, 0],
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
      }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: color,
      }}
    />
  );
}

function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '24px',
        marginTop: '16px',
        position: 'relative',
      }}
    >
      {/* Confetti burst */}
      <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
        {CONFETTI_PARTICLES.map((p, i) => (
          <ConfettiParticle key={i} angle={p.angle} color={p.color} delay={p.delay} />
        ))}
      </div>
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          fontSize: '44px',
          color: T.secondary,
          lineHeight: 1,
        }}
      >
        {'\u2713'}
      </motion.span>
      <span style={{
        fontFamily: T.font,
        fontSize: T.sizeH2,
        color: T.secondary,
        fontWeight: 700,
      }}>
        Found it!
      </span>
    </motion.div>
  );
}

function ErrorInfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
      <circle cx="10" cy="10" r="9" stroke={T.urgent} strokeWidth="1.5" fill="none" />
      <line x1="10" y1="9" x2="10" y2="14" stroke={T.urgent} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="6.5" r="0.85" fill={T.urgent} />
    </svg>
  );
}

export function StepPostcode({ wizard, dark }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [showSlowHint, setShowSlowHint] = useState(false);
  const abortRef = useRef(null);
  const slowTimerRef = useRef(null);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const borderColor = dark ? T.borderDark : T.border;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, []);

  const cancelLookup = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    setLoading(false);
    setShowSlowHint(false);
  }, []);

  const handleLookup = async () => {
    if (!input.trim()) return;

    // Abort any in-flight request
    if (abortRef.current) abortRef.current.abort();
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);

    const controller = new AbortController();
    abortRef.current = controller;

    // Auto-abort after 8 seconds
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    // Show "taking too long" hint after 3 seconds
    slowTimerRef.current = setTimeout(() => setShowSlowHint(true), 3000);

    setLoading(true);
    setError('');
    setShowSlowHint(false);

    const data = await lookupPostcode(input, { signal: controller.signal });

    clearTimeout(timeoutId);
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    setShowSlowHint(false);

    // If this request was aborted by a newer one, ignore the result
    if (abortRef.current !== controller) return;

    setLoading(false);

    if (data && data.error) {
      if (data.message === 'Request timed out') {
        setError("Couldn't look up that postcode. Check it's correct or skip to see nationwide results.");
      } else if (data.message === 'Invalid postcode') {
        setError("Couldn't look up that postcode. Check it's correct or skip to see nationwide results.");
      } else {
        setError("Couldn't look up that postcode. Check it's correct or skip to see nationwide results.");
      }
    } else if (data) {
      wizard.setPostcode(input.trim().toUpperCase());
      wizard.setPostcodeData(data);
      setSuccess(true);
      setTimeout(() => {
        wizard.next();
      }, 600);
    } else {
      setError("Couldn't look up that postcode. Check it's correct or skip to see nationwide results.");
    }
  };

  const handleSkip = () => {
    cancelLookup();
    wizard.setPostcode(null);
    wizard.setPostcodeData(null);
    wizard.next();
  };

  const dismissError = () => {
    setError('');
  };

  return (
    <div>
      <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
        What's your postcode?
      </h1>
      <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: '0 0 8px', lineHeight: T.lineHeight }}>
        This helps us find local hospitals, support groups, and services near you.
      </p>
      <p style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: T.textMuted, margin: '0 0 24px' }}>
        We don't store your full postcode. We only use the first half to find your area.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ display: 'flex', gap: '12px' }}
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <span style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px',
            color: inputFocused ? T.primary : T.textMuted,
            pointerEvents: 'none',
            transition: 'color 0.2s ease',
          }}>
            {'\u{1F4CD}'}
          </span>
          <motion.input
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setError(''); }}
            onKeyDown={e => { if (e.key === 'Enter') handleLookup(); }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="e.g. SW1A 1AA"
            autoFocus
            animate={{
              borderColor: error ? T.urgent : (inputFocused ? T.primary : borderColor),
              boxShadow: inputFocused && !error ? `0 0 0 3px ${T.primaryLight}` : '0 0 0 0px transparent',
            }}
            transition={{ duration: 0.2 }}
            style={{
              width: '100%',
              padding: '16px 20px 16px 40px',
              fontFamily: T.font,
              fontSize: T.sizeBody,
              border: `2px solid ${error ? T.urgent : borderColor}`,
              borderRadius: T.radius,
              background: dark ? T.bgCardDark : T.bgCard,
              color: textColor,
              outline: 'none',
              boxSizing: 'border-box',
              minHeight: T.touchMin,
            }}
            aria-label="Enter your postcode"
          />
        </div>
        <Button onClick={handleLookup} disabled={loading || !input.trim()}>
          {loading ? <LoadingDots /> : 'Find'}
        </Button>
      </motion.div>

      {/* Slow-loading hint with retry/skip */}
      <AnimatePresence>
        {loading && showSlowHint && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            style={{
              marginTop: '12px',
              fontFamily: T.font,
              fontSize: T.sizeSmall,
              color: subColor,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexWrap: 'wrap',
            }}
          >
            <span>Taking too long?</span>
            <button
              onClick={() => { cancelLookup(); handleLookup(); }}
              style={{
                background: 'none', border: 'none', color: T.primary,
                fontFamily: T.font, fontSize: T.sizeSmall, cursor: 'pointer',
                padding: '2px 4px', textDecoration: 'underline', fontWeight: 600,
              }}
            >
              Try again
            </button>
            <span>or</span>
            <button
              onClick={handleSkip}
              style={{
                background: 'none', border: 'none', color: T.primary,
                fontFamily: T.font, fontSize: T.sizeSmall, cursor: 'pointer',
                padding: '2px 4px', textDecoration: 'underline', fontWeight: 600,
              }}
            >
              Skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dismissible error box */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            onClick={dismissError}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') dismissError(); }}
            aria-label="Dismiss error and try again"
            style={{
              marginTop: '12px',
              padding: '14px 18px',
              borderRadius: T.radius,
              background: dark ? 'rgba(220, 38, 38, 0.1)' : T.urgentLight,
              border: `1px solid ${dark ? 'rgba(220, 38, 38, 0.3)' : 'rgba(220, 38, 38, 0.25)'}`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              cursor: 'pointer',
              transition: T.transition,
            }}
          >
            <ErrorInfoIcon />
            <div>
              <p style={{
                fontFamily: T.font,
                fontSize: T.sizeSmall,
                color: dark ? T.textSecondaryDark : T.text,
                margin: 0,
                lineHeight: T.lineHeight,
              }}>
                {error}
              </p>
              <p style={{
                fontFamily: T.font,
                fontSize: '12px',
                color: T.textMuted,
                margin: '6px 0 0',
              }}>
                Tap to dismiss and try again
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && <SuccessCheck />}
      </AnimatePresence>

      <motion.button
        onClick={handleSkip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        whileHover={{ color: dark ? T.textDark : T.text }}
        style={{
          background: 'none', border: 'none', color: subColor,
          fontFamily: T.font, fontSize: T.sizeBody, cursor: 'pointer',
          padding: '16px 0', marginTop: '24px', display: 'block',
        }}
      >
        I'd rather not say -- show national resources only
      </motion.button>
    </div>
  );
}
