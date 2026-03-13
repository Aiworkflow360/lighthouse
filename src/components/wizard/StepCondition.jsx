import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T, CATEGORIES } from '../../constants/theme';
import { COMMON_CONDITIONS, CONDITION_CATEGORIES } from '../../constants/conditions';
import { Card } from '../shared/Card';

/* Map condition categories to theme CATEGORIES for badge colours */
const CATEGORY_COLOR_MAP = {
  developmental: { color: T.medical, bg: T.medicalLight },
  mental_health: { color: T.emotional, bg: T.emotionalLight },
  learning: { color: T.education, bg: T.educationLight },
  sensory: { color: T.info, bg: T.infoLight },
  behavioural: { color: T.emotional, bg: T.emotionalLight },
  chronic: { color: T.practical, bg: T.practicalLight },
  physical: { color: T.practical, bg: T.practicalLight },
  cancer: { color: T.urgent, bg: T.urgentLight },
  heart: { color: T.urgent, bg: T.urgentLight },
  neurological: { color: T.medical, bg: T.medicalLight },
  genetic: { color: T.education, bg: T.educationLight },
  rare: { color: T.financial, bg: T.financialLight },
  respiratory: { color: T.info, bg: T.infoLight },
  metabolic: { color: T.financial, bg: T.financialLight },
  other: { color: T.textMuted, bg: T.border },
};

function QuestionIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="1.5" fill="none" />
      <text x="9" y="13" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>?</text>
    </svg>
  );
}

function ClockIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="1.5" />
      <path d="M9 5v4.5l3 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="9" y1="8" x2="9" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="5.5" r="0.75" fill={color} />
    </svg>
  );
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function StepCondition({ wizard, dark }) {
  const [query, setQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return COMMON_CONDITIONS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.terms.some(t => t.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  const handleSelect = (condition) => {
    wizard.setCondition(condition.name);
    wizard.setConditionCategory(condition.category);
    wizard.next();
  };

  const handleCategorySelect = (cat) => {
    wizard.setCondition(null);
    wizard.setConditionCategory(cat.id);
    wizard.next();
  };

  const handleDontKnow = () => {
    setShowCategories(true);
  };

  const handleWaiting = () => {
    wizard.setCondition('Awaiting Diagnosis');
    wizard.setConditionCategory(null);
    wizard.next();
  };

  const handleNoDiagnosis = () => {
    wizard.setCondition('Not Yet Diagnosed');
    wizard.setConditionCategory(null);
    wizard.next();
  };

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const borderColor = dark ? T.borderDark : T.border;

  if (showCategories) {
    return (
      <div>
        <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
          Which area is closest?
        </h1>
        <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: '0 0 24px', lineHeight: T.lineHeight }}>
          We'll show resources for this type of condition.
        </p>
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {CONDITION_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              variants={staggerItem}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <Card dark={dark} onClick={() => handleCategorySelect(cat)}
                style={{ padding: '16px 20px' }}>
                <span style={{ fontFamily: T.font, fontSize: T.sizeBody, color: textColor, fontWeight: 500 }}>
                  {cat.label}
                </span>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        <button
          onClick={() => setShowCategories(false)}
          style={{
            background: 'none', border: 'none', color: T.primary,
            fontFamily: T.font, fontSize: T.sizeSmall, cursor: 'pointer',
            padding: '16px 0', marginTop: '8px',
          }}
        >
          &larr; Back to search
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
        What is your child's condition?
      </h1>
      <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: '0 0 24px', lineHeight: T.lineHeight }}>
        Start typing to search, or browse by category.
      </p>

      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '18px',
          color: T.textMuted,
          pointerEvents: 'none',
          transition: 'color 0.2s ease',
          ...(inputFocused ? { color: T.primary } : {}),
        }}>
          {'\u{1F50D}'}
        </span>
        <motion.input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          placeholder="e.g. autism, ADHD, anxiety, dyslexia, epilepsy..."
          autoFocus
          animate={{
            borderColor: inputFocused ? T.primary : borderColor,
            boxShadow: inputFocused ? `0 0 0 3px ${T.primaryLight}` : '0 0 0 0px transparent',
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: '100%',
            padding: '16px 20px 16px 44px',
            fontFamily: T.font,
            fontSize: T.sizeBody,
            border: `2px solid ${borderColor}`,
            borderRadius: T.radius,
            background: dark ? T.bgCardDark : T.bgCard,
            color: textColor,
            outline: 'none',
            boxSizing: 'border-box',
            minHeight: T.touchMin,
          }}
          aria-label="Search for your child's condition"
        />
      </div>

      <AnimatePresence mode="wait">
        {filtered.length > 0 && (
          <motion.div
            key="results"
            style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {filtered.map((c, i) => (
              <motion.div
                key={c.name + '-' + i}
                variants={staggerItem}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Card dark={dark} onClick={() => handleSelect(c)}
                  style={{ padding: '14px 20px' }}>
                  <div style={{ fontFamily: T.font, fontSize: T.sizeBody, color: textColor, fontWeight: 500 }}>
                    {c.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    {(() => {
                      const catColors = CATEGORY_COLOR_MAP[c.category] || { color: T.textMuted, bg: T.border };
                      return (
                        <span style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: T.radiusFull,
                          background: catColors.bg,
                          color: catColors.color,
                          fontFamily: T.font,
                          fontSize: '12px',
                          fontWeight: 600,
                          lineHeight: '1.4',
                          textTransform: 'capitalize',
                        }}>
                          {c.category.replace('_', ' ')}
                        </span>
                      );
                    })()}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
      >
        <motion.button
          onClick={handleDontKnow}
          whileHover={{ scale: 1.01, borderColor: T.primary }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'none', border: `2px solid ${borderColor}`,
            borderRadius: T.radius, padding: '14px 20px', cursor: 'pointer',
            fontFamily: T.font, fontSize: T.sizeBody, color: subColor,
            minHeight: T.touchMin, textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          <QuestionIcon color={subColor} />
          I don't know the exact name &rarr;
        </motion.button>
        <motion.button
          onClick={handleWaiting}
          whileHover={{ scale: 1.01, borderColor: T.primary }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'none', border: `2px solid ${borderColor}`,
            borderRadius: T.radius, padding: '14px 20px', cursor: 'pointer',
            fontFamily: T.font, fontSize: T.sizeBody, color: subColor,
            minHeight: T.touchMin, textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          <ClockIcon color={subColor} />
          Still waiting for an assessment &rarr;
        </motion.button>
        <motion.button
          onClick={handleNoDiagnosis}
          whileHover={{ scale: 1.01, borderColor: T.primary }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'none', border: `2px solid ${borderColor}`,
            borderRadius: T.radius, padding: '14px 20px', cursor: 'pointer',
            fontFamily: T.font, fontSize: T.sizeBody, color: subColor,
            minHeight: T.touchMin, textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          <InfoIcon color={subColor} />
          My child hasn't been formally diagnosed &rarr;
        </motion.button>
      </motion.div>
    </div>
  );
}
