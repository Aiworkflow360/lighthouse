import { T } from '../../constants/theme';
import { AGE_RANGES } from '../../constants/conditions';
import { Card } from '../shared/Card';

export function StepAge({ wizard, dark }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  const handleSelect = (range) => {
    wizard.setAge(range.id);
    wizard.next();
  };

  return (
    <div>
      <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
        How old is your child?
      </h1>
      <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: '0 0 24px', lineHeight: T.lineHeight }}>
        Some support is age-specific. This helps us show the right resources.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {AGE_RANGES.map(range => (
          <Card
            key={range.id}
            dark={dark}
            selected={wizard.age === range.id}
            onClick={() => handleSelect(range)}
            style={{
              padding: '20px',
              textAlign: 'center',
              minHeight: '72px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{
              fontFamily: T.font,
              fontSize: range.id === 'prenatal' ? '16px' : '20px',
              fontWeight: 600,
              color: textColor,
            }}>
              {range.label}
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}
