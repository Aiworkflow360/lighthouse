import { useState } from 'react';
import { T } from '../../constants/theme';
import { lookupPostcode } from '../../lib/postcodes';
import { Button } from '../shared/Button';

export function StepPostcode({ wizard, dark }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  const handleLookup = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    const data = await lookupPostcode(input);
    setLoading(false);
    if (data) {
      wizard.setPostcode(input.trim().toUpperCase());
      wizard.setPostcodeData(data);
      wizard.next();
    } else {
      setError("We couldn't find that postcode. Please check and try again.");
    }
  };

  const handleSkip = () => {
    wizard.setPostcode(null);
    wizard.setPostcodeData(null);
    wizard.next();
  };

  return (
    <div>
      <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
        What's your postcode?
      </h1>
      <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: '0 0 8px', lineHeight: T.lineHeight }}>
        This helps us find local hospitals, support groups, and services near you.
      </p>
      <p style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: T.textMuted, margin: '0 0 24px' }}>
        We don't store your full postcode. We only use the first half to find your area.
      </p>

      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setError(''); }}
          onKeyDown={e => { if (e.key === 'Enter') handleLookup(); }}
          placeholder="e.g. SW1A 1AA"
          autoFocus
          style={{
            flex: 1,
            padding: '16px 20px',
            fontFamily: T.font,
            fontSize: T.sizeBody,
            border: `2px solid ${error ? T.urgent : (dark ? T.borderDark : T.border)}`,
            borderRadius: T.radius,
            background: dark ? T.bgCardDark : T.bgCard,
            color: textColor,
            outline: 'none',
            minHeight: T.touchMin,
          }}
          aria-label="Enter your postcode"
        />
        <Button onClick={handleLookup} disabled={loading || !input.trim()}>
          {loading ? '...' : 'Find'}
        </Button>
      </div>

      {error && (
        <p style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: T.urgent, marginTop: '12px' }}>
          {error}
        </p>
      )}

      <button onClick={handleSkip} style={{
        background: 'none', border: 'none', color: subColor,
        fontFamily: T.font, fontSize: T.sizeBody, cursor: 'pointer',
        padding: '16px 0', marginTop: '24px', display: 'block',
      }}>
        I'd rather not say — show national resources only
      </button>
    </div>
  );
}
