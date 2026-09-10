# Close gates

## Taste pre-flight

- Preserve mode: Pass. URLs, nav labels, logo wordmark, and contact field names unchanged.
- Brand fidelity: Pass. Red `#C60C30` and blue `#003478` remain the only accents.
- Hero discipline: Pass. Two-line H1, short subtext, trial CTA above the fold.
- Em-dash audit: Pass in new marketing copy (hyphens and ellipses only).
- Equal numbered feature cards: Retired on Why Choose.
- Mesh blobs and status dots: Removed from the hero.
- Light theme lock: Pass. No dark mode.
- Motion: Soft color transitions only. `prefers-reduced-motion` honored in CSS.

## Preservation audit

Unchanged:

- `/`, `/schedule`, `/about`, `/classes`, `/locations`, `/instructors`, `/faq`, `/contact`
- Nav: Home, Schedule, About, Classes, Locations, Instructors
- Header CTA: Book Free Trial
- Form names: `name`, `email`, `phone`, `classOption`, `location`, `message`

## Vercel guidelines (after)

- Skip link and `main#main-content`: Pass
- Contact labels, autocomplete, `spellCheck={false}` on email, ellipsis placeholder: Pass
- Inline email error + focus on invalid email: Pass (verified in browser)
- `transition-all` removed from new buttons: Pass
- Native select has explicit background: Pass

## Playwright

Baseline: `docs/design-audit/baseline/`
After: `docs/design-audit/after/`

All listed public routes returned 200 after the redesign.

## 21st MCP

Config is in `.cursor/mcp.json`. Set `API_KEY_21ST` locally. No 21st components were dropped in, because existing accordion, form, and carousel were restyled to DESIGN.md instead.
