import { motion, AnimatePresence } from 'motion/react';
import { T, CATEGORIES } from '../../constants/theme';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';

const NEED_OPTIONS = [
  { id: 'financial', icon: '\u00A3', label: 'Money & Grants', desc: 'Financial support, benefits, charity grants' },
  { id: 'medical', icon: '\u2695\uFE0F', label: 'Health & Therapies', desc: 'Specialist centres, therapies, assessments, CAMHS' },
  { id: 'emotional', icon: '\u2764\uFE0F', label: 'Someone to Talk To', desc: 'Helplines, counselling, peer support, parent groups' },
  { id: 'practical', icon: '\u2B50', label: 'Day-to-Day Help', desc: 'Transport, respite, equipment, adaptations, accommodation' },
  { id: 'education', icon: '\uD83C\uDF93', label: 'Education & EHCP', desc: 'SEN support, EHCPs, school adaptations, educational psychology' },
];

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

export function StepNeeds({ wizard, dark }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const selectionCount = wizard.needs.length;

  const toggle = (id) => {
    wizard.setNeeds(prev =>
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    wizard.setNeeds(['financial', 'medical', 'emotional', 'practical', 'education']);
  };

  const handleContinue = () => {
    const finalNeeds = wizard.needs.length > 0 ? wizard.needs : ['financial', 'medical', 'emotional', 'practical', 'education'];
    wizard.setNeeds(finalNeeds);
    wizard.goToResults();
  };

  // Button prominence increases as more selections are made
  const buttonShadow = selectionCount === 0
    ? T.shadow
    : selectionCount <= 2
      ? T.shadowMd
      : T.shadowLg;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h1 style={{ fontFamily: T.font, fontSize: T.sizeH1, color: textColor, margin: 0, fontWeight: 700 }}>
          What help do you need most?
        </h1>
        <AnimatePresence>
          {selectionCount > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              style={{
                background: T.primary,
                color: T.primaryText,
                fontFamily: T.font,
                fontSize: T.sizeSmall,
                fontWeight: 700,
                width: '28px',
                height: '28px',
                borderRadius: T.radiusFull,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {selectionCount}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <p style={{ fontFamily: T.font, fontSize: T.sizeBody, color: subColor, margin: '0 0 24px', lineHeight: T.lineHeight }}>
        Select as many as you need. We'll prioritise these in your results.
      </p>

      <motion.div
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {NEED_OPTIONS.map(opt => {
          const isSelected = wizard.needs.includes(opt.id);
          return (
            <motion.div
              key={opt.id}
              variants={staggerItem}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              whileTap={{ scale: 0.97 }}
            >
              <Card
                dark={dark}
                selected={isSelected}
                onClick={() => toggle(opt.id)}
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.span
                  animate={isSelected ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ fontSize: '28px', lineHeight: 1 }}
                >
                  {opt.icon}
                </motion.span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.font, fontSize: T.sizeBody, fontWeight: 600, color: textColor }}>
                    {opt.label}
                  </div>
                  <div style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: subColor, marginTop: '2px' }}>
                    {opt.desc}
                  </div>
                </div>
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: T.radiusFull,
                        background: T.primary,
                        color: T.primaryText,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {'\u2713'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      >
        <motion.div
          animate={{
            boxShadow: buttonShadow,
          }}
          transition={{ duration: 0.3 }}
          style={{ borderRadius: T.radius }}
        >
          <Button onClick={handleContinue} variant="primary" size="lg"
            style={{ width: '100%' }}>
            {selectionCount > 0
              ? `Show my resources (${selectionCount} selected)`
              : 'Show my resources'}
          </Button>
        </motion.div>
        <motion.button
          onClick={() => { selectAll(); }}
          whileHover={{ color: T.primary }}
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'none', border: 'none', color: subColor,
            fontFamily: T.font, fontSize: T.sizeBody, cursor: 'pointer',
            padding: '12px 0',
          }}
        >
          Show me everything -- I'm not sure what I need yet
        </motion.button>
      </motion.div>
    </div>
  );
}
