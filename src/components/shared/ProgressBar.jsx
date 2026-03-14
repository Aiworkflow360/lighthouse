import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T } from '../../constants/theme';

const STEP_LABELS = ['Condition', 'Location'];
const STEP_LABELS_SHORT = ['Cond.', 'Loc.'];
const STEP_FULL_NAMES = ["Your child's condition", 'Your location'];

const SMALL_SCREEN_BREAKPOINT = 380;

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

function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < SMALL_SCREEN_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < SMALL_SCREEN_BREAKPOINT);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isSmall;
}

export function ProgressBar({ step, total = 2, dark, wizard }) {
  const stepCount = Math.min(total, STEP_LABELS.length);
  const isSmall = useIsSmallScreen();
  const labels = (isSmall ? STEP_LABELS_SHORT : STEP_LABELS).slice(0, stepCount);

  const mutedColor = dark ? T.textMutedDark : T.textMuted;
  const textColor = dark ? T.textDark : T.text;
  const trackBg = dark ? T.borderDark : T.border;

  const handleStepClick = (i) => {
    // Only allow clicking completed steps
    if (i < step && wizard?.goToStep) {
      // ProgressBar index i maps to wizard step i + 1
      wizard.goToStep(i + 1);
    }
  };

  return (
    <div
      style={{ padding: '0 4px' }}
      role="progressbar"
      aria-label={`Step ${Math.min(step + 1, stepCount)} of ${stepCount}: ${STEP_FULL_NAMES[Math.min(step, stepCount - 1)]}`}
      aria-valuenow={step + 1}
      aria-valuemin={1}
      aria-valuemax={stepCount}
    >
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
            <div
              key={i}
              style={{
                flex: 1,
                cursor: isCompleted ? 'pointer' : 'default',
              }}
              onClick={() => handleStepClick(i)}
            >
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
                  animate={{
                    width: isCompleted || isActive ? '100%' : '0%',
                    background: isCompleted
                      ? T.primary
                      : isActive
                        ? T.primary
                        : trackBg,
                    opacity: isActive ? 0.7 : 1,
                  }}
                  transition={{
                    width: { type: 'spring', stiffness: 200, damping: 25 },
                    background: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                  }}
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
                cursor: isCompleted ? 'pointer' : 'default',
              }}
              onClick={() => handleStepClick(i)}
              title={STEP_FULL_NAMES[i]}
              aria-label={`Step ${i + 1} of ${stepCount}: ${STEP_FULL_NAMES[i]}${isCompleted ? ' (completed)' : isActive ? ' (current)' : ''}`}
            >
              {/* Indicator dot or checkmark */}
              <motion.div
                animate={isActive ? {
                  scale: [1, 1.1, 1],
                } : { scale: 1 }}
                transition={isActive ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                } : { duration: 0.2 }}
                whileHover={isCompleted ? { scale: 1.2 } : {}}
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
                  transition: 'background 0.2s ease, border 0.2s ease',
                }}
              >
                <AnimatePresence mode="wait">
                  {isCompleted && (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <Checkmark color="#FFFFFF" />
                    </motion.div>
                  )}
                  {isActive && (
                    <motion.div
                      key="dot"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: T.primary,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

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
                  textDecoration: isCompleted ? 'none' : 'none',
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
