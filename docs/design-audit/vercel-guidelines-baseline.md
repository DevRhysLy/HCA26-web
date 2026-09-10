# Vercel Web Interface Guidelines (baseline)

Reviewed: `app/layout.tsx`, `components/layout/Header.tsx`, `components/home/HeroSection.tsx`, `components/contact/ContactForm.tsx`

## app/layout.tsx

app/layout.tsx:58 - missing skip link to main
app/layout.tsx:59 - body uses hardcoded `#F8FAFC` instead of token
app/layout.tsx:66 - main has no `id` for skip target
app/layout.tsx - no `theme-color` meta matching canvas

## components/layout/Header.tsx

components/layout/Header.tsx:21 - CTA uses `transition-all`
components/layout/Header.tsx:21 - no `focus-visible` ring
components/layout/Header.tsx:11 - wordmark is text only; fine if intentional

## components/home/HeroSection.tsx

components/home/HeroSection.tsx:9 - decorative hero image has empty alt (ok) but no explicit width/height on fill image (Next fill mitigates CLS)
components/home/HeroSection.tsx:34 - decorative status dot
components/home/HeroSection.tsx:65 - `transition-all` on CTAs
components/home/HeroSection.tsx:65 - no `focus-visible` ring
components/home/HeroSection.tsx:42 - H1 not `text-wrap: balance`

## components/contact/ContactForm.tsx

components/contact/ContactForm.tsx:16 - focus uses `focus:` not `focus-visible:`
components/contact/ContactForm.tsx:154 - email missing `spellCheck={false}`
components/contact/ContactForm.tsx:176 - placeholder should end with `…`
components/contact/ContactForm.tsx:190 - native select needs explicit background/color
components/contact/ContactForm.tsx:235 - errors are form-level only, not inline beside the field
components/contact/ContactForm.tsx:48 - first invalid field is not focused
components/contact/ContactForm.tsx:227 - submit has no `focus-visible` ring
components/contact/ContactForm.tsx:230 - hover listed; ok
