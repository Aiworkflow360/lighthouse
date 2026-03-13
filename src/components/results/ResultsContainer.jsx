import { useState, useMemo } from 'react';
import { T, CATEGORIES } from '../../constants/theme';
import { ResourceCard } from './ResourceCard';
import { Button } from '../shared/Button';
import { DEMO_RESOURCES } from '../../lib/demoData';

export function ResultsContainer({ wizard, dark }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [copied, setCopied] = useState(false);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  // Phase 1: filter demo data by wizard state
  // Phase 2: this becomes a Supabase query
  const resources = useMemo(() => {
    let filtered = DEMO_RESOURCES;

    // Filter by selected needs
    if (wizard.needs.length > 0 && wizard.needs.length < 4) {
      filtered = filtered.filter(r => wizard.needs.includes(r.category));
    }

    // Filter by condition category if set
    if (wizard.conditionCategory) {
      filtered = filtered.filter(r =>
        !r.conditionCategory || r.conditionCategory === wizard.conditionCategory || r.conditionCategory === 'all'
      );
    }

    // Sort: condition-specific first, then by category priority
    filtered.sort((a, b) => {
      const aSpecific = a.conditionCategory && a.conditionCategory !== 'all' ? 0 : 1;
      const bSpecific = b.conditionCategory && b.conditionCategory !== 'all' ? 0 : 1;
      return aSpecific - bSpecific;
    });

    return filtered;
  }, [wizard.needs, wizard.conditionCategory]);

  const displayed = activeFilter === 'all'
    ? resources
    : resources.filter(r => r.category === activeFilter);

  const handleShare = async () => {
    const url = wizard.getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for hospital wifi / restricted browsers
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const conditionLabel = wizard.condition || (wizard.conditionCategory ?
    wizard.conditionCategory.charAt(0).toUpperCase() + wizard.conditionCategory.slice(1) + ' conditions' :
    'all conditions');

  return (
    <div style={{
      maxWidth: T.maxWidth,
      margin: '0 auto',
      padding: `0 ${T.containerPad}`,
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: '0 0 8px', fontWeight: 700 }}>
          We found {resources.length} resources for you
        </h1>
        <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: 0, lineHeight: T.lineHeight }}>
          For {conditionLabel}
          {wizard.postcodeData ? ` near ${wizard.postcodeData.localAuthority || wizard.postcodeData.outcode}` : ' (nationwide)'}
        </p>
      </div>

      {/* Crisis banner */}
      <div style={{
        background: dark ? '#3B1C1C' : '#FEF2F2',
        border: `1px solid ${dark ? '#7F1D1D' : '#FECACA'}`,
        borderRadius: T.radius,
        padding: '14px 18px',
        marginBottom: '24px',
        fontFamily: T.font,
        fontSize: T.sizeSmall,
        color: dark ? '#FCA5A5' : '#991B1B',
        lineHeight: '1.5',
      }}>
        <strong>Need to talk right now?</strong> Samaritans: <a href="tel:116123" style={{ color: 'inherit', fontWeight: 700 }}>116 123</a> (24/7, free)
        {' '}&bull;{' '}
        NSPCC: <a href="tel:08088005000" style={{ color: 'inherit', fontWeight: 700 }}>0808 800 5000</a>
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex', gap: '8px', marginBottom: '20px',
        overflowX: 'auto', paddingBottom: '4px',
      }}>
        <FilterTab label="All" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} dark={dark}
          count={resources.length} />
        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const count = resources.filter(r => r.category === key).length;
          if (count === 0) return null;
          return (
            <FilterTab key={key} label={cat.label} active={activeFilter === key}
              onClick={() => setActiveFilter(key)} dark={dark} color={cat.color} count={count} />
          );
        })}
      </div>

      {/* Resource cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {displayed.map((r, i) => (
          <ResourceCard key={r.id || i} resource={r} dark={dark} />
        ))}
      </div>

      {displayed.length === 0 && (
        <div style={{
          fontFamily: T.font, fontSize: T.sizeBody, color: subColor,
          textAlign: 'center', padding: '40px 20px',
        }}>
          No resources found for this filter. Try selecting "All" above.
        </div>
      )}

      {/* Actions */}
      <div style={{
        marginTop: '32px', paddingTop: '24px',
        borderTop: `1px solid ${dark ? T.borderDark : T.border}`,
        display: 'flex', flexDirection: 'column', gap: '12px',
        paddingBottom: '40px',
      }}>
        <Button onClick={handleShare} variant="outline" style={{ width: '100%' }}>
          {copied ? 'Link copied!' : 'Share these results'}
        </Button>
        <Button onClick={() => window.print()} variant="ghost" style={{ width: '100%' }}>
          Print this page
        </Button>
        <Button onClick={wizard.restart} variant="ghost" style={{ width: '100%' }}>
          Start again
        </Button>
      </div>
    </div>
  );
}

function FilterTab({ label, active, onClick, dark, color, count }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: T.font,
      fontSize: T.sizeSmall,
      fontWeight: active ? 700 : 500,
      color: active ? '#FFFFFF' : (dark ? T.textSecondaryDark : T.textSecondary),
      background: active ? (color || T.primary) : 'transparent',
      border: `1.5px solid ${active ? (color || T.primary) : (dark ? T.borderDark : T.border)}`,
      borderRadius: T.radiusFull,
      padding: '8px 16px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      minHeight: '36px',
      transition: T.transition,
    }}>
      {label} ({count})
    </button>
  );
}
