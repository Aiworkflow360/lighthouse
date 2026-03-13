import { T } from '../../constants/theme';

export function Button({ children, onClick, variant = 'primary', size = 'md', disabled, style, ...props }) {
  const base = {
    fontFamily: T.font,
    fontSize: size === 'lg' ? '18px' : '16px',
    fontWeight: 600,
    border: 'none',
    borderRadius: T.radius,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: T.transition,
    minHeight: T.touchMin,
    padding: size === 'lg' ? '16px 32px' : '12px 24px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    opacity: disabled ? 0.5 : 1,
    width: size === 'full' ? '100%' : undefined,
  };

  const variants = {
    primary: { background: T.primary, color: T.primaryText },
    secondary: { background: T.secondary, color: '#FFFFFF' },
    outline: { background: 'transparent', color: T.primary, border: `2px solid ${T.primary}` },
    ghost: { background: 'transparent', color: T.textSecondary },
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...variants[variant], ...style }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
