import { useState } from 'react';
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
        gap: '10px',
        padding: '20px',
        marginTop: '16px',
      }}
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.4 }}
        style={{
          fontSize: '32px',
          color: T.secondary,
        }}
      >
        {'\u2713'}
      </motion.span>
      <span style={{
        fontFamily: T.font,
        fontSize: T.sizeBody,
        color: T.secondary,
        fontWeight: 600,
      }}>
        Found it!
      </span>
    </motion.div>
  );
}

export function StepPostcode({ wizard, dark }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const borderColor = dark ? T.borderDark : T.border;

  const handleLookup = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    const data = await lookupPostcode(input);
    setLoading(false);
    if (data) {
      wizard.setPostcode(input.trim().toUpperCase());
      wizard.setPostcodeData(data);
      setSuccess(true);
      setTimeout(() => {
        wizard.next();
      }, 600);
    } else {
      setError("We couldn't find that postcode. Please check and try again.");
    }
  };

  const handleSkip = () => {
    wizard.setPostcode(null);
    wizard.setPostcodeData(null);
    wizard.next();
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

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: T.urgent, marginTop: '12px' }}
          >
            {error}
          </motion.p>
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
