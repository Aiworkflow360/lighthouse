import { T } from '../../constants/theme';
import { ProgressBar } from '../shared/ProgressBar';
import { StepCondition } from './StepCondition';
import { StepAge } from './StepAge';
import { StepPostcode } from './StepPostcode';
import { StepNeeds } from './StepNeeds';

export function WizardContainer({ wizard, dark }) {
  const { step, currentStep, back } = wizard;

  const steps = {
    condition: <StepCondition wizard={wizard} dark={dark} />,
    age: <StepAge wizard={wizard} dark={dark} />,
    postcode: <StepPostcode wizard={wizard} dark={dark} />,
    needs: <StepNeeds wizard={wizard} dark={dark} />,
  };

  return (
    <div style={{
      maxWidth: T.maxWidth,
      margin: '0 auto',
      padding: `0 ${T.containerPad}`,
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ marginBottom: '32px' }}>
        <ProgressBar step={step - 1} total={4} dark={dark} />
      </div>

      {step > 1 && (
        <button
          onClick={back}
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
        </button>
      )}

      <div style={{ flex: 1 }}>
        {steps[currentStep]}
      </div>
    </div>
  );
}
