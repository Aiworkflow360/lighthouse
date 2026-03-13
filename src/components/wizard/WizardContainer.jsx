import { motion, AnimatePresence } from 'motion/react';
import { T } from '../../constants/theme';
import { ProgressBar } from '../shared/ProgressBar';
import { StepCondition } from './StepCondition';
import { StepAge } from './StepAge';
import { StepPostcode } from './StepPostcode';
import { StepNeeds } from './StepNeeds';

const ENCOURAGEMENT = {
  condition: "Let's find the right support for you.",
  age: "Great start -- just a few more details.",
  postcode: "Nearly there -- you're doing brilliantly.",
  needs: "Last step -- almost done!",
};

export function WizardContainer({ wizard, dark }) {
  const { step, currentStep, back } = wizard;

  const steps = {
    condition: <StepCondition wizard={wizard} dark={dark} />,
    age: <StepAge wizard={wizard} dark={dark} />,
    postcode: <StepPostcode wizard={wizard} dark={dark} />,
    needs: <StepNeeds wizard={wizard} dark={dark} />,
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
    }}>
      <div style={{ marginBottom: '12px' }}>
        <ProgressBar step={step - 1} total={4} dark={dark} />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentStep + '-msg'}
          initial={{ opacity: 0 }}
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
            padding: '8px 0',
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ flex: 1 }}
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
