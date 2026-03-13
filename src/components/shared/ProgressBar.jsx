import { motion } from 'motion/react';
import { T } from '../../constants/theme';

const STEP_LABELS = ['Condition', 'Age', 'Location', 'Needs'];

const springTransition = { type: 'spring', stiffness: 300, damping: 25 };

function Checkmark({ color }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{ display: 'block' }}
    >
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProgressBar({ step, total = 4, dark }) {
  const stepCount = Math.min(total, STEP_LABELS.length);
  const labels = STEP_LABELS.slice(0, stepCount);

  const mutedColor = dark ? T.textMutedDark : T.textMuted;
  const textColor = dark ? T.textDark : T.text;
  const trackBg = dark ? T.borderDark : T.border;

  return (
    <div style={{ padding: '0 4px' }}>
      {/* Step counter */}
      <div
        style={{
          fontFamily: T.font,
          fontSize: T.sizeSmall,
          color: mutedColor,
          marginBottom: '10px',
          textAlign: 'center',
        }}
      >
        Step {Math.min(step + 1, stepCount)} of {stepCount}
      </div>

      {/* Progress bar segments */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {labels.map((_, i) => {
          const isCompleted = i < step;
          const isActive = i === step;

          return (
            <div key={i} style={{ flex: 1 }}>
              {/* Segment track */}
              <div
                style={{
                  height: '6px',
                  borderRadius: '3px',
                  background: trackBg,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  layoutId={`progress-fill-${i}`}
                  animate={{
                    width: isCompleted || isActive ? '100%' : '0%',
                    background: isCompleted
                      ? T.primary
                      : isActive
                        ? T.primary
                        : trackBg,
                    opacity: isActive ? 0.7 : 1,
                  }}
                  transition={springTransition}
                  style={{
                    height: '100%',
                    borderRadius: '3px',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Step labels */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {labels.map((label, i) => {
          const isCompleted = i < step;
          const isActive = i === step;

          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              {/* Indicator dot or checkmark */}
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isCompleted
                    ? T.primary
                    : isActive
                      ? T.primaryLight
                      : 'transparent',
                  border: isActive
                    ? `2px solid ${T.primary}`
                    : isCompleted
                      ? 'none'
                      : `2px solid ${trackBg}`,
                  transition: T.transition,
                }}
              >
                {isCompleted && <Checkmark color="#FFFFFF" />}
                {isActive && (
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: T.primary,
                    }}
                  />
                )}
              </div>

              {/* Label text */}
              <span
                style={{
                  fontFamily: T.font,
                  fontSize: '12px',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive
                    ? T.primary
                    : isCompleted
                      ? textColor
                      : mutedColor,
                  textAlign: 'center',
                  lineHeight: '1.2',
                  transition: T.transition,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
