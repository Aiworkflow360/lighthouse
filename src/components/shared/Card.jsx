import { motion } from 'motion/react';
import { T } from '../../constants/theme';

const springTransition = { type: 'spring', stiffness: 300, damping: 25 };

export function Card({ children, dark, selected, onClick, style, ...props }) {
  const isClickable = !!onClick;

  const borderColor = selected
    ? T.primary
    : dark
      ? T.borderDark
      : T.border;

  const shadowValue = selected
    ? `0 0 0 3px ${T.primaryLight}`
    : T.shadow;

  return (
    <motion.div
      layout
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      animate={{
        borderColor,
        boxShadow: shadowValue,
      }}
      whileHover={
        isClickable
          ? { y: -2, boxShadow: T.shadowCardHover }
          : undefined
      }
      whileTap={
        isClickable
          ? { scale: 0.98 }
          : undefined
      }
      transition={springTransition}
      style={{
        background: dark ? T.bgCardDark : T.bgCard,
        border: `2px solid ${borderColor}`,
        borderRadius: T.radiusLg,
        padding: '20px',
        cursor: isClickable ? 'pointer' : 'default',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
