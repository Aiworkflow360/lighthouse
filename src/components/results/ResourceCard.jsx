import { useState } from 'react';
import { T, CATEGORIES } from '../../constants/theme';

export function ResourceCard({ resource, dark }) {
  const [expanded, setExpanded] = useState(false);
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const cat = CATEGORIES[resource.category] || CATEGORIES.practical;

  return (
    <div style={{
      background: dark ? T.bgCardDark : T.bgCard,
      border: `1px solid ${dark ? T.borderDark : T.border}`,
      borderRadius: T.radiusLg,
      padding: '20px',
      boxShadow: T.shadow,
      borderLeft: `4px solid ${cat.color}`,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
            color: cat.color, textTransform: 'uppercase', letterSpacing: '0.5px',
            marginBottom: '4px',
          }}>
            {cat.label}
          </div>
          <h3 style={{
            fontFamily: T.font, fontSize: T.sizeH3, fontWeight: 700,
            color: textColor, margin: '0 0 4px',
          }}>
            {resource.title}
          </h3>
          {resource.organisation && (
            <div style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: subColor }}>
              {resource.organisation}
            </div>
          )}
        </div>
        {resource.max_award_gbp && (
          <div style={{
            fontFamily: T.font, fontSize: '16px', fontWeight: 700,
            color: T.financial, background: T.financialLight,
            padding: '4px 10px', borderRadius: T.radiusFull,
            whiteSpace: 'nowrap',
          }}>
            Up to &pound;{Number(resource.max_award_gbp).toLocaleString()}
          </div>
        )}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: T.font, fontSize: T.sizeBody, color: subColor,
        margin: '12px 0', lineHeight: T.lineHeight,
      }}>
        {resource.description}
      </p>

      {/* Eligibility summary */}
      {resource.eligibility_summary && (
        <div style={{
          fontFamily: T.font, fontSize: T.sizeSmall, color: textColor,
          background: dark ? T.bgHoverDark : '#F5F5F4',
          padding: '10px 14px', borderRadius: '8px', marginBottom: '12px',
          lineHeight: '1.5',
        }}>
          <strong>Who can apply:</strong> {resource.eligibility_summary}
        </div>
      )}

      {/* Expand/collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: 'none', border: 'none', color: T.primary,
          fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
          cursor: 'pointer', padding: '4px 0',
        }}
      >
        {expanded ? 'Show less' : 'How to apply'} {expanded ? '\u25B2' : '\u25BC'}
      </button>

      {expanded && (
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {resource.how_to_apply && (
            <div style={{ fontFamily: T.font, fontSize: T.sizeBody, color: textColor, lineHeight: T.lineHeight }}>
              {resource.how_to_apply}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
            {resource.apply_url && (
              <a href={resource.apply_url} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                color: '#FFFFFF', background: T.primary,
                padding: '10px 20px', borderRadius: T.radius,
                textDecoration: 'none', display: 'inline-block',
                minHeight: T.touchMin, lineHeight: '28px',
              }}>
                Visit website &rarr;
              </a>
            )}
            {resource.apply_phone && (
              <a href={`tel:${resource.apply_phone}`} style={{
                fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                color: T.primary, background: T.primaryLight,
                padding: '10px 20px', borderRadius: T.radius,
                textDecoration: 'none', display: 'inline-block',
                minHeight: T.touchMin, lineHeight: '28px',
              }}>
                Call {resource.apply_phone}
              </a>
            )}
          </div>
          {resource.turnaround_days && (
            <div style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: subColor, marginTop: '4px' }}>
              Typical response time: {resource.turnaround_days} days
            </div>
          )}
        </div>
      )}
    </div>
  );
}
