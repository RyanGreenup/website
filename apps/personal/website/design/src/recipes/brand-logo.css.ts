import { recipe } from '@vanilla-extract/recipes'

import { radius, space, tracking } from '../tokens'

/**
 * Bespoke brand-mark geometry. These literals are intentionally owned by the
 * logo rather than the shared token scale — they are identity constants, not
 * reusable spacing/size steps. Everything that *can* come from the design
 * contract (radii, spacing, tracking) is imported from the tokens.
 */
const MARK = {
  sm: { box: '36px', radius: '10px', glyph: '21px' },
  md: { box: '52px', radius: '14px', glyph: '30px' },
} as const

const WORD_SIZE = {
  // 20px
  sm: '1.25rem',
  // 27px
  md: '1.6875rem',
} as const

/** The outer lock-up: mark + wordmark on a single baseline. */
export const lock = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'fit-content',
  },
  variants: {
    tone: {
      default: {},
      onbrand: {
        background: 'var(--accent)',
        borderRadius: radius.lg,
      },
      // Dark panel: no wrapper fill (the panel itself is the dark surface).
      ondark: {},
    },
    size: {
      sm: { gap: space['2'] },
      md: { gap: space['3'] },
    },
  },
  compoundVariants: [
    {
      variants: { tone: 'onbrand', size: 'sm' },
      style: { padding: `${space['2']} ${space['3']}` },
    },
    {
      variants: { tone: 'onbrand', size: 'md' },
      style: { padding: `${space['3']} ${space['4']}` },
    },
  ],
  defaultVariants: { tone: 'default', size: 'md' },
})

/**
 * The rounded glyph tile. Sets `color`, which the inline SVG inherits through
 * `stroke="currentColor"`, so the mark and its glyph stay in lock-step.
 */
export const mark = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  variants: {
    tone: {
      default: {
        background: 'var(--accent)',
        color: 'var(--fg-on-accent)',
      },
      onbrand: {
        background: 'var(--fg-on-accent)',
        color: 'var(--accent)',
      },
      // Dark panel: accent tile + white glyph (same as default).
      ondark: {
        background: 'var(--accent)',
        color: 'var(--fg-on-accent)',
      },
    },
    size: {
      sm: { width: MARK.sm.box, height: MARK.sm.box, borderRadius: MARK.sm.radius },
      md: { width: MARK.md.box, height: MARK.md.box, borderRadius: MARK.md.radius },
    },
  },
  defaultVariants: { tone: 'default', size: 'md' },
})

/** The transfer-arrow glyph itself; colour is inherited from the mark. */
export const glyph = recipe({
  base: {
    display: 'block',
  },
  variants: {
    size: {
      sm: { width: MARK.sm.glyph, height: MARK.sm.glyph },
      md: { width: MARK.md.glyph, height: MARK.md.glyph },
    },
  },
  defaultVariants: { size: 'md' },
})

/** The "Uni" half of the wordmark (the plain, semibold weight). */
export const word = recipe({
  base: {
    fontWeight: '600',
    letterSpacing: tracking.tight,
    lineHeight: '1',
    whiteSpace: 'nowrap',
  },
  variants: {
    tone: {
      default: { color: 'var(--fg-primary)' },
      onbrand: { color: 'var(--fg-on-accent)' },
      // White wordmark for a dark surface (the auth brand panel). The mark tile
      // stays accent + white glyph (see `mark` below), so only the text reverses.
      ondark: { color: 'var(--fg-on-accent)' },
    },
    size: {
      sm: { fontSize: WORD_SIZE.sm },
      md: { fontSize: WORD_SIZE.md },
    },
  },
  defaultVariants: { tone: 'default', size: 'md' },
})

/** The bold "Remit" emphasis; accent on light, reversed on the brand fill. */
export const emphasis = recipe({
  base: {
    fontWeight: '700',
  },
  variants: {
    tone: {
      default: { color: 'var(--accent)' },
      onbrand: { color: 'var(--fg-on-accent)' },
      // On the dark panel the whole wordmark reads white.
      ondark: { color: 'var(--fg-on-accent)' },
    },
  },
  defaultVariants: { tone: 'default' },
})
