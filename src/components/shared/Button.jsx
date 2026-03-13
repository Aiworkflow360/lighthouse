import { motion } from 'motion/react';
import { T } from '../../constants/theme';

const spinKeyframes = {
  rotate: [0, 360],
};

const spinTransition = {
  duration: 0.8,
  repeat: Infinity,
  ease: 'linear',
};

function Spinner({ color = '#FFFFFF' }) {
  return (
    <motion.div
      animate={spinKeyframes}
      transition={spinTransition}
      style={{
        width: '18px',
        height: '18px',
        border: `2px solid ${color}`,
        borderTopColor: 'transparent',
        borderRadius: '50%',
        flexShrink: 0,
      }}
    />
  );
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  loading,
  style,
  ...props
}) {
  const isInteractive = !disabled && !loading;
  const useMotion = variant === 'primary' || variant === 'secondary';

  const base = {
    fontFamily: T.font,
    fontSize: size === 'lg' ? '18px' : '16px',
    fontWeight: 600,
    border: 'none',
    borderRadius: T.radius,
    cursor: isInteractive ? 'pointer' : 'not-allowed',
    minHeight: T.touchMin,
    padding: size === 'lg' ? '16px 32px' : '12px 24px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    opacity: disabled ? 0.5 : 1,
    width: size === 'full' ? '100%' : undefined,
    position: 'relative',
    outline: 'none',
  };

  const variants = {
    primary: {
      background: T.primary,
      color: T.primaryText,
    },
    secondary: {
      background: T.secondary,
      color: '#FFFFFF',
    },
    outline: {
      background: 'transparent',
      color: T.primary,
      border: `2px solid ${T.primary}`,
    },
    ghost: {
      background: 'transparent',
      color: T.textSecondary,
    },
  };

  const hoverProps = (() => {
    if (!isInteractive) return undefined;
    if (variant === 'primary') {
      return { scale: 1.02, y: -1, boxShadow: T.shadowGlow };
    }
    if (variant === 'secondary') {
      return { scale: 1.02, boxShadow: '0 0 40px rgba(5,150,105,0.15)' };
    }
    if (variant === 'ghost') {
      return { backgroundColor: T.bgHover };
    }
    return undefined;
  })();

  const tapProps = isInteractive && (variant === 'primary' || variant === 'secondary')
    ? { scale: 0.97 }
    : undefined;

  const spinnerColor = variant === 'outline' || variant === 'ghost'
    ? T.primary
    : '#FFFFFF';

  return (
    <motion.button
      onClick={isInteractive ? onClick : undefined}
      disabled={disabled || loading}
      whileHover={hoverProps}
      whileTap={tapProps}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{ ...base, ...variants[variant], ...style }}
      {...props}
    >
      {loading ? (
        <>
          <Spinner color={spinnerColor} />
          <span style={{ opacity: 0.8 }}>{children}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
