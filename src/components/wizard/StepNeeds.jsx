import { T, CATEGORIES } from '../../constants/theme';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';

const NEED_OPTIONS = [
  { id: 'financial', icon: '\u00A3', label: 'Money & Grants', desc: 'Financial support, benefits, charity grants' },
  { id: 'medical', icon: '\u2695\uFE0F', label: 'Hospital & Medical', desc: 'Specialist centres, treatment, clinical trials' },
  { id: 'emotional', icon: '\u2764\uFE0F', label: 'Someone to Talk To', desc: 'Helplines, counselling, support groups' },
  { id: 'practical', icon: '\u2B50', label: 'Day-to-Day Help', desc: 'Transport, respite, equipment, accommodation' },
];

export function StepNeeds({ wizard, dark }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  const toggle = (id) => {
    wizard.setNeeds(prev =>
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    wizard.setNeeds(['financial', 'medical', 'emotional', 'practical']);
  };

  const handleContinue = () => {
    const finalNeeds = wizard.needs.length > 0 ? wizard.needs : ['financial', 'medical', 'emotional', 'practical'];
    wizard.setNeeds(finalNeeds);
    wizard.goToResults();
  };

  return (
    <div>
      <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
        What help do you need most?
      </h1>
      <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: '0 0 24px', lineHeight: T.lineHeight }}>
        Select as many as you need. We'll prioritise these in your results.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {NEED_OPTIONS.map(opt => (
          <Card
            key={opt.id}
            dark={dark}
            selected={wizard.needs.includes(opt.id)}
            onClick={() => toggle(opt.id)}
            style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <span style={{ fontSize: '28px', lineHeight: 1 }}>{opt.icon}</span>
            <div>
              <div style={{ fontFamily: T.font, fontSize: T.sizeBody, fontWeight: 600, color: textColor }}>
                {opt.label}
              </div>
              <div style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: subColor, marginTop: '2px' }}>
                {opt.desc}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button onClick={handleContinue} variant="primary" size="lg"
          style={{ width: '100%' }}>
          Show my resources
        </Button>
        <button onClick={() => { selectAll(); }} style={{
          background: 'none', border: 'none', color: subColor,
          fontFamily: T.font, fontSize: T.sizeBody, cursor: 'pointer',
          padding: '12px 0',
        }}>
          I don't know — show me everything
        </button>
      </div>
    </div>
  );
}
