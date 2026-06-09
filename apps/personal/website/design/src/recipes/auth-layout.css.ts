import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { space } from '../tokens'

/**
 * Auth screen layout — the responsive split panel that hosts the brand panel
 * beside the form panel.
 *
 * `base` carries only mode-invariant layout tokens (grid tracks, spacing). The
 * surfaces it frames (brand panel, form card) bring their own colour from the
 * typed contract, so this file holds no colour at all.
 *
 * Responsive: desktop two-column split → tablet stacked band (≤960px) where the
 * brand panel becomes a horizontal header above the form.
 */
export const authSplit = recipe({
  base: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(440px, 46%)',
    '@media': {
      'screen and (max-width: 960px)': {
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr',
      },
    },
  },
  variants: {
    /**
     * Which side the brand panel sits on (desktop). `AuthLayout` renders the two
     * slots in DOM order to match (brand-first for `left`, form-first for
     * `right`), so this only swaps the track sizing.
     */
    side: {
      left: {},
      right: { gridTemplateColumns: 'minmax(440px, 46%) minmax(0, 1fr)' },
    },
  },
  defaultVariants: { side: 'left' },
})

/** The form column: centres the auth card in the available space. */
export const authFormPanel = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: `${space['12']} ${space['10']}`, // 48px 40px
  '@media': {
    'screen and (max-width: 960px)': { padding: space['10'] },
    'screen and (max-width: 600px)': {
      padding: `${space['8']} ${space['6']} ${space['10']}`, // 32px 24px 40px
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
  },
})

/** The auth card itself — a fixed-width column the form fields flow down. */
export const authCard = style({
  width: '100%',
  maxWidth: '25.5rem', // 408px
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    'screen and (max-width: 600px)': { maxWidth: '100%' },
  },
})
