import { motion } from 'motion/react';

/**
 * LighthouseLogo — 3 variants:
 *   'hero'    (~120px) Full lighthouse, animated warm amber beam as hero element
 *   'header'  (~36px)  Simplified tower silhouette + glowing amber dot
 *   'favicon' (~32px)  Amber beam burst only — no tower
 */
export function LighthouseLogo({ variant = 'header' }) {
  if (variant === 'hero') return <HeroLogo />;
  if (variant === 'favicon') return <FaviconLogo />;
  return <HeaderLogo />;
}

/* ── Hero variant ─────────────────────────────────────────── */
function HeroLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={120}
      height={120}
      role="img"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <radialGradient id="lh-hero-glow" cx="50%" cy="22%" r="40%">
          <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lh-beam-l" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lh-beam-r" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Warm ambient glow behind lantern — animated pulse */}
      <motion.circle
        cx="60"
        cy="26"
        r="40"
        fill="url(#lh-hero-glow)"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6], scale: 1 }}
        transition={{
          opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
          scale: { duration: 1.5, type: 'spring', stiffness: 60, damping: 12 },
        }}
      />

      {/* Left beam ray */}
      <motion.polygon
        points="52,25 4,14 2,30 50,29"
        fill="url(#lh-beam-l)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          opacity: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          },
        }}
        style={{ originX: '50px', originY: '27px' }}
      />
      {/* Entrance animation overlay for left beam */}
      <motion.polygon
        points="52,25 4,14 2,30 50,29"
        fill="url(#lh-beam-l)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 40, damping: 14 }}
        style={{ pointerEvents: 'none' }}
      />

      {/* Right beam ray */}
      <motion.polygon
        points="68,25 116,14 118,30 70,29"
        fill="url(#lh-beam-r)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          opacity: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          },
        }}
        style={{ originX: '70px', originY: '27px' }}
      />
      {/* Entrance animation overlay for right beam */}
      <motion.polygon
        points="68,25 116,14 118,30 70,29"
        fill="url(#lh-beam-r)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, type: 'spring', stiffness: 40, damping: 14 }}
        style={{ pointerEvents: 'none' }}
      />

      {/* Stone base */}
      <path d="M38 102h44l-4-6H42l-4 6z" fill="#A8A29E" />
      <rect x="36" y="102" width="48" height="4" rx="2" fill="#78716C" />

      {/* Tower body — dark navy with white stripe accents */}
      <path d="M46 96h28l3-58H43l3 58z" fill="#1E293B" />
      {/* White stripes */}
      <rect x="44.5" y="50" width="31" height="4" rx="1" fill="#FFFFFF" opacity="0.85" />
      <rect x="45" y="64" width="30" height="4" rx="1" fill="#FFFFFF" opacity="0.85" />
      <rect x="45.5" y="78" width="29" height="4" rx="1" fill="#FFFFFF" opacity="0.85" />

      {/* Door */}
      <rect x="54" y="88" width="12" height="10" rx="6" fill="#0F172A" />
      <circle cx="60" cy="93" r="1" fill="#F59E0B" opacity="0.7" />

      {/* Gallery / walkway */}
      <rect x="40" y="36" width="40" height="3" rx="1" fill="#0F172A" />
      {/* Railing posts */}
      <rect x="42" y="33" width="1.5" height="3" fill="#0F172A" />
      <rect x="47" y="33" width="1.5" height="3" fill="#0F172A" />
      <rect x="71.5" y="33" width="1.5" height="3" fill="#0F172A" />
      <rect x="76.5" y="33" width="1.5" height="3" fill="#0F172A" />
      <rect x="41" y="33" width="38" height="1" rx="0.5" fill="#0F172A" />

      {/* Lantern room */}
      <rect x="50" y="20" width="20" height="13" rx="2" fill="#1E293B" />
      {/* Lantern glass — warm amber */}
      <rect x="52" y="21.5" width="16" height="10" rx="1.5" fill="#F59E0B" opacity="0.9" />
      {/* Window mullions */}
      <rect x="59.5" y="21.5" width="1" height="10" fill="#1E293B" opacity="0.6" />

      {/* Dome cap */}
      <path d="M54 20 Q60 10 66 20z" fill="#1E293B" />
      {/* Spire */}
      <line x1="60" y1="10" x2="60" y2="6" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="5" r="1.5" fill="#F59E0B" />

      {/* Inner lantern glow — bright centre */}
      <motion.circle
        cx="60"
        cy="26"
        r="5"
        fill="#FDE68A"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
        }}
      />
    </svg>
  );
}

/* ── Header variant ───────────────────────────────────────── */
function HeaderLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      width={36}
      height={36}
      role="img"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Tower silhouette */}
      <path d="M14 32h8l1.5-22h-11L14 32z" fill="#1E293B" />
      {/* Base */}
      <rect x="12" y="32" width="12" height="2" rx="1" fill="#78716C" />
      {/* Gallery */}
      <rect x="11.5" y="9" width="13" height="1.5" rx="0.5" fill="#1E293B" />
      {/* Lantern room */}
      <rect x="14" y="5" width="8" height="4.5" rx="1" fill="#1E293B" />
      {/* Dome */}
      <path d="M16 5 Q18 2 20 5z" fill="#1E293B" />

      {/* Amber dot at top — breathing glow */}
      <motion.circle
        cx="18"
        cy="7"
        r="3.5"
        fill="#FBBF24"
        opacity={0.3}
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="18"
        cy="7"
        r="2"
        fill="#F59E0B"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx="18" cy="7" r="1" fill="#FDE68A" opacity="0.9" />
    </svg>
  );
}

/* ── Favicon variant ──────────────────────────────────────── */
function FaviconLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={32}
      height={32}
      role="img"
      aria-hidden="true"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/* Outer glow circle */}
      <circle cx="16" cy="16" r="14" fill="#FBBF24" opacity="0.15" />
      <circle cx="16" cy="16" r="10" fill="#FBBF24" opacity="0.25" />

      {/* Radiating lines — beam burst */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="16"
          y1="16"
          x2={16 + 12 * Math.cos((angle * Math.PI) / 180)}
          y2={16 + 12 * Math.sin((angle * Math.PI) / 180)}
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}

      {/* Centre bright circle */}
      <circle cx="16" cy="16" r="5" fill="#F59E0B" />
      <circle cx="16" cy="16" r="3" fill="#FDE68A" />
    </svg>
  );
}
