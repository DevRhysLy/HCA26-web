# DESIGN.md

Hapkido College of Australia. Family-warm school site. Mode: Preserve.

## 1. Visual theme and atmosphere

Warm, orderly family dojang. Cream canvas, real student photography, Korean red and blue as heritage, not sports neon. Parents should feel welcomed and sure. Premium but never cinematic or SaaS-dark.

Dials: `DESIGN_VARIANCE` 5, `MOTION_INTENSITY` 4, `VISUAL_DENSITY` 4. Light theme only.

## 2. Color palette and roles

| Token | Hex | Role |
| --- | --- | --- |
| `--primary-red` / `hca-red` | `#C60C30` | Eyebrows, alerts, age labels, signature bar left |
| `--primary-blue` / `hca-blue` | `#003478` | Primary CTA, headings accent, links, signature bar right |
| `--primary-blue-hover` / `hca-blue-hover` | `#002B63` | Primary hover |
| `--primary-black` / `hca-ink` | `#111111` | Headings and body ink |
| `--background` / `hca-cream` | `#F7F4EE` | Page canvas |
| `--surface` / `hca-surface` | `#FFFFFF` | Cards, header, forms |
| `--surface-muted` / `hca-muted` | `#F3EEE6` | Alternate bands |
| `--border` / `hca-border` | `rgba(17, 24, 39, 0.10)` | Hairline borders |

No third accent hue. One CTA color: blue. Red is not a second button fill.

## 3. Typography

- Display / headings: Figtree (`font-serif` display token)
- Body / UI: Source Sans 3 (`font-sans`)
- H1: 40-56px, weight 600, `text-wrap: balance`, max two lines on the home hero
- H2: 32-44px, weight 600
- Body: 16-18px, line-height 1.65
- Eyebrow: 12px, sans, uppercase, tracking 0.16em, red, names the topic in plain language

## 4. Component stylings

- Radius: inputs 12px (`rounded-xl`), buttons and cards 16px (`rounded-2xl`), large photos 20px (`rounded-[20px]`). Do not mix 3xl blobs.
- Primary button: blue fill, white text, `focus-visible:ring-2 ring-offset-2 ring-hca-blue`
- Secondary button: white fill, ink text, `border-hca-border`
- Cards: white, hairline border, no gradient top stripe, no corner quarter-circles. Navigational cards (classes, locations, instructors, contact, 404) may lift 3px on hover. Photos may zoom. Buttons lift 2px. Do not lift timetable cells, calendar days, or FAQ rows.
- Signature bar: 4px red/blue split. Header and hero only. Not on every card.
- Inputs: labelled, `rounded-xl`, visible focus ring. Native select has explicit white background.

## 5. Layout principles

Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.

Use `.hca-container` (`mx-auto max-w-7xl px-6 lg:px-8`) and `.hca-section` (`py-16 md:py-24`).

Recipes: button icon gap 8; card internal gap 16; card padding 32 (`p-8`); dense panels (FAQ, form) 24 stepping to 32 (`p-6 md:p-8`); section heading gap 32 (`mb-8`); major section gap 64 / 96.

Homepage layout families:

1. Editorial split (hero)
2. Photo zigzag (why parents choose)
3. Horizontal program rail
4. Calendar band
5. Photo-chapter location rows
6. Instructor rail
7. Testimonial quotes
8. FAQ stack
9. Blue CTA panel

Slug page layout families:

1. Editorial split header (framed photo, type eyebrow, facts)
2. Full story; about / no-aside articles use a centered `max-w-3xl` column
3. Single at-a-glance aside
4. Compact day-grouped sessions (not the schedule grid)
5. Quiet map band (locations only)
6. Existing blue CTA panel

## 6. Depth and elevation

Default: border, no drop shadow. Header: white + hairline. Photos may use a soft 8px shadow `0 8px 24px rgba(17, 24, 39, 0.08)`.

## 7. Do and don't

Do: real photos, cream canvas, one blue CTA, short parent-facing copy, preserve URLs, nav labels, form names, logo.

Don't: mesh blobs, decorative status dots, numbered 01/02 feature chrome, equal four-up feature cards, `transition-all`, dark cinema bands, em dashes, new brand colors, dark mode.

## 7a. Motion

Fluid CSS only. Duration 180-220ms hover, 280-320ms open/close. Easing `cubic-bezier(0.16, 1, 0.3, 1)`. Animate `transform`, `opacity`, `color`, `background-color`, `border-color`, and `box-shadow`. Never `transition-all`.

Allowed:

- Nav underline grows left to right (`scale-x` / `.hca-nav-line`)
- Buttons: `translateY(-2px)` plus `0 8px 24px rgba(17, 24, 39, 0.08)` hover; `scale(0.98)` press (`.hca-press`). Sticky mobile trial bar skips the lift (`.hca-press-static`)
- Navigational cards: `translateY(-3px)` plus stronger blue border (`.hca-card-lift`)
- Photos: `scale(1.04)` inside overflow-hidden (`.hca-photo-zoom`)
- Footer / icon wells: 1px lift and cream/red-tint background (`.hca-icon`)
- FAQ: accordion height plus `+` to `x` rotation and a quiet well fill (`.hca-faq-icon`, `.hca-faq-panel`)
- Form fields: border, cream background, and ring on focus (`.hca-field`)
- Hero first-paint fade (`.hca-reveal`); below-fold sections fade in once with `translateY(12px)` (`RevealOnView`)
- Mobile menu enter

Not allowed: GSAP, Motion, scroll-hijack, parallax, magnetic CTA, 3D tilt, infinite loops, route transitions, lifting every tile (calendar, timetable, FAQ).

Gate decorative hover with `(hover: hover)` and `prefers-reduced-motion: no-preference`. Default content stays visible without JS and under reduced motion.

## 8. Responsive

Breakpoints: mobile 390, tablet 768, desktop 1024+. Touch targets 44px. Sticky mobile trial bar stays. Header max 80px desktop. Safe-area padding on the sticky bar.

## 9. Agent prompt guide

Preserve Korean red `#C60C30` and blue `#003478`. Preserve `/` `/schedule` `/calendar` `/about` `/classes` `/locations` `/instructors` `/faq` `/contact`. Preserve Book Free Trial. Preserve contact field names: `name`, `email`, `phone`, `classOption`, `location`, `message`. Use tokens (`bg-hca-blue`, `text-hca-red`), not raw hex in new work.

Comps: `docs/design-audit/comps/`.
