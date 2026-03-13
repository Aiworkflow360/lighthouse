import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { T } from './constants/theme';
import { useDarkMode } from './hooks/useDarkMode';
import { useWizardState } from './hooks/useWizardState';
import { WizardContainer } from './components/wizard/WizardContainer';
import { ResultsContainer } from './components/results/ResultsContainer';

function App() {
  const { dark, toggle } = useDarkMode();
  const wizard = useWizardState();

  const isResults = wizard.currentStep === 'results';

  return (
    <div style={{
      minHeight: '100vh',
      background: dark ? T.bgDark : T.bg,
      fontFamily: T.font,
      fontSize: T.sizeBody,
      color: dark ? T.textDark : T.text,
      lineHeight: T.lineHeight,
      transition: T.transitionSlow,
    }}>
      {/* Header */}
      <header style={{
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <button
          onClick={wizard.restart}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: T.font, fontSize: '20px', fontWeight: 700,
            color: dark ? T.textDark : T.text, padding: 0,
            display: 'flex', alignItems: 'center', gap: '8px',
          }}
          aria-label="Lighthouse - go to start"
        >
          Lighthouse
        </button>
        <button
          onClick={toggle}
          style={{
            background: dark ? T.bgCardDark : T.bgCard,
            border: `1px solid ${dark ? T.borderDark : T.border}`,
            borderRadius: T.radiusFull,
            width: '40px', height: '40px',
            cursor: 'pointer', fontSize: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? '\u2600\uFE0F' : '\uD83C\uDF19'}
        </button>
      </header>

      {/* Landing / Wizard / Results */}
      <main style={{ paddingTop: '8px', paddingBottom: '40px' }}>
        {wizard.currentStep === 'landing' ? (
          <Landing dark={dark} wizard={wizard} />
        ) : isResults ? (
          <ResultsContainer wizard={wizard} dark={dark} />
        ) : (
          <WizardContainer wizard={wizard} dark={dark} />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '24px 20px 40px',
        textAlign: 'center',
        fontFamily: T.font,
        fontSize: T.sizeSmall,
        color: dark ? T.textMutedDark : T.textMuted,
        borderTop: `1px solid ${dark ? T.borderDark : T.border}`,
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <p style={{ margin: '0 0 8px' }}>
          Lighthouse is free, open source, and does not store any personal data.
        </p>
        <p style={{ margin: 0 }}>
          Need to talk? Samaritans: <a href="tel:116123" style={{ color: 'inherit', fontWeight: 600 }}>116 123</a> (24/7, free)
        </p>
      </footer>
    </div>
  );
}

function Landing({ dark, wizard }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  return (
    <div style={{
      maxWidth: T.maxWidth,
      margin: '0 auto',
      padding: `40px ${T.containerPad}`,
      textAlign: 'center',
    }}>
      <h1 style={{
        fontFamily: T.font, fontSize: '32px', fontWeight: 700,
        color: textColor, margin: '0 0 16px', lineHeight: '1.3',
      }}>
        Every resource.<br />One place.<br />No signup.
      </h1>
      <p style={{
        fontFamily: T.font, fontSize: T.sizeBody, color: subColor,
        margin: '0 0 32px', lineHeight: T.lineHeight,
        maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto',
      }}>
        Find hospitals, grants, charities, and support groups for families of seriously ill children. Personalised to your child's diagnosis and location. Free forever.
      </p>
      <button
        onClick={wizard.next}
        style={{
          background: T.primary,
          color: '#FFFFFF',
          border: 'none',
          borderRadius: T.radius,
          padding: '18px 40px',
          fontFamily: T.font,
          fontSize: T.sizeBody,
          fontWeight: 700,
          cursor: 'pointer',
          minHeight: T.touchMin,
          boxShadow: T.shadowMd,
          transition: T.transition,
        }}
      >
        Find resources for my family
      </button>
      <p style={{
        fontFamily: T.font, fontSize: T.sizeSmall, color: T.textMuted,
        marginTop: '16px',
      }}>
        Takes about 60 seconds. No account needed.
      </p>
    </div>
  );
}

export default App;
