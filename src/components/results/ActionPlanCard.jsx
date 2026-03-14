import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T } from '../../constants/theme';

/* ── localStorage helpers ────────────────────────────────── */
const STORAGE_KEY = 'lighthouse-action-plan-checked';

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function saveChecked(checked) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  } catch { /* quota / private browsing */ }
}

/* ── Inline SVG icons ────────────────────────────────────── */
function ClipboardIcon({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function ChevronIcon({ size = 18, color, up }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}
      animate={{ rotate: up ? 180 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

function CheckIcon({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 14, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ── Checkbox with animated check mark ───────────────────── */
function AnimatedCheckbox({ checked, onChange, dark }) {
  return (
    <motion.button
      onClick={onChange}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.88 }}
      aria-label={checked ? 'Mark as not done' : 'Mark as done'}
      aria-pressed={checked}
      style={{
        width: '28px',
        height: '28px',
        minWidth: '28px',
        borderRadius: '8px',
        border: `2px solid ${checked ? T.warm : (dark ? T.borderDark : T.border)}`,
        background: checked
          ? (dark ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.1)')
          : 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}
    >
      <AnimatePresence>
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            <CheckIcon size={16} color={T.warm} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ── Single action step (expandable) ─────────────────────── */
function ActionStep({ step, index, isChecked, onToggle, dark }) {
  const [expanded, setExpanded] = useState(false);
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.08, ease: 'easeOut' }}
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        padding: '14px 0',
        borderBottom: `1px solid ${dark ? T.borderDark : T.border}`,
      }}
    >
      {/* Checkbox */}
      <div style={{ paddingTop: '2px' }}>
        <AnimatedCheckbox checked={isChecked} onChange={onToggle} dark={dark} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Step number + title row */}
        <button
          onClick={() => setExpanded(prev => !prev)}
          aria-expanded={expanded}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {/* Step number badge */}
          <span style={{
            fontFamily: T.font,
            fontSize: '13px',
            fontWeight: 700,
            color: isChecked ? T.warm : (dark ? T.textMutedDark : T.textMuted),
            background: isChecked
              ? (dark ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.1)')
              : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
            width: '24px',
            height: '24px',
            minWidth: '24px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease, background 0.2s ease',
          }}>
            {index + 1}
          </span>

          <span style={{
            fontFamily: T.font,
            fontSize: T.sizeBody,
            fontWeight: 600,
            color: isChecked ? T.warm : textColor,
            flex: 1,
            lineHeight: '1.4',
            textDecoration: isChecked ? 'line-through' : 'none',
            opacity: isChecked ? 0.75 : 1,
            transition: 'color 0.2s ease, opacity 0.2s ease',
          }}>
            {step.title}
          </span>

          <ChevronIcon size={18} color={dark ? T.textMutedDark : T.textMuted} up={expanded} />
        </button>

        {/* Expandable details */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: '10px', paddingLeft: '32px' }}>
                {/* Description */}
                {step.description && (
                  <p style={{
                    fontFamily: T.font,
                    fontSize: T.sizeSmall,
                    color: subColor,
                    margin: '0 0 10px',
                    lineHeight: '1.6',
                  }}>
                    {step.description}
                  </p>
                )}

                {/* Action text */}
                {step.action && (
                  <div style={{
                    fontFamily: T.font,
                    fontSize: T.sizeSmall,
                    color: textColor,
                    fontWeight: 500,
                    background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    borderLeft: `3px solid ${T.warm}`,
                    marginBottom: '10px',
                    lineHeight: '1.5',
                  }}>
                    {step.action}
                  </div>
                )}

                {/* Link */}
                {step.link && (
                  <motion.a
                    href={step.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      fontFamily: T.font,
                      fontSize: T.sizeSmall,
                      fontWeight: 600,
                      color: T.primary,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {step.link.label || 'Learn more'}
                    <ExternalLinkIcon size={14} color={T.primary} />
                  </motion.a>
                )}

                {/* Phone */}
                {step.phone && (
                  <motion.a
                    href={`tel:${step.phone}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      fontFamily: T.font,
                      fontSize: T.sizeSmall,
                      fontWeight: 600,
                      color: T.primary,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginLeft: step.link ? '16px' : 0,
                    }}
                  >
                    {'\u260E'} {step.phone}
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Main ActionPlanCard ─────────────────────────────────── */
export function ActionPlanCard({ plan, dark, wizard }) {
  const [cardExpanded, setCardExpanded] = useState(true);
  const [checked, setChecked] = useState(loadChecked);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const cardBg = dark ? T.bgCardDark : T.bgCard;
  const borderColor = dark ? T.borderDark : T.border;

  // Guard: nothing to show
  if (!plan || !plan.steps || plan.steps.length === 0) return null;

  // Unique plan key for localStorage scoping
  const planKey = plan.id || 'default';

  const completedCount = plan.steps.filter((_, i) => checked[`${planKey}-${i}`]).length;
  const totalCount = plan.steps.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleToggle = useCallback((index) => {
    setChecked(prev => {
      const key = `${planKey}-${index}`;
      const next = { ...prev, [key]: !prev[key] };
      saveChecked(next);
      return next;
    });
  }, [planKey]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderLeft: 'none',
        borderRadius: T.radiusLg,
        padding: 0,
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: T.shadowMd,
      }}
    >
      {/* Gradient left border */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
        background: `linear-gradient(180deg, ${T.warm} 0%, ${T.secondary} 100%)`,
        borderRadius: '16px 0 0 16px',
      }} />

      {/* Subtle warm overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark
          ? 'linear-gradient(135deg, rgba(245,158,11,0.04) 0%, transparent 60%)'
          : 'linear-gradient(135deg, rgba(245,158,11,0.03) 0%, transparent 60%)',
        pointerEvents: 'none', borderRadius: T.radiusLg,
      }} />

      <div style={{ position: 'relative', padding: '20px 20px 20px 24px' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginBottom: cardExpanded ? '4px' : '0',
        }}>
          <ClipboardIcon size={20} color={T.warm} />
          <h2 style={{
            fontFamily: T.font, fontSize: T.sizeH2, fontWeight: 700,
            color: textColor, margin: 0, flex: 1,
          }}>
            {plan.title || 'Your action plan'}
          </h2>
          <button
            onClick={() => setCardExpanded(prev => !prev)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 500,
              color: T.warm, padding: '4px 8px', borderRadius: T.radius,
              transition: T.transition,
            }}
            aria-expanded={cardExpanded}
            aria-label={cardExpanded ? 'Collapse action plan' : 'Expand action plan'}
          >
            {cardExpanded ? 'Hide' : 'Show'}
            <ChevronIcon size={18} color={T.warm} up={cardExpanded} />
          </button>
        </div>

        {/* Subtitle */}
        {cardExpanded && plan.subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              fontFamily: T.font,
              fontSize: T.sizeSmall,
              color: subColor,
              margin: '0 0 16px',
              lineHeight: '1.5',
            }}
          >
            {plan.subtitle}
          </motion.p>
        )}

        {/* Progress bar */}
        {cardExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            style={{ marginBottom: '16px' }}
          >
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: '6px',
            }}>
              <span style={{
                fontFamily: T.font, fontSize: '13px', fontWeight: 600,
                color: completedCount === totalCount ? T.warm : subColor,
              }}>
                {completedCount === totalCount
                  ? 'All done!'
                  : `${completedCount} of ${totalCount} complete`}
              </span>
              <span style={{
                fontFamily: T.font, fontSize: '13px', fontWeight: 700,
                color: T.warm,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {progressPercent}%
              </span>
            </div>
            <div style={{
              height: '6px',
              background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${T.warm} 0%, ${T.secondary} 100%)`,
                  borderRadius: '3px',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Steps list */}
        <AnimatePresence initial={false}>
          {cardExpanded && (
            <motion.div
              key="action-plan-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div>
                {plan.steps.map((step, i) => (
                  <ActionStep
                    key={step.id || `step-${i}`}
                    step={step}
                    index={i}
                    isChecked={!!checked[`${planKey}-${i}`]}
                    onToggle={() => handleToggle(i)}
                    dark={dark}
                  />
                ))}
              </div>

              {/* Privacy note */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                style={{
                  fontFamily: T.font,
                  fontSize: '12px',
                  color: dark ? T.textMutedDark : T.textMuted,
                  margin: '16px 0 0',
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '14px' }} aria-hidden="true">{'\uD83D\uDD12'}</span>
                Your progress is saved in your browser only. We never see it.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
