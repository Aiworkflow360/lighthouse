import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T } from '../../constants/theme';

// Breathe icon — lungs / wind
function BreatheIcon({ size = 22, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M12 2v6" />
      <path d="M12 18v4" />
      <path d="M4.93 10.93l1.41 1.41" />
      <path d="M17.66 10.93l-1.41 1.41" />
      <circle cx="12" cy="14" r="4" />
    </svg>
  );
}

// Connect icon — two people
function ConnectIcon({ size = 22, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Act icon — arrow/target
function ActIcon({ size = 22, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

// Heart icon for encouragement
function HeartIcon({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// Chevron icon for expand/collapse
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

const STEP_ICONS = {
  breathe: BreatheIcon,
  connect: ConnectIcon,
  act: ActIcon,
};

const STEP_COLORS = {
  breathe: '#F59E0B',
  connect: '#7C3AED',
  act: '#2563EB',
};

export function TriageCard({ triage, dark }) {
  if (!triage || !triage.steps || triage.steps.length < 3) return null;

  const [expanded, setExpanded] = useState(true);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const mutedColor = dark ? T.textMutedDark : T.textMuted;
  const cardBg = dark ? T.bgCardDark : T.bgCard;
  const borderColor = dark ? T.borderDark : T.border;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
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
        background: 'linear-gradient(180deg, #F59E0B 0%, #7C3AED 50%, #2563EB 100%)',
        borderRadius: '16px 0 0 16px',
      }} />

      {/* Subtle gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark
          ? 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, transparent 60%)'
          : 'linear-gradient(135deg, rgba(245,158,11,0.04) 0%, transparent 60%)',
        pointerEvents: 'none', borderRadius: T.radiusLg,
      }} />

      <div style={{ position: 'relative', padding: '20px 20px 20px 24px' }}>
        {/* Heading with collapse toggle */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginBottom: expanded ? '20px' : '0',
        }}>
          <HeartIcon size={20} color={T.warm} />
          <h2 style={{
            fontFamily: T.font, fontSize: T.sizeH2, fontWeight: 700,
            color: textColor, margin: 0, flex: 1,
          }}>
            Your first three steps
          </h2>
          <button
            onClick={() => setExpanded(prev => !prev)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 500,
              color: T.warmText, padding: '10px 12px', borderRadius: T.radius,
              minHeight: T.touchMin, transition: T.transition,
            }}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse steps' : 'Expand steps'}
          >
            {expanded ? 'Hide' : 'Show'}
            <ChevronIcon size={18} color={T.warm} up={expanded} />
          </button>
        </div>

        {/* Collapsible body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="triage-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
                {triage.steps.map((step, i) => {
                  const StepIcon = STEP_ICONS[step.icon] || BreatheIcon;
                  const stepColor = STEP_COLORS[step.icon] || T.warm;

                  return (
                    <motion.div
                      key={step.icon || i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.3 + i * 0.12, ease: 'easeOut' }}
                      style={{
                        display: 'flex', gap: '14px', alignItems: 'flex-start',
                        position: 'relative',
                        paddingBottom: i < triage.steps.length - 1 ? '20px' : '0',
                      }}
                    >
                      {/* Icon column with connecting line */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                        <div style={{
                          width: '36px', height: '36px', minWidth: '36px',
                          borderRadius: '50%',
                          background: dark ? `${stepColor}22` : `${stepColor}15`,
                          border: `2px solid ${stepColor}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginTop: '2px', position: 'relative', zIndex: 2,
                        }}>
                          <StepIcon size={18} color={stepColor} />
                        </div>

                        {i < triage.steps.length - 1 && (
                          <div style={{
                            width: '2px', flex: 1, minHeight: '20px',
                            borderLeft: `2px dashed ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}`,
                            marginTop: '4px', zIndex: 1,
                          }} />
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0, paddingTop: '4px' }}>
                        <div style={{
                          fontFamily: T.font, fontSize: T.sizeBody, fontWeight: 700,
                          color: textColor, marginBottom: '6px', lineHeight: '1.4',
                        }}>
                          {step.title}
                        </div>

                        <div style={{
                          fontFamily: T.font, fontSize: T.sizeSmall,
                          color: subColor, marginBottom: step.resource ? '10px' : '0',
                          lineHeight: '1.6',
                        }}>
                          {step.description}
                        </div>

                        {/* Action button — only if step has a resource */}
                        {step.resource && step.resource.apply_phone ? (
                          <motion.a
                            href={`tel:${step.resource.apply_phone}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            style={{
                              fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                              color: '#FFFFFF', background: stepColor,
                              padding: '12px 16px', borderRadius: T.radius,
                              minHeight: T.touchMin,
                              textDecoration: 'none', display: 'inline-flex',
                              alignItems: 'center', gap: '6px', lineHeight: '1.4',
                            }}
                          >
                            {'\u260E'} Call {step.resource.apply_phone}
                          </motion.a>
                        ) : step.resource && step.resource.apply_url ? (
                          <motion.a
                            href={step.resource.apply_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            style={{
                              fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                              color: stepColor, background: 'transparent',
                              padding: '12px 0', textDecoration: 'none', minHeight: T.touchMin,
                              display: 'inline-flex', alignItems: 'center', gap: '4px',
                            }}
                          >
                            Visit website &rarr;
                          </motion.a>
                        ) : null}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Encouragement */}
              {triage.encouragement && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    marginTop: '20px', paddingTop: '16px', paddingLeft: '12px',
                    borderTop: `1px solid ${borderColor}`,
                    borderLeft: `3px solid ${T.warm}`,
                    borderRadius: '0 0 0 4px',
                    fontFamily: T.font, fontSize: T.sizeSmall,
                    color: subColor, fontStyle: 'italic', lineHeight: '1.5',
                  }}
                >
                  <HeartIcon size={16} color={T.warm} />
                  {triage.encouragement}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
