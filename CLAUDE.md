# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server (port 8080, see [vite.config.ts](vite.config.ts))
- `npm run build` — production build to `dist/` (`build:dev` for development-mode build)
- `npm run lint` — ESLint
- `npm run preview` — serve the built output

There is no test runner configured.

## Architecture

Single-page marketing site for Hispal Tech (Spanish company) built with Vite + React 18 + TypeScript + Tailwind + shadcn/ui (Radix). Path alias `@` → `src/`. Routes (react-router-dom, in [src/App.tsx](src/App.tsx)): `/` (Index, a stack of section components), `/contacto`, and a `*` NotFound. [public/_redirects](public/_redirects) rewrites everything to `index.html` for static-host SPA routing (Netlify-style).

### Providers and state
- `LanguageProvider` ([src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx)): custom i18n (no i18next). `t("dot.separated.key")` looks up nested keys in [src/locales/es.json](src/locales/es.json) / [en.json](src/locales/en.json); a missing key returns the key itself. Language persists in localStorage (`hispaltech-language`), default `es`. Any new user-facing string must be added to **both** JSON files.
- `BookingProvider` ([src/contexts/BookingContext.tsx](src/contexts/BookingContext.tsx)): shares `selectedProject` between sections (e.g. project/service selection preselecting the contact form).

### Content
Page sections live in `src/components/*.tsx` (Hero, Services, PriceComparison, Projects, Contact, …). Static data (services, pricing, projects, contact info) is in `src/constants/*` and re-exported from `src/constants/index.ts`. Portfolio, Team and Testimonials components exist but are commented out in [src/pages/Index.tsx](src/pages/Index.tsx). Project cover images live in `public/projects/`. `src/components/ui/` is generated shadcn code (config in [components.json](components.json)).

### Lead/contact forms
`LeadForm` and `Contact` submit through [src/services/emailService.ts](src/services/emailService.ts). The live path is `sendEmailAlternative`, which POSTs to Web3Forms (URL/recipient in `src/constants/index.ts`) using `VITE_WEB3FORMS_ACCESS_KEY` from `.env` (gitignored). The EmailJS `sendEmail` in the same file is an unused placeholder with fake credentials. See [EMAIL_SETUP.md](EMAIL_SETUP.md) for setup.

## Workflow
Git flow: work on `development`, merged into `main` via PRs.
