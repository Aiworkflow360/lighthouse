import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { T } from '../../constants/theme';
import { lookupPostcode } from '../../lib/postcodes';

/* ── Inline SVG icons ────────────────────────────────────── */
function MapPinIcon({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GlobeIcon({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function UsersIcon({ size = 16, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ChevronIcon({ size = 18, color, up }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}
      animate={{ rotate: up ? 180 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

function ExternalLinkIcon({ size = 14, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ── Service link row ────────────────────────────────────── */
function ServiceRow({ icon, label, value, href, type = 'link', dark }) {
  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 0',
      borderBottom: `1px solid ${dark ? T.borderDark : T.border}`,
    }}>
      <div style={{
        width: '32px', height: '32px', minWidth: '32px',
        borderRadius: '8px',
        background: dark ? 'rgba(37,99,235,0.1)' : 'rgba(37,99,235,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: T.font, fontSize: '13px', fontWeight: 500,
          color: subColor, lineHeight: 1.3,
        }}>
          {label}
        </div>
        {href ? (
          <a
            href={href}
            target={type === 'link' ? '_blank' : undefined}
            rel={type === 'link' ? 'noopener noreferrer' : undefined}
            style={{
              fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
              color: T.primary, textDecoration: 'none', lineHeight: 1.4,
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              wordBreak: 'break-word',
            }}
          >
            {value}
            {type === 'link' && <ExternalLinkIcon size={12} color={T.primary} />}
          </a>
        ) : (
          <div style={{
            fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
            color: textColor, lineHeight: 1.4,
          }}>
            {value}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Service section card ────────────────────────────────── */
function ServiceSection({ title, icon, children, dark, color, delay = 0 }) {
  const textColor = dark ? T.textDark : T.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      style={{
        padding: '16px',
        background: dark ? T.bgHoverDark : '#FFFFFF',
        border: `1px solid ${dark ? T.borderDark : T.border}`,
        borderLeft: `4px solid ${color}`,
        borderRadius: T.radius,
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        marginBottom: '8px',
      }}>
        {icon}
        <h3 style={{
          fontFamily: T.font, fontSize: '15px', fontWeight: 700,
          color: textColor, margin: 0,
        }}>
          {title}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

/* ── Postcode input (inline mini form) ───────────────────── */
function PostcodeInput({ dark, onSubmit }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    setError(null);

    const result = await lookupPostcode(value);
    setLoading(false);

    if (result.error) {
      setError(result.message || 'Could not find that postcode');
      return;
    }

    onSubmit(result);
  }, [value, onSubmit]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: '24px 20px',
        textAlign: 'center',
      }}
    >
      <MapPinIcon size={32} color={dark ? T.textMutedDark : T.textMuted} />
      <p style={{
        fontFamily: T.font, fontSize: T.sizeBody, fontWeight: 600,
        color: textColor, margin: '12px 0 4px',
      }}>
        Enter your postcode to see local services
      </p>
      <p style={{
        fontFamily: T.font, fontSize: T.sizeSmall, color: subColor,
        margin: '0 0 16px', lineHeight: '1.5',
      }}>
        We only use the first half to find your area. Nothing is stored.
      </p>
      <form onSubmit={handleSubmit} style={{
        display: 'flex', gap: '8px', maxWidth: '320px', margin: '0 auto',
      }}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="e.g. SW1A 1AA"
          style={{
            flex: 1,
            padding: '10px 14px',
            fontFamily: T.font,
            fontSize: T.sizeSmall,
            border: `1.5px solid ${error ? T.urgent : (dark ? T.borderDark : T.border)}`,
            borderRadius: '8px',
            background: dark ? T.bgDark : '#FFFFFF',
            color: textColor,
            outline: 'none',
            minHeight: '44px',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s ease',
          }}
          onFocus={e => { if (!error) e.target.style.borderColor = T.primary; }}
          onBlur={e => { if (!error) e.target.style.borderColor = dark ? T.borderDark : T.border; }}
        />
        <motion.button
          type="submit"
          disabled={loading || !value.trim()}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '10px 20px',
            fontFamily: T.font,
            fontSize: T.sizeSmall,
            fontWeight: 600,
            color: '#FFFFFF',
            background: T.primary,
            border: 'none',
            borderRadius: '8px',
            cursor: loading || !value.trim() ? 'not-allowed' : 'pointer',
            minHeight: '44px',
            opacity: loading || !value.trim() ? 0.6 : 1,
          }}
        >
          {loading ? 'Looking...' : 'Find'}
        </motion.button>
      </form>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: T.font, fontSize: '13px', color: T.urgent,
            margin: '8px 0 0', fontWeight: 500,
          }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ── Main LocalServicesCard ──────────────────────────────── */
export function LocalServicesCard({ wizard, dark, localServices }) {
  const [cardExpanded, setCardExpanded] = useState(true);
  const [inlinePostcodeData, setInlinePostcodeData] = useState(null);

  const textColor = dark ? T.textDark : T.text;
  const subColor = dark ? T.textSecondaryDark : T.textSecondary;
  const cardBg = dark ? T.bgCardDark : T.bgCard;
  const borderColor = dark ? T.borderDark : T.border;

  // Use wizard postcode data, inline postcode data, or nothing
  const postcodeData = wizard?.postcodeData || inlinePostcodeData;
  const localAuthority = postcodeData?.localAuthority;
  const region = postcodeData?.region;

  // Build service data from props or from postcode data
  const sendiass = localServices?.sendiass || null;
  const localOffer = localServices?.localOffer || null;
  const parentCarerForum = localServices?.parentCarerForum || null;

  // Fallback URLs for when we have a local authority but no specific service data
  const localOfferSearchUrl = localAuthority
    ? `https://www.google.com/search?q=${encodeURIComponent(`${localAuthority} local offer SEND`)}`
    : null;
  const sendiassSearchUrl = localAuthority
    ? `https://www.google.com/search?q=${encodeURIComponent(`${localAuthority} SENDIASS`)}`
    : null;
  const pcfSearchUrl = localAuthority
    ? `https://www.google.com/search?q=${encodeURIComponent(`${localAuthority} parent carer forum`)}`
    : null;

  const hasPostcode = !!postcodeData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderLeft: 'none',
        borderRadius: T.radiusLg,
        padding: 0,
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: T.shadowMd,
      }}
    >
      {/* Gradient left border */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px',
        background: `linear-gradient(180deg, ${T.primary} 0%, ${T.emotional} 100%)`,
        borderRadius: '16px 0 0 16px',
      }} />

      {/* Subtle overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark
          ? 'linear-gradient(135deg, rgba(37,99,235,0.04) 0%, transparent 60%)'
          : 'linear-gradient(135deg, rgba(37,99,235,0.03) 0%, transparent 60%)',
        pointerEvents: 'none', borderRadius: T.radiusLg,
      }} />

      <div style={{ position: 'relative', padding: '20px 20px 20px 24px' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginBottom: cardExpanded ? '4px' : '0',
        }}>
          <MapPinIcon size={20} color={T.primary} />
          <h2 style={{
            fontFamily: T.font, fontSize: T.sizeH2, fontWeight: 700,
            color: textColor, margin: 0, flex: 1,
          }}>
            {hasPostcode
              ? `Local services${localAuthority ? ` in ${localAuthority}` : ''}`
              : 'Local services near you'}
          </h2>
          <button
            onClick={() => setCardExpanded(prev => !prev)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 500,
              color: T.primary, padding: '4px 8px', borderRadius: T.radius,
              transition: T.transition,
            }}
            aria-expanded={cardExpanded}
            aria-label={cardExpanded ? 'Collapse local services' : 'Expand local services'}
          >
            {cardExpanded ? 'Hide' : 'Show'}
            <ChevronIcon size={18} color={T.primary} up={cardExpanded} />
          </button>
        </div>

        {/* Subtitle */}
        {cardExpanded && hasPostcode && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              fontFamily: T.font,
              fontSize: T.sizeSmall,
              color: subColor,
              margin: '0 0 16px',
              lineHeight: '1.5',
            }}
          >
            These free services are available in your area and specialise in supporting families of children with SEND.
          </motion.p>
        )}

        {/* Content */}
        <AnimatePresence initial={false}>
          {cardExpanded && (
            <motion.div
              key="local-services-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              {!hasPostcode ? (
                <PostcodeInput
                  dark={dark}
                  onSubmit={(data) => setInlinePostcodeData(data)}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* SENDIASS */}
                  <ServiceSection
                    title="SENDIASS"
                    icon={<PhoneIcon size={18} color={T.primary} />}
                    dark={dark}
                    color={T.primary}
                    delay={0.15}
                  >
                    <p style={{
                      fontFamily: T.font, fontSize: '13px', color: subColor,
                      margin: '0 0 8px', lineHeight: '1.5',
                    }}>
                      Free, impartial advice on SEN and disability for parents and young people. They can help with EHCPs, school issues, and understanding your rights.
                    </p>
                    {sendiass ? (
                      <div>
                        {sendiass.phone && (
                          <ServiceRow
                            icon={<PhoneIcon size={14} color={T.primary} />}
                            label="Phone"
                            value={sendiass.phone}
                            href={`tel:${sendiass.phone.replace(/\s/g, '')}`}
                            type="phone"
                            dark={dark}
                          />
                        )}
                        {sendiass.email && (
                          <ServiceRow
                            icon={<MailIcon size={14} color={T.primary} />}
                            label="Email"
                            value={sendiass.email}
                            href={`mailto:${sendiass.email}`}
                            type="email"
                            dark={dark}
                          />
                        )}
                        {sendiass.website && (
                          <ServiceRow
                            icon={<GlobeIcon size={14} color={T.primary} />}
                            label="Website"
                            value="Visit website"
                            href={sendiass.website}
                            type="link"
                            dark={dark}
                          />
                        )}
                      </div>
                    ) : (
                      <motion.a
                        href={sendiassSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                          color: T.primary, textDecoration: 'none',
                        }}
                      >
                        Find your local SENDIASS
                        <ExternalLinkIcon size={14} color={T.primary} />
                      </motion.a>
                    )}
                  </ServiceSection>

                  {/* Local Offer */}
                  <ServiceSection
                    title="Local Offer"
                    icon={<GlobeIcon size={18} color={T.secondary} />}
                    dark={dark}
                    color={T.secondary}
                    delay={0.22}
                  >
                    <p style={{
                      fontFamily: T.font, fontSize: '13px', color: subColor,
                      margin: '0 0 8px', lineHeight: '1.5',
                    }}>
                      Every council publishes a "Local Offer" listing all SEND services, support, and activities available in your area.
                    </p>
                    {localOffer ? (
                      <ServiceRow
                        icon={<GlobeIcon size={14} color={T.secondary} />}
                        label="Local Offer website"
                        value={localOffer.name || `${localAuthority} Local Offer`}
                        href={localOffer.url}
                        type="link"
                        dark={dark}
                      />
                    ) : (
                      <motion.a
                        href={localOfferSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                          color: T.secondary, textDecoration: 'none',
                        }}
                      >
                        Find {localAuthority || 'your'} Local Offer
                        <ExternalLinkIcon size={14} color={T.secondary} />
                      </motion.a>
                    )}
                  </ServiceSection>

                  {/* Parent Carer Forum */}
                  <ServiceSection
                    title="Parent Carer Forum"
                    icon={<UsersIcon size={18} color={T.emotional} />}
                    dark={dark}
                    color={T.emotional}
                    delay={0.29}
                  >
                    <p style={{
                      fontFamily: T.font, fontSize: '13px', color: subColor,
                      margin: '0 0 8px', lineHeight: '1.5',
                    }}>
                      Local groups of parents and carers of children with SEND. They share experiences, offer peer support, and help shape local services.
                    </p>
                    {parentCarerForum ? (
                      <div>
                        {parentCarerForum.name && (
                          <ServiceRow
                            icon={<UsersIcon size={14} color={T.emotional} />}
                            label="Forum"
                            value={parentCarerForum.name}
                            href={parentCarerForum.url}
                            type="link"
                            dark={dark}
                          />
                        )}
                        {parentCarerForum.phone && (
                          <ServiceRow
                            icon={<PhoneIcon size={14} color={T.emotional} />}
                            label="Phone"
                            value={parentCarerForum.phone}
                            href={`tel:${parentCarerForum.phone.replace(/\s/g, '')}`}
                            type="phone"
                            dark={dark}
                          />
                        )}
                      </div>
                    ) : (
                      <motion.a
                        href={pcfSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          fontFamily: T.font, fontSize: T.sizeSmall, fontWeight: 600,
                          color: T.emotional, textDecoration: 'none',
                        }}
                      >
                        Find your Parent Carer Forum
                        <ExternalLinkIcon size={14} color={T.emotional} />
                      </motion.a>
                    )}
                  </ServiceSection>

                  {/* National helpline */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                    style={{
                      padding: '12px 16px',
                      background: dark ? 'rgba(245,158,11,0.06)' : 'rgba(245,158,11,0.04)',
                      borderRadius: '8px',
                      borderLeft: `3px solid ${T.warm}`,
                    }}
                  >
                    <p style={{
                      fontFamily: T.font, fontSize: '13px', color: subColor,
                      margin: '0 0 4px', lineHeight: '1.5',
                    }}>
                      <strong style={{ color: textColor }}>IPSEA (national)</strong> provides free legally-based advice on education for children with SEND.
                    </p>
                    <a
                      href="https://www.ipsea.org.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: T.font, fontSize: '13px', fontWeight: 600,
                        color: T.primary, textDecoration: 'none',
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                      }}
                    >
                      ipsea.org.uk <ExternalLinkIcon size={12} color={T.primary} />
                    </a>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
