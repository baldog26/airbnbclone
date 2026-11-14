# Design direction

Working brand name: **Threshold** (placeholder — change it in `src/config/site.ts`).

## Scene
People planning a trip from home, on a laptop in the evening or on a phone during a break. Bright rooms, daylight to lamplight. That makes it a light interface: a cool paper ground with a deep pine color owning whole regions.

## Thesis
Whole homes, shown as places. The photograph leads every screen. The interface is the frame around it: a pine field and a docked search bar that bridges the field and the photo. It doesn't use the usual marketplace pastel-and-coral look or a grid of identical feature cards.

## Color (committed: pine owns the hero field, the footer and the booking card)
| Token | Hex | Role |
|---|---|---|
| pine | `#1F3A30` | Committed field: hero panel, footer, price card head |
| paper | `#F5F6F2` | Page ground (cool, not cream) |
| ink | `#141B17` | Text |
| moss | `#59645D` | Secondary text (≥4.5:1 on paper) |
| fog | `#DCE1DA` | Hairlines, input borders |
| marigold | `#F2B43A` | Primary action fill, focus ring. Used sparingly |

## Type
One family, **Schibsted Grotesk** (a newspaper grotesk with sturdy, slightly condensed caps). Weights 400 / 600 / 800. Display: 800, tracking −0.03em, `text-wrap: balance`. Prices and counts use tabular numerals. Body copy runs up to 68ch.

Scale (rem): 0.875 · 1 · 1.25 · 1.75 · 2.5 · 4 (hero, clamp to 2.5 on mobile).

## Layout
```
Home, first viewport (desktop)
+------------------------+------------------------------------+
| PINE FIELD             |                                    |
|  h1 (3 lines, 4rem)    |        lake boathouse photo        |
|  fact line             |        (full height, bleeds right) |
|                        |                                    |
+==========[ where | guests | Search homes ]==================+   <- search docked across the seam
```
Then: homes grid (6) → how renting works (a real 3-step sequence, set as large type, no cards) → list-your-home band (photo + text) → pine footer.

Left-aligned throughout. One content width (`max-w-7xl`, 16px gutter mobile / 32px desktop) so left and right edges match.

## Principles
- Photos lead, no captions under them, no decorative gradients or glass.
- No eyebrow labels, no ALL-CAPS labels, no `→` in buttons, no middle-dot meta strings.
- Buttons are a verb and an object: "Search homes", "Log in", "Save home".
- Motion: one load entrance on the hero photo (clip reveal), plus small responses to input (a photo zooms 1.03 inside its frame on hover, buttons press). Respects `prefers-reduced-motion`.
- Browser surfaces are themed: selection, focus ring, `accent-color`, scrollbar.
