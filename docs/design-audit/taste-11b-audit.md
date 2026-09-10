# Taste Skill Section 11.B audit

Mode: Preserve. Direction: family-warm.

## Brand tokens in use

- Primary: `#003478`
- Accent: `#C60C30`
- Type stack today: Arial, Helvetica (default, not a brand face)
- Radii: mixed `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-[2rem]`
- Signature: red/blue split bar

## Information architecture

- Nav: Home, Schedule, About, Classes, Locations, Instructors
- Header CTA / sticky bar: Book Free Trial → `/contact`
- Routes: `/`, `/schedule`, `/about`, `/about/[slug]`, `/classes`, `/classes/[slug]`, `/locations`, `/locations/[slug]`, `/instructors`, `/instructors/[slug]`, `/faq`, `/contact`

## Preserve

- Korean red/blue, logo wordmark, split bar (sparingly)
- Nav labels, URLs, form field names
- Contentful copy and real photos
- Conversion path and sticky mobile CTA

## Retire

- Equal numbered 4-up Why Choose cards
- Decorative status dots and blob gradients in the hero
- Hero H1 longer than two lines; subtext over 20 words
- Gradient top bars and quarter-circle ornaments on every card
- Hardcoded hex and `transition-all`

## Inferred dials

`DESIGN_VARIANCE` 3 today (repeated card recipe). Target 5.
`MOTION_INTENSITY` 3 (hover lift). Keep 3, drop lift.
`VISUAL_DENSITY` 5. Target 4.

## SEO baseline

- Title template: `%s | Hapkido College of Australia`
- Home H1: children / confidence / Hapkido
- Contact title: Book a Free Trial
- Do not change route paths or primary heading topics
