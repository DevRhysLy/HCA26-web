# Hapkido College of Australia Website

Modern website built with Next.js, TypeScript, Tailwind CSS, and Contentful CMS.

## Overview

This project powers the official Hapkido College of Australia website, providing information about:

* Martial arts classes
* Instructors
* Training locations
* Hapkido information pages
* Events and member calendar
* Testimonials
* Frequently Asked Questions
* Contact and trial bookings

The website is designed to be:

* Fast and SEO-friendly
* Fully content-managed through Contentful
* Easy to maintain and extend
* Optimised for desktop and mobile devices

---

## Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

### CMS

* Contentful

### Hosting

* Vercel (recommended)

---

## Project Structure

```txt
app/
├── about/
├── classes/
├── contact/
├── faq/
├── instructors/
├── locations/
├── schedule/

components/
├── content/
├── contact/
├── home/
├── layout/
├── location/

contentful/
└── migrations/

lib/
├── contentful.ts
├── contentfulMappers.ts
├── contentfulSlugHelpers.ts

public/
├── images/

config/
├── navigation.ts
```

---

## Contentful Content Models

The project uses a consistent content model structure.

### Location

```txt
title
slug
description
body
image
address
googleMapsEmbedUrl
order
featured
```

### Instructor

```txt
title
slug
description
body
image
rank
order
featured
```

### Martial Class

```txt
title
slug
description
body
image
ageRange
order
featured
```

### About Page

```txt
title
slug
description
body
image
```

### Testimonial

```txt
title
description
rating
image
order
featured
```

### FAQ

```txt
title
description
category
order
featured
```

### Calendar Event

```txt
title
description
type
startDate
endDate

isRecurring
recurringDay
recurringStartDate
recurringEndDate

location
order
featured
```

---

## Environment Variables

Create a `.env.local` file:

```env
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_SECRET=
RESEND_API_KEY=
CONTACT_EMAIL=
```

---

## Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

## Contentful Migrations

Content model migrations are stored in:

```txt
contentful/migrations/
```

Example:

```txt
001-create-content-models.js
```

Run migrations:

```bash
contentful space migration \
  --space-id YOUR_SPACE_ID \
  --environment-id master \
  ./contentful/migrations/001-create-content-models.js
```

---

## SEO

Every dynamic page includes:

* Metadata generation
* Open Graph support
* Twitter cards
* Dynamic page titles
* Dynamic descriptions
* Contentful image support

---

## Hapkido College of Australia

Traditional Hapkido training for children, youth, and adults.

Building confidence, discipline, leadership, fitness, and self-defence skills in a supportive family environment.
