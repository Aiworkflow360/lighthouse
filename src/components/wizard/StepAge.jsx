import { motion } from 'motion/react';
import { T } from '../../constants/theme';
import { AGE_RANGES } from '../../constants/conditions';
import { Card } from '../shared/Card';

const AGE_ICONS = {
  prenatal: '\u{1F933}',   // pregnant / expecting
  under1: '\u{1F476}',     // baby
  '1-4': '\u{1F9D2}',      // child
  '5-11': '\u{1F9D1}',     // person
  '12-17': '\u{1F393}',    // graduation cap (teen)
  '18-25': '\u{1F9D1}\u200D\u{1F393}', // young adult
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 16, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
};

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

      <motion.div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {AGE_RANGES.map(range => {
          const isSelected = wizard.age === range.id;
          return (
            <motion.div
              key={range.id}
              variants={staggerItem}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              whileTap={{ scale: 0.94 }}
              animate={isSelected ? { scale: [1, 1.06, 1] } : { scale: 1 }}
            >
              <Card
                dark={dark}
                selected={isSelected}
                onClick={() => handleSelect(range)}
                style={{
                  padding: '20px',
                  textAlign: 'center',
                  minHeight: '72px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '24px', lineHeight: 1 }}>
                  {AGE_ICONS[range.id] || ''}
                </span>
                <span style={{
                  fontFamily: T.font,
                  fontSize: range.id === 'prenatal' ? '16px' : '20px',
                  fontWeight: 600,
                  color: textColor,
                }}>
                  {range.label}
                </span>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
