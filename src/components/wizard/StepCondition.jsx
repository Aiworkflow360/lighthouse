import { useState, useMemo } from 'react';
import { T } from '../../constants/theme';
import { COMMON_CONDITIONS, CONDITION_CATEGORIES } from '../../constants/conditions';
import { Card } from '../shared/Card';

export function StepCondition({ wizard, dark }) {
  const [query, setQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return COMMON_CONDITIONS.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.terms.some(t => t.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query]);

  const handleSelect = (condition) => {
    wizard.setCondition(condition.name);
    wizard.setConditionCategory(condition.category);
    wizard.next();
  };

  const handleCategorySelect = (cat) => {
    wizard.setCondition(null);
    wizard.setConditionCategory(cat.id);
    wizard.next();
  };

  const handleDontKnow = () => {
    setShowCategories(true);
  };

  const handleWaiting = () => {
    wizard.setCondition('Awaiting Diagnosis');
    wizard.setConditionCategory(null);
    wizard.next();
  };

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  if (showCategories) {
    return (
      <div>
        <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
          Which area is closest?
        </h1>
        <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: '0 0 24px', lineHeight: T.lineHeight }}>
          We'll show resources for this type of condition.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {CONDITION_CATEGORIES.map(cat => (
            <Card key={cat.id} dark={dark} onClick={() => handleCategorySelect(cat)}
              style={{ padding: '16px 20px' }}>
              <span style={{ fontFamily: T.font, fontSize: T.sizeBody, color: textColor, fontWeight: 500 }}>
                {cat.label}
              </span>
            </Card>
          ))}
        </div>
        <button
          onClick={() => setShowCategories(false)}
          style={{
            background: 'none', border: 'none', color: T.primary,
            fontFamily: T.font, fontSize: T.sizeSmall, cursor: 'pointer',
            padding: '16px 0', marginTop: '8px',
          }}
        >
          &larr; Back to search
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
        What is your child's diagnosis?
      </h1>
      <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: '0 0 24px', lineHeight: T.lineHeight }}>
        Start typing to search, or browse by category.
      </p>

      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="e.g. leukaemia, heart defect, epilepsy..."
        autoFocus
        style={{
          width: '100%',
          padding: '16px 20px',
          fontFamily: T.font,
          fontSize: T.sizeBody,
          border: `2px solid ${dark ? T.borderDark : T.border}`,
          borderRadius: T.radius,
          background: dark ? T.bgCardDark : T.bgCard,
          color: textColor,
          outline: 'none',
          boxSizing: 'border-box',
          minHeight: T.touchMin,
        }}
        aria-label="Search for your child's diagnosis"
      />

      {filtered.length > 0 && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((c, i) => (
            <Card key={i} dark={dark} onClick={() => handleSelect(c)}
              style={{ padding: '14px 20px' }}>
              <div style={{ fontFamily: T.font, fontSize: T.sizeBody, color: textColor, fontWeight: 500 }}>
                {c.name}
              </div>
              <div style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: subColor, marginTop: '2px', textTransform: 'capitalize' }}>
                {c.category}
              </div>
            </Card>
          ))}
        </div>
      )}

      <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button onClick={handleDontKnow} style={{
          background: 'none', border: `2px solid ${dark ? T.borderDark : T.border}`,
          borderRadius: T.radius, padding: '14px 20px', cursor: 'pointer',
          fontFamily: T.font, fontSize: T.sizeBody, color: subColor,
          minHeight: T.touchMin, textAlign: 'left',
        }}>
          I don't know the exact name &rarr;
        </button>
        <button onClick={handleWaiting} style={{
          background: 'none', border: `2px solid ${dark ? T.borderDark : T.border}`,
          borderRadius: T.radius, padding: '14px 20px', cursor: 'pointer',
          fontFamily: T.font, fontSize: T.sizeBody, color: subColor,
          minHeight: T.touchMin, textAlign: 'left',
        }}>
          Still waiting for a diagnosis &rarr;
        </button>
      </div>
    </div>
  );
}
