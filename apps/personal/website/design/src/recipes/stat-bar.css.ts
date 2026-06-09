import { style } from '@vanilla-extract/css'

import { space } from '../tokens'

/**
 * The `statBar` recipe is the responsive grid that holds the four Stat tiles in
 * the hi-fi customer home "Account summary" row.
 *
 * It is layout only, with no colours, so nothing here reads `vars.*`; it
 * composes whatever `<Stat>` (or other) children the component is handed. The
 * grid is one full-width column on mobile, two equal columns from 768px, and
 * four equal columns from 1024px.
 *
 * Breakpoints are expressed as plain `@media (min-width: ...)` blocks (the
 * button recipe's `@media` precedent); media-query px are not a design-token
 * concern. The 14px gap is off-grid (between `space['3']` at 12px and
 * `space['4']` at 16px) so it is a bare px literal with a `// hi-fi spec`
 * comment, matching the quote-card and stat off-grid precedent. The bottom
 * margin is `space['6']` (24px).
 */
export const statBar = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '14px', // hi-fi spec -- off-grid (12px < 14px < 16px); literal px with spec comment
  marginBottom: space['6'],
  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
})
