# Hapkido College of Australia

Official website for [Hapkido College of Australia](https://www.hapkidocollege.com.au) — traditional martial arts training for children, youth, and adults across Sydney.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS 4**, and **Contentful CMS**. Designed to be fast, SEO-friendly, and easy for staff to update without touching code.

---

## Features

| Area | Details |
|------|---------|
| **Home** | Hero, programs carousel, member calendar, locations, instructors, testimonials, FAQ preview |
| **Schedule** | Interactive weekly timetable (Croydon, Ermington, Belrose) with mobile day view |
| **Classes & Instructors** | CMS-driven detail pages with server-rendered markdown |
| **Locations** | Address, Google Maps embed, and location content |
| **Contact** | Trial booking form with email delivery via Resend |
| **SEO** | Metadata, Open Graph, Twitter cards, sitemap, and robots.txt |

Most content is managed in Contentful, including the weekly class timetable.

---

## Design

The UI uses a **Korean flag–inspired palette** defined in `app/globals.css`:

| Token | Value | Usage |
|-------|-------|-------|
| Primary red | `#C60C30` | Accents, eyebrows, youth program cards |
| Primary blue | `#003478` | Headings, CTAs, kids program cards |
| Background | `#F8FAFC` | Page sections |
| Foreground | `#111111` | Body text |

Recurring patterns across the site:

- Uppercase red eyebrow labels with wide letter-spacing
- Red/blue split divider bars under section titles
- Rounded cards (`rounded-2xl` / `rounded-3xl`) with subtle borders and hover lift
- Sticky header with mobile hamburger nav and bottom trial CTA bar

---

## Tech stack

**Frontend:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4

**CMS:** Contentful (CDN API, 60s revalidation)

**Email:** Resend (contact form)

**Hosting:** Vercel (recommended)

---

## Architecture

The app follows a **server-first** component model:

```
Server components (default)     Client components ("use client")
─────────────────────────────   ───────────────────────────────
Page layouts & data fetching    Navbar (pathname-aware)
Markdown rendering              Timetable (location/day state)
Homepage sections               Contact form
Card grids                      Monthly calendar navigation
                                Horizontal scroll carousels
```

Key conventions:

- **Contentful data** is fetched in async server pages/components via `lib/contentful.ts`
- **Markdown** is rendered on the server with `react-markdown` (`MarkdownContent.tsx`)
- **Static config** (nav) lives in `config/`
- **Shared mappers** for sorting and card shapes are in `lib/contentfulMappers.ts`
- **Calendar date indexing** is precomputed on the server in `lib/calendarUtils.ts`

---

## Project structure

```
app/
├── page.tsx                 # Home (parallel Contentful fetches)
├── layout.tsx               # Root layout, metadata, header/footer
├── schedule/page.tsx        # Weekly timetable
├── contact/page.tsx         # Contact + trial form
├── faq/page.tsx
├── about/                   # About index + [slug] pages
├── classes/                 # Programs index + [slug] pages
├── instructors/             # Instructors index + [slug] pages
├── locations/               # Locations index + [slug] pages
├── api/contact/route.ts     # POST handler (Resend)
├── sitemap.ts
└── robots.ts

components/
├── content/                 # MarkdownPage, FaqSection, CardGridPage, CTASection
├── contact/                 # ContactForm
├── home/                    # Homepage sections
├── layout/                  # Header, Footer, StickyMobileCTA
├── location/                # GoogleMapSection
├── navigation/              # Navbar
├── timetable/               # Timetable grid + entry cards
└── ui/                      # HorizontalScrollCarousel

lib/
├── contentful.ts            # Contentful fetch helpers
├── contentfulMappers.ts     # Sort/map utilities
├── contentfulSlugHelpers.ts # Slug page helpers
└── calendarUtils.ts         # Calendar date indexing

config/
└── navigation.ts            # Nav items + header CTA

contentful/migrations/       # Content model migrations
public/images/               # Static images (hero, etc.)
types/                       # Shared TypeScript types
```

---

## Routes

| Path | Source |
|------|--------|
| `/` | Home |
| `/schedule` | Contentful schedule entries |
| `/classes`, `/classes/[slug]` | Contentful |
| `/instructors`, `/instructors/[slug]` | Contentful |
| `/locations`, `/locations/[slug]` | Contentful |
| `/about`, `/about/[slug]` | Contentful |
| `/faq` | Contentful |
| `/contact` | Static page + API route |

---

## Contentful content models

| Model | ID | Key fields |
|-------|-----|------------|
| Location | `location` | title, slug, description, body, image, address, googleMapsEmbedUrl |
| Instructor | `instructor` | title, slug, description, body, image, rank |
| Martial Class | `martialClass` | title, slug, description, body, image, tag (timetable label), ageRange (popover), timetableVariant |
| Schedule Entry | `scheduleEntry` | internalName, location, day, timeSlot, durationMinutes, classes (1+ martialClass refs), instructor, order |
| About Page | `aboutPage` | title, slug, description, body, image |
| Testimonial | `testimonial` | title (reviewer name), description, rating |
| FAQ | `faq` | question, answer |
| Calendar Event | `calendarEvent` | title, description, type, startDate, endDate, location |
| Weekly Theme | `weeklyTheme` | title, description, weekStartDate (Monday), location, themeColor |

Migrations live in `contentful/migrations/`. Run against your space:

```bash
contentful space migration \
  --space-id YOUR_SPACE_ID \
  --environment-id master \
  ./contentful/migrations/001-create-content-models.js
```

---

## Environment variables

Create `.env.local`:

```env
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_SECRET=

RESEND_API_KEY=
CONTACT_EMAIL=
```

| Variable | Purpose |
|----------|---------|
| `CONTENTFUL_SPACE_ID` | Contentful space identifier |
| `CONTENTFUL_ACCESS_TOKEN` | Delivery API token |
| `RESEND_API_KEY` | Sends contact form emails |
| `CONTACT_EMAIL` | Recipient for trial enquiries |

---

## Local development

**Requirements:** Node.js 20.9+ (Next.js 16)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint
```

---

## Updating content

### CMS content (Contentful)

Edit entries in the Contentful web app. Changes appear on the site within ~60 seconds (ISR revalidation).

### Class timetable

Create **Schedule Entry** records in Contentful. Each entry defines when and where a session runs:

- **Location** — reference to a location entry (uses its slug)
- **Day** and **Time Slot** — when the class runs
- **Duration Minutes** — slot length on the calendar
- **Classes** — link one `martialClass` for a single program, or multiple for mixed sessions (e.g. youth + adults)

Card title, tag, and colours are built automatically from the linked class entries:

- **Tag** on each martial class — short label shown on the timetable card (e.g. `KIDS (Beg)`)
- **Age Range** on each martial class — shown on hover/tap only, not on the card
- Optional **Timetable Variant** on a martial class overrides colour inference

Mixed example: link both Youth and Adult martial class entries → card title becomes `Youth Class & Adult Class`, tag combines each class’s tag field, and age ranges appear in the hover popover.

### Member calendar

The home page calendar shows **weekly themes** (Mon–Sat training weeks), **one-off events** (gradings, camps, etc.), and **closed Sundays** (always closed on the site — no CMS entry needed).

#### Weekly themes

Create one **Weekly Theme** entry per training week:

1. Set **Week Start Date** to the **Monday** of that week.
2. The site automatically spans the theme across Monday through Saturday.
3. Optional **Description** and **Location** appear in the sidebar.
4. Optional **Theme Color** tints the week card header and weekday cells in the calendar grid, and adds a matching accent in the sidebar. Leave blank for brand blue (`#003478`).

**Theme Color** options:

| Value | Accent | Use |
|-------|--------|-----|
| `blue` (default) | `#003478` | Brand primary |
| `red` | `#C60C30` | Brand accent |
| `teal` | `#0F766E` | Alternate week |
| `amber` | `#B45309` | Alternate week |
| `purple` | `#6D28D9` | Alternate week |
| `slate` | `#475569` | Neutral weeks |

Run migration `007-create-weekly-theme.js` before creating weekly theme entries:

```bash
contentful space migration \
  --space-id YOUR_SPACE_ID \
  --environment-id master \
  ./contentful/migrations/007-create-weekly-theme.js
```

Older **Calendar Event** entries with type `weekly-theme` or recurring day fields are no longer used for the calendar grid. You can leave them in Contentful or remove them manually.

#### Event days

Add **Calendar Event** entries for gradings, camps, performances, and other one-off dates:

- Set **Type** (e.g. `grading`, `event`, `camp`) — not `weekly-theme`.
- Set **Start Date**; add **End Date** for multi-day events.
- Do **not** use recurring fields for new entries.

Event pills appear on weekday cells only (Monday–Saturday).

### Navigation

Edit `config/navigation.ts` for header links and the "Book Free Trial" CTA.

---

## Deployment

Deploy to Vercel and set the environment variables above. The site uses static generation for slug pages (`generateStaticParams`) and ISR for Contentful fetches.

Production URL: `https://www.hapkidocollege.com.au`

---

## Hapkido College of Australia

Traditional Hapkido training for children, youth, and adults — building confidence, discipline, leadership, fitness, and self-defence skills in a supportive family environment.
