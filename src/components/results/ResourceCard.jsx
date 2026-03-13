import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T, CATEGORIES } from '../../constants/theme';

// Shimmer keyframes for the award badge
const shimmerStyle = {
  position: 'absolute',
  top: 0,
  left: '-100%',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
  borderRadius: T.radiusFull,
};

export function ResourceCard({ resource, dark }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const cat = CATEGORIES[resource.category] || CATEGORIES.practical;

  // Gradient for left border stripe
  const stripeGradient = `linear-gradient(180deg, ${cat.color} 0%, ${cat.color}BB 100%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: dark ? T.bgCardDark : T.bgCard,
        border: `1px solid ${dark ? T.borderDark : T.border}`,
        borderRadius: T.radiusLg,
        padding: '20px',
        boxShadow: hovered ? T.shadowCardHover : T.shadow,
        borderLeft: `5px solid transparent`,
        backgroundImage: `linear-gradient(${dark ? T.bgCardDark : T.bgCard}, ${dark ? T.bgCardDark : T.bgCard}), ${stripeGradient}`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
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
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Shimmer effect on first appearance */}
            <motion.div
              initial={{ left: '-100%' }}
              animate={{ left: '110%' }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
              style={shimmerStyle}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>
              Up to &pound;{Number(resource.max_award_gbp).toLocaleString()}
            </span>
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
          display: 'inline-flex', alignItems: 'center', gap: '4px',
        }}
      >
        {expanded ? 'Show less' : 'How to apply'}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{ display: 'inline-block', lineHeight: 1 }}
        >
          &#9660;
        </motion.span>
      </button>

      {/* Expandable content with smooth height animation */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {resource.how_to_apply && (
                <div style={{ fontFamily: T.font, fontSize: T.sizeBody, color: textColor, lineHeight: T.lineHeight }}>
                  {resource.how_to_apply}
                </div>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                {resource.apply_url && (
                  <motion.a
                    href={resource.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    style={{
                      fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                      color: '#FFFFFF', background: T.primary,
                      padding: '10px 20px', borderRadius: T.radius,
                      textDecoration: 'none', display: 'inline-block',
                      minHeight: T.touchMin, lineHeight: '28px',
                    }}
                  >
                    Visit website &rarr;
                  </motion.a>
                )}
                {resource.apply_phone && (
                  <motion.a
                    href={`tel:${resource.apply_phone}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    style={{
                      fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                      color: T.primary, background: T.primaryLight,
                      padding: '10px 20px', borderRadius: T.radius,
                      textDecoration: 'none', display: 'inline-block',
                      minHeight: T.touchMin, lineHeight: '28px',
                    }}
                  >
                    Call {resource.apply_phone}
                  </motion.a>
                )}
              </div>
              {resource.turnaround_days && (
                <div style={{ fontFamily: T.font, fontSize: T.sizeSmall, color: subColor, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '14px' }}>&#128339;</span> Typical response time: {resource.turnaround_days} days
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
