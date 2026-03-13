import { T } from '../../constants/theme';

export function ProgressBar({ step, total, dark }) {
  return (
    <div style={{ display: 'flex', gap: '6px', padding: '0 4px' }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: '4px',
            borderRadius: '2px',
            background: i <= step ? T.primary : (dark ? T.borderDark : T.border),
            transition: T.transitionSlow,
          }}
        />
      ))}
    </div>
  );
}
