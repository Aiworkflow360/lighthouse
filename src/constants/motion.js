// Lighthouse Motion System
// Research-backed animation presets for warm, calming interactions.
// Single source of truth — all motion values should be imported from here.
//
// Design rationale:
// - Health/wellness UIs benefit from organic, spring-based motion over rigid easings
// - Opacity starts at 0.3 (not 0) to avoid harsh pop-in on slow devices
// - Breathing rhythm (4s) aligns with common guided-breathing cadences
// - Stagger caps at 8 items to avoid perceived lag in long lists

/**
 * Spring physics presets for `motion/react` transitions.
 * Prefer springs over duration-based easing for organic, living feel.
 *
 * @property {object} gentle  - Slow, floaty. Hero reveals, onboarding panels.
 * @property {object} calm    - Default for most UI transitions. Balanced weight.
 * @property {object} snappy  - Quick, responsive. Buttons, toggles, selections.
 * @property {object} bouncy  - Playful overshoot. Celebrations, success states.
 * @property {object} stiff   - Critically damped. Progress bars, fills, sliders.
 */
export const springs = {
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  calm: { type: 'spring', stiffness: 200, damping: 20 },
  snappy: { type: 'spring', stiffness: 400, damping: 25 },
  bouncy: { type: 'spring', stiffness: 300, damping: 12 },
  stiff: { type: 'spring', stiffness: 500, damping: 30 },
};

/**
 * Cubic-bezier easing curves for duration-based animations.
 * Use when spring physics aren't appropriate (e.g. CSS transitions, opacity fades).
 *
 * @property {number[]} calm      - Gentle deceleration. Most tween transitions.
 * @property {number[]} enter     - Fast start, slow finish. Elements arriving on screen.
 * @property {number[]} exit      - Slow start, fast finish. Elements leaving screen.
 * @property {number[]} standard  - Material Design standard curve. General purpose.
 * @property {number[]} breathing - Symmetric ease-in-out. Pulsing, ambient loops.
 */
export const ease = {
  calm: [0.25, 0.1, 0.25, 1.0],
  enter: [0.0, 0.0, 0.2, 1.0],
  exit: [0.4, 0.0, 1.0, 1.0],
  standard: [0.4, 0.0, 0.2, 1.0],
  breathing: [0.37, 0, 0.63, 1],
};

/**
 * Duration presets in seconds.
 * Keep most interactions under 0.5s to feel responsive.
 *
 * @property {number} instant   - Micro-interactions (hover state changes).
 * @property {number} fast      - Small element transitions (icon swaps, badge updates).
 * @property {number} normal    - Standard content transitions.
 * @property {number} slow      - Larger layout shifts, modal entrances.
 * @property {number} reveal    - Full-section reveals, page-level transitions.
 * @property {number} breathing - One full breath cycle (inhale + exhale).
 */
export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  reveal: 0.6,
  breathing: 4,
};

/**
 * Stagger delay presets (seconds between sequential children).
 * Pair with `staggerContainer()` to orchestrate list animations.
 *
 * @property {number} fast     - Dense lists (8+ items). Minimal delay to avoid sluggishness.
 * @property {number} normal   - Content cards (3-8 items). Comfortable reading pace.
 * @property {number} slow     - Feature sections (2-4 items). Deliberate reveal.
 * @property {number} dramatic - Hero elements (1-3 items). High-impact entrance.
 */
export const staggers = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
  dramatic: 0.2,
};

// ---------------------------------------------------------------------------
// Reusable animation variants
// Use with <motion.div variants={fadeUp} initial="initial" animate="animate">
// ---------------------------------------------------------------------------

/**
 * Fade in while sliding up. The workhorse variant for content reveals.
 * Starts slightly below final position with reduced opacity.
 */
export const fadeUp = {
  initial: { opacity: 0.3, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

/**
 * Simple opacity fade. Use for overlays, background elements, or
 * when vertical movement would feel disorienting.
 */
export const fadeIn = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Scale up from slightly smaller. Good for modals, cards, tooltips.
 * The 0.95 start scale is subtle enough to avoid "zoom" feeling.
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/**
 * Horizontal slide. Use for lateral navigation (tabs, carousels).
 * Slides in from the right, exits to the left.
 */
export const slideIn = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

/**
 * Continuous breathing animation. Pairs with `durations.breathing`.
 * Use for ambient elements that signal "alive" state (e.g. active indicators).
 * Apply directly: <motion.div {...breathe} />
 */
export const breathe = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
  },
  transition: {
    duration: durations.breathing,
    ease: ease.breathing,
    repeat: Infinity,
  },
};

/**
 * Creates a stagger container variant. Parent must use this so children
 * animate in sequence rather than all at once.
 *
 * @param {number} [stagger=0.08] - Delay in seconds between each child.
 * @returns {object} Variant object with `animate.transition.staggerChildren`.
 *
 * @example
 * <motion.ul variants={staggerContainer(staggers.normal)} initial="initial" animate="animate">
 *   <motion.li variants={fadeUp}>Item 1</motion.li>
 *   <motion.li variants={fadeUp}>Item 2</motion.li>
 * </motion.ul>
 */
export const staggerContainer = (stagger = staggers.normal) => ({
  animate: {
    transition: { staggerChildren: stagger },
  },
});

/**
 * Directional page transition variants for wizard/stepper flows.
 * Pass direction (+1 for forward, -1 for back) to `custom` prop.
 *
 * @example
 * <AnimatePresence mode="wait" custom={direction}>
 *   <motion.div
 *     key={stepIndex}
 *     custom={direction}
 *     variants={pageTransition}
 *     initial="enter"
 *     animate="center"
 *     exit="exit"
 *     transition={springs.calm}
 *   />
 * </AnimatePresence>
 */
export const pageTransition = {
  enter: (direction = 1) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0.3,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction = 1) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

/**
 * Performance guard: cap the number of items that receive stagger delays.
 * Beyond this count, remaining items should animate together to avoid
 * perceptible lag on lower-end devices.
 */
export const MAX_STAGGER_ITEMS = 8;
