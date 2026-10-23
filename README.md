# Business Website — Next.js + TypeScript + Tailwind + Prisma

A production-ready, full-stack business website: marketing pages, a working
contact form backed by a database and email notifications, and a password-protected
admin dashboard to manage services, portfolio projects, testimonials, and inquiries.

## Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes
- **Database:** SQLite locally (zero config) → PostgreSQL in production (one-line swap)
- **ORM:** Prisma
- **Auth:** NextAuth (credentials provider) for the admin dashboard
- **Email:** Nodemailer (any SMTP provider — Gmail, SendGrid, Resend, etc.)

## Pages

Home · About · Services · Portfolio (with category filter + detail pages) ·
Testimonials · Contact · Privacy Policy · Terms & Conditions · 404 · Admin Login ·
Admin Dashboard (Overview, Inquiries, Services, Portfolio, Testimonials)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Then edit `.env`:

- `DATABASE_URL` — leave as `file:./dev.db` for local development.
- `NEXTAUTH_SECRET` — generate one with `openssl rand -base64 32`.
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials for your first admin login (used by the seed script).
- `SMTP_*` / `NOTIFY_EMAIL` — optional. If left unset, contact form submissions are still saved to the database, but no notification email is sent.
- `NEXT_PUBLIC_GA_ID` — optional Google Analytics measurement ID.
- `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_SRC` — get this from Google Maps → Share → Embed a map → copy the `src` URL.
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — your WhatsApp number in international format, digits only (e.g. `15551234567`).

### 3. Set up the database

```bash
npm run db:push    # creates the SQLite database and tables
npm run db:seed     # creates your admin account + sample services/portfolio/testimonials
```

### 4. Run the dev server

```bash
npm run dev
```

Visit `http://localhost:3000` for the site, and `http://localhost:3000/admin/login`
to sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `.env`.

> **Note on this sandbox:** this project was built and typechecked/linted in an
> environment without outbound access to Prisma's binary CDN, so the Prisma Client
> query engine could not be downloaded here to run a live `npm run build` end-to-end.
> `npx tsc --noEmit` and `npx next lint` both pass cleanly with zero errors. On your
> machine (or in CI/Vercel, which have full internet access), `npm install` will
> download the engine automatically and everything will run normally.

## Customization

**Rebrand in one place:** edit `src/config/site.ts` — business name, tagline,
description, contact info, social links, and nav all live here.

**Change the color theme:** edit the CSS variables at the top of
`src/app/globals.css` (`:root` and `.dark` blocks). Every button, link, badge, and
focus ring derives from these values — swap in a different palette (emerald, rose,
amber, etc.) and the whole site updates.

**Manage content without redeploying:** once logged into `/admin/dashboard` you can
add/edit/delete services, portfolio projects (with image galleries), and
testimonials, and review/manage contact inquiries — all stored in the database.

**Images:** the seed data and forms use image *URLs* (e.g. from Unsplash or your own
CDN/S3 bucket) rather than direct file upload, to keep the deployment simple and
avoid needing separate file storage infrastructure. If you want direct image
uploads, the easiest path is wiring the admin forms to a service like Vercel Blob,
Cloudinary, or S3, and storing the returned URL exactly as the current fields expect.

## Switching to PostgreSQL for production

1. In `prisma/schema.prisma`, change:
   ```prisma
   datasource db {
     provider = "postgresql" // was "sqlite"
     url      = env("DATABASE_URL")
   }
   ```
2. Set `DATABASE_URL` to your Postgres connection string (e.g. from
   [Supabase](https://supabase.com) or [Railway](https://railway.app)).
3. Run `npx prisma db push` (or `npx prisma migrate deploy` if you set up migrations)
   and `npm run db:seed`.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. Import it into [Vercel](https://vercel.com/new).
3. Add all variables from `.env.example` in the Vercel project's Environment
   Variables settings (using your production Postgres `DATABASE_URL`).
4. Deploy. Vercel runs `npm run build`, which runs `prisma generate && next build`.
5. Point your domain's DNS at Vercel per their domain setup instructions.

Database hosting: [Supabase](https://supabase.com) or [Railway](https://railway.app)
both offer a free/low-cost managed Postgres instance — create one, copy its
connection string into `DATABASE_URL`, and you're set.

## Security notes

- The contact and newsletter APIs are rate-limited per IP (in-memory; for
  multi-instance production deployments at scale, swap in a Redis-backed limiter).
- All admin API routes (`/api/services`, `/api/portfolio`, `/api/testimonials`
  POST/PUT/DELETE, and all of `/api/inquiries`) require an authenticated session —
  enforced server-side via `requireAdmin()`, not just hidden UI.
- `/admin/dashboard/*` is protected by NextAuth middleware; unauthenticated
  visitors are redirected to `/admin/login`.
- Passwords are hashed with bcrypt (12 rounds); plaintext passwords are never
  stored or logged.
- Form inputs are validated with Zod on the server (never trust client-side
  validation alone) and free-text fields are stripped of HTML tags.
- A honeypot field on the contact form silently discards simple bot submissions.
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.js`.

**Before going to production:** change `ADMIN_PASSWORD` to something strong,
generate a fresh `NEXTAUTH_SECRET`, and never commit your real `.env` file
(it's already git-ignored).

## SEO

- Per-page metadata (title, description, canonical URL, Open Graph, Twitter cards)
  via Next's Metadata API — see `src/app/layout.tsx` and each page's `metadata` export.
- `src/app/sitemap.ts` generates `/sitemap.xml` dynamically, including every
  published portfolio project.
- `src/app/robots.ts` generates `/robots.txt`, disallowing `/admin/` and `/api/`.
- JSON-LD structured data (`ProfessionalService` schema) is injected in the root layout.
- Semantic HTML throughout (`<nav>`, `<main>`, `<article>`, proper heading hierarchy).

## Performance

- Images use `next/image` with lazy loading, responsive `sizes`, and modern
  format negotiation (AVIF/WebP).
- Static homepage/services/portfolio pages use incremental revalidation
  (`export const revalidate = 60`) so content stays fresh without full rebuilds.
- Fonts are loaded via `next/font` (self-hosted, no render-blocking requests).
- `next.config.js` enables SWC minification and compression.

## Accessibility

- Skip-to-content link, visible focus rings, `aria-label`s on icon-only buttons,
  `aria-expanded`/`aria-modal` on interactive widgets, and `prefers-reduced-motion`
  support in `globals.css`.

## Project structure

```
src/
  app/                  # Pages & API routes (Next.js App Router)
    admin/              # Admin login + dashboard (protected)
    api/                # REST API routes
    [public pages]/
  components/
    layout/              # Navbar, Footer, SiteChrome
    home/                 # Homepage sections + shared content components
    ui/                   # Reusable primitives (Modal, Accordion, Lightbox, etc.)
    admin/                # Admin-only components
  config/site.ts          # Single source of truth for branding/business info
  lib/                    # Prisma client, auth config, email, validation, rate limiting
  types/                  # Shared TypeScript types
prisma/
  schema.prisma           # Database schema
  seed.ts                 # Seeds admin account + sample content
```
