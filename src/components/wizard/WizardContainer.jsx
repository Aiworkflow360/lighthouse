import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T } from '../../constants/theme';
import { ProgressBar } from '../shared/ProgressBar';
import { StepCondition } from './StepCondition';
import { StepPostcode } from './StepPostcode';

// Static per-step encouragement (always visible)
const ENCOURAGEMENT = {
  condition: "Let's find the right support for you.",
  postcode: "Nearly there — one more step!",
};

// Transition micro-copy (shown briefly when arriving FROM a completed step)
const TRANSITION_MESSAGES = {
  postcode: "That helps a lot — we can narrow things down",
};

// Subtle warm amber hue shift per step (barely visible, opacity 0.02-0.03)
const STEP_AMBER_TINT = {
  condition: 'rgba(245, 158, 11, 0.02)',
  postcode: 'rgba(245, 158, 11, 0.03)',
};

export function WizardContainer({ wizard, dark }) {
  const { step, currentStep, back } = wizard;
  const prevStepRef = useRef(step);
  const [transitionMsg, setTransitionMsg] = useState(null);

  // Show transition micro-copy briefly when step advances forward
  useEffect(() => {
    const prevStep = prevStepRef.current;
    prevStepRef.current = step;

    // Only show on forward navigation (not back)
    if (step > prevStep && TRANSITION_MESSAGES[currentStep]) {
      setTransitionMsg(TRANSITION_MESSAGES[currentStep]);
      const timer = setTimeout(() => setTransitionMsg(null), 1800);
      return () => clearTimeout(timer);
    } else {
      setTransitionMsg(null);
    }
  }, [step, currentStep]);

  const steps = {
    condition: <StepCondition wizard={wizard} dark={dark} />,
    postcode: <StepPostcode wizard={wizard} dark={dark} />,
  };

  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  return (
    <div style={{
      maxWidth: T.maxWidth,
      margin: '0 auto',
      padding: `0 ${T.containerPad}`,
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      background: STEP_AMBER_TINT[currentStep] || 'transparent',
      transition: 'background 0.6s ease',
      borderRadius: T.radiusLg,
    }}>
      <div style={{ marginBottom: '12px' }}>
        <ProgressBar step={step - 1} total={2} dark={dark} wizard={wizard} />
      </div>

      {/* Transition micro-copy: fades in/out briefly */}
      <AnimatePresence>
        {transitionMsg && (
          <motion.p
            key="transition-msg"
            initial={{ opacity: 0.3, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            style={{
              fontFamily: T.font,
              fontSize: T.sizeSmall,
              color: T.warm,
              margin: '0 0 12px',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {transitionMsg}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Static per-step encouragement */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentStep + '-msg'}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: T.font,
            fontSize: T.sizeSmall,
            color: subColor,
            margin: '0 0 24px',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {ENCOURAGEMENT[currentStep]}
        </motion.p>
      </AnimatePresence>

      {step > 1 && (
        <motion.button
          onClick={back}
          whileHover={{ x: -3, color: dark ? '#FAFAF9' : '#1C1917' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
          style={{
            background: 'none',
            border: 'none',
            color: dark ? T.textSecondaryDark : T.textSecondary,
            fontFamily: T.font,
            fontSize: T.sizeSmall,
            cursor: 'pointer',
            padding: '12px 16px',
            minHeight: T.touchMin,
            marginBottom: '8px',
            alignSelf: 'flex-start',
          }}
          aria-label="Go back to previous step"
        >
          &larr; Back
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0.3, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ flex: 1 }}
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
