# Hapkido College of Australia Website

A modern martial arts website built for **Hapkido College of Australia (HCA)** using **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Contentful CMS**.

The website is designed to provide:

* Dynamic class pages
* Instructor profiles
* Studio location pages
* Testimonials
* FAQ system
* Member calendar/events
* SEO optimisation
* Mobile-first responsive design
* Contact forms with Resend email integration

---

# Tech Stack

* **Next.js 16 (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Contentful CMS**
* **Resend Email API**
* **Vercel Deployment**
* **GitHub**

---

# Features

## Dynamic CMS Content

Managed through Contentful:

* Classes
* Instructors
* About pages
* Studio locations
* Testimonials
* FAQ entries
* Member calendar/events

---

## SEO Optimisation

* Dynamic metadata
* OpenGraph support
* Twitter cards
* Sitemap generation
* Robots.txt
* Dynamic slug page SEO

---

## Responsive Design

* Mobile-first layouts
* Sticky mobile CTA
* Responsive navigation
* Optimised mobile hero sections

---

## Contact System

* Contact form validation
* Email notifications using Resend
* Auto-confirmation emails
* Form success/error handling

---

## Calendar System

Supports:

* Single-day events
* Date ranges
* Recurring weekly events
* Monthly calendar display

---

# Project Structure

```txt
app/
components/
config/
lib/
public/
types/
```

## Important Folders

### `app/`

Next.js App Router pages and layouts.

### `components/`

Reusable UI components.

### `lib/`

Contentful helpers, SEO helpers, utilities.

### `public/`

Static assets and images.

---

# Environment Variables

Create:

```txt
.env.local
```

Add:

```env
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
RESEND_API_KEY=
CONTACT_EMAIL=
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/DevRhysLy/HCA26-web.git
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

Website runs on:

```txt
http://localhost:3000
```

---

# Deployment

The website is designed for deployment on **Vercel**.

## Recommended Workflow

```txt
Local Development
↓
Git Commit
↓
Push to GitHub
↓
Automatic Vercel Deployment
```

---

# Git Branch Strategy

```txt
main      → Production
develop   → Staging / Testing
feature/* → New Features
```

---

# Contentful Models

## Classes

* Service name
* Short description
* Long description
* Hero image
* Slug

## Instructors

* Name
* Rank
* Avatar
* Short bio
* Full bio
* Slug

## Studio Locations

* Location name
* Address
* Description
* Google Maps embed URL
* Banner image
* Slug

## FAQ

* Question
* Answer

## Member Calendar

* Title
* Start date
* End date
* Recurring settings
* Description

---

# SEO Features

## Automatic Sitemap

Generated at:

```txt
/sitemap.xml
```

## Robots File

Generated at:

```txt
/robots.txt
```

## Dynamic Metadata

Each slug page automatically generates:

* Titles
* Descriptions
* OpenGraph previews
* Twitter cards

---

# Author

Developed by Rhys Ly for Hapkido College of Australia.

---

# License

Private project for Hapkido College of Australia.
