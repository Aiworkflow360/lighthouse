import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T } from '../../constants/theme';

// Compass SVG icon (inline)
function CompassIcon({ size = 22, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon
        points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Heart icon for encouragement
function HeartIcon({ size = 16, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ flexShrink: 0 }}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// Chevron icon for expand/collapse toggle
function ChevronIcon({ size = 18, color, up }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
      animate={{ rotate: up ? 180 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

export function TriageCard({ triage, dark }) {
  // Guard: require at least 3 steps
  if (!triage || !triage.steps || triage.steps.length < 3) return null;

  const [expanded, setExpanded] = useState(true);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const mutedColor = dark ? T.textMutedDark : T.textMuted;
  const cardBg = dark ? T.bgCardDark : T.bgCard;
  const borderColor = dark ? T.borderDark : T.border;
  const lineColor = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)';

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
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          background: 'linear-gradient(180deg, #2563EB 0%, #7C3AED 100%)',
          borderRadius: '16px 0 0 16px',
        }}
      />

      {/* Subtle gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: dark
            ? 'linear-gradient(135deg, rgba(37,99,235,0.06) 0%, transparent 60%)'
            : 'linear-gradient(135deg, rgba(37,99,235,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
          borderRadius: T.radiusLg,
        }}
      />

      <div style={{ position: 'relative', padding: '20px 20px 20px 24px' }}>
        {/* Heading with collapse toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: expanded ? '20px' : '0',
        }}>
          <CompassIcon size={22} color={T.primary} />
          <h2 style={{
            fontFamily: T.font,
            fontSize: T.sizeH2,
            fontWeight: 700,
            color: textColor,
            margin: 0,
            flex: 1,
          }}>
            Your first 3 steps
          </h2>
          <button
            onClick={() => setExpanded(prev => !prev)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontFamily: T.font,
              fontSize: T.sizeSmall,
              fontWeight: 500,
              color: subColor,
              padding: '4px 8px',
              borderRadius: T.radius,
              transition: T.transition,
            }}
            aria-expanded={expanded}
            aria-label={expanded ? 'Collapse steps' : 'Expand steps'}
          >
            {expanded ? 'Hide' : 'Show'}
            <ChevronIcon size={18} color={subColor} up={expanded} />
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
              {/* Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', position: 'relative' }}>
                {triage.steps.map((step, i) => (
                  <motion.div
                    key={step.resource.id || i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.3 + i * 0.1,
                      ease: 'easeOut',
                    }}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'flex-start',
                      position: 'relative',
                      paddingBottom: i < triage.steps.length - 1 ? '18px' : '0',
                    }}
                  >
                    {/* Number column with connecting line */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative',
                    }}>
                      {/* Numbered circle */}
                      <div style={{
                        width: '32px',
                        height: '32px',
                        minWidth: '32px',
                        borderRadius: '50%',
                        background: T.primary,
                        color: T.primaryText,
                        fontFamily: T.font,
                        fontSize: '15px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '2px',
                        position: 'relative',
                        zIndex: 2,
                      }}>
                        {i + 1}
                      </div>

                      {/* Dashed connecting line to next step */}
                      {i < triage.steps.length - 1 && (
                        <div style={{
                          width: '2px',
                          flex: 1,
                          minHeight: '18px',
                          borderLeft: `2px dashed ${lineColor}`,
                          marginTop: '4px',
                          zIndex: 1,
                        }} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0, paddingTop: '2px' }}>
                      <div style={{
                        fontFamily: T.font,
                        fontSize: T.sizeBody,
                        fontWeight: 700,
                        color: textColor,
                        marginBottom: '4px',
                        lineHeight: '1.4',
                      }}>
                        {step.resource.title}
                      </div>

                      <div style={{
                        fontFamily: T.font,
                        fontSize: T.sizeSmall,
                        color: mutedColor,
                        fontStyle: 'italic',
                        marginBottom: '8px',
                        lineHeight: '1.5',
                      }}>
                        {step.why}
                      </div>

                      {/* Action button */}
                      {step.resource.apply_phone ? (
                        <motion.a
                          href={`tel:${step.resource.apply_phone}`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                          style={{
                            fontFamily: T.font,
                            fontSize: T.sizeSmall,
                            fontWeight: 600,
                            color: T.primaryText,
                            background: T.primary,
                            padding: '6px 14px',
                            borderRadius: T.radius,
                            textDecoration: 'none',
                            display: 'inline-block',
                            lineHeight: '1.4',
                          }}
                        >
                          Call {step.resource.apply_phone}
                        </motion.a>
                      ) : (
                        step.resource.apply_url && (
                          <motion.a
                            href={step.resource.apply_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            style={{
                              fontFamily: T.font,
                              fontSize: T.sizeSmall,
                              fontWeight: 600,
                              color: T.primary,
                              background: 'transparent',
                              padding: 0,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            Visit website &rarr;
                          </motion.a>
                        )
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Encouragement */}
              {triage.encouragement && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: `1px solid ${borderColor}`,
                    fontFamily: T.font,
                    fontSize: T.sizeSmall,
                    color: subColor,
                    fontStyle: 'italic',
                    lineHeight: '1.5',
                  }}
                >
                  <HeartIcon size={16} color={dark ? T.emotionalLight : T.emotional} />
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
