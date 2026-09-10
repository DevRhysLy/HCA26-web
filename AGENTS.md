# Agent notes: Hapkido College of Australia

Official site for a family martial arts school. Content lives in Contentful. Do not invent a second brand.

## Design program

Mode is **Preserve** with a **family-warm** craft overhaul.

- Keep Korean red `#C60C30`, Korean blue `#003478`, logo treatment, nav labels, URLs, form field names, and Contentful copy.
- Light theme only. No dark mode. No new accent hue.
- Conversion path stays Book Free Trial → `/contact`.
- Replace Arial with the project type stack in `DESIGN.md`. Arial was a default, not a brand face.

## Tool precedence

Do not let these tools compete. If they conflict, use this order:

1. **`DESIGN.md`** wins on look and tokens.
2. **Taste Skill v2** (`.cursor/skills/design-taste-frontend`) wins on anti-slop and preservation (URLs, nav, form names, logo).
3. **Vercel Web Interface Guidelines** (`.cursor/skills/web-design-guidelines`) win on accessibility, focus, forms, and motion.
4. **Image-to-code** (`.cursor/skills/image-to-code`) is for section comps after `DESIGN.md` exists. Implement to match the comps.
5. **21st MCP** is a component search only. Restyle every result to HCA tokens. Never drop in a 21st or Linear look.
6. **Playwright CLI** is the screenshot and route-verification loop.
7. **Impeccable** is finish review and live polish only. It is not a second design direction.

Taste Skill bans em dashes and en dashes in marketing copy. Vercel guidelines want ellipses (`…`) and curly quotes. Use hyphens and ellipses. Skip em dashes.

## Installed skills

| Skill | Path |
| --- | --- |
| Taste Skill v2 | `.cursor/skills/design-taste-frontend/SKILL.md` |
| Image-to-code | `.cursor/skills/image-to-code/SKILL.md` |
| Redesign audit | `.cursor/skills/redesign/SKILL.md` |
| Web Interface Guidelines | `.cursor/skills/web-design-guidelines/SKILL.md` |
| Impeccable (existing) | `.claude/skills/impeccable/SKILL.md` |

## 21st MCP

Project config: `.cursor/mcp.json`.

Get a key at https://21st.dev/mcp and set `API_KEY_21ST` in the Cursor MCP / plugin settings (or your shell env). Old Magic keys do not work.

```bash
npx @21st-dev/cli@latest init --client cursor
```

Use 21st for missing patterns (accordion, form control, carousel). Adapt to `DESIGN.md`. Do not keep 21st colors, radii, or type.

## Playwright CLI

Install locally if missing:

```bash
npm install -g @playwright/cli@latest
playwright-cli install --skills
```

Baseline and regression screenshots live under `docs/design-audit/`. Re-shoot desktop and mobile after each major surface.

## Taste dials

- `DESIGN_VARIANCE`: 5
- `MOTION_INTENSITY`: 4
- `VISUAL_DENSITY`: 4

Honor `prefers-reduced-motion`. Do not add GSAP unless the dial later rises above 4.

## Do not

- Rename routes or nav labels
- Change contact form field `name` attributes
- Introduce dark cinema backgrounds or mesh blob heroes
- Use equal numbered feature-card rows as the default layout
- Hardcode `#003478` / `#C60C30` in new work; use CSS tokens
