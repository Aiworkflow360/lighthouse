import { T } from '../../constants/theme';

export function Card({ children, dark, selected, onClick, style, ...props }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      style={{
        background: dark ? T.bgCardDark : T.bgCard,
        border: `2px solid ${selected ? T.primary : (dark ? T.borderDark : T.border)}`,
        borderRadius: T.radiusLg,
        padding: '20px',
        cursor: onClick ? 'pointer' : 'default',
        transition: T.transition,
        boxShadow: selected ? `0 0 0 3px ${T.primaryLight}` : T.shadow,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
