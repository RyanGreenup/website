import { recipe } from '@vanilla-extract/recipes'

import { font, radius, textSize, tracking } from '../tokens'
import { vars } from '../theme.css'

/**
 * The country-code chip recipe — the single source of truth for `Flag` styling.
 *
 * A tiny standalone atom (AU / NP) used by the corridor display and customer
 * table. No variants: every value is fixed. Colours read the typed role
 * contract (`vars.roles.*`) so the chip flips light/dark automatically;
 * everything else is a mode-invariant static token.
 *
 * Off-grid approximations vs the hi-fi `.flag` (intent, not contract):
 *  - `border-radius: 3px` → `radius.xs` (4px); 3px is below the radius scale.
 *  - `font: … 9px …` → `textSize['3xs']` (10px); 9px is below the type scale and
 *    is a non-recurring one-off, so no new token is added for it.
 *  - `letter-spacing: 0.02em` → `tracking.mono` (exactly 0.02em).
 */
export const flag = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none',
    width: '24px',
    height: '17px',
    borderRadius: radius.xs,
    border: `1px solid ${vars.roles.border.strong}`,
    background: vars.roles.bg.sunken,
    color: vars.roles.fg.muted,
    fontFamily: font.sans,
    fontWeight: '700',
    fontSize: textSize['3xs'],
    lineHeight: '1',
    letterSpacing: tracking.mono,
  },
})
