# Satyam Sachan — Beyond the Gate

Cinematic 3D portfolio built with React, Vite, TypeScript, Three.js (React Three Fiber + drei), GSAP and Framer Motion.

The visitor starts outside a procedural 3D gate, opens it, travels through into a digital universe, and then scrolls through four worlds — **Engineering, Commerce, Search Intelligence and AI** — the **Project Vault**, **About**, and the **Final Portal** contact form.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build + sitemap.xml / robots.txt
npm run preview    # serve the production build
npm run build:site # website/: index.html + assets/ + projects/, opens by double-click and uploads anywhere
```

Node 20+ recommended.

## Configure before deploying

Copy `.env.example` to `.env` and set:

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Your real domain, e.g. `https://satyamsachan.com`. Used for canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`. |
| `VITE_CONTACT_ENDPOINT` | Where the contact form POSTs JSON. Example with Formspree: create a form at formspree.io and use `https://formspree.io/f/<id>`. Any endpoint that accepts a JSON POST works (Getform, a Netlify/Vercel function, your own API). |

If `VITE_CONTACT_ENDPOINT` is empty, the form validates normally but tells visitors honestly that it isn't connected and offers a pre-filled email link instead — it never claims a message was sent.

## Editing content

Everything visible is driven by typed data files — no component changes needed:

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, headlines, bio, email, LinkedIn/GitHub links, experience, education, achievements, process. **Empty values are hidden automatically.** |
| `src/data/projects.ts` | All 16 Project Vault entries — summary, problem, solution, features, stack, screenshots, live/repo URLs, verified results. |
| `src/data/services.ts` | Copy for the four worlds, commerce platform comparison, SEO/AEO/GEO pillars, AI pipeline. |
| `src/data/skills.ts` | Technology groups in About and hero labels. |
| `src/data/navigation.ts` | Nav items and the journey rail. |

### Adding a project

1. Put screenshots in `public/projects/<slug>/01.webp`, `02.webp`, … (WebP, ~1600px wide).
2. Add an entry to `projects` in `src/data/projects.ts` with the same `slug`.
3. Only fill `liveUrl` / `repoUrl` with real public URLs, and `results` with verified outcomes.

The project automatically appears in the vault, its filters, the platform filter (via `platform`), the sitemap, and gets a deep link at `/projects/<slug>`.

### Things to review

- `profile.links` — LinkedIn and GitHub are empty; add yours to show them.
- `profile.email` — currently set to your account email; change it if you prefer a different public address.
- `profile.about.experience / education / achievements` — empty on purpose; add real entries.
- Original projects (Prescripto, Photography Contest, Movie Booking, EMS, Health Tracker, The Leather Laundry) use modest descriptions and assumed stacks — please check each `stack`/`features` list and add screenshots + repo/live links.

## How it works

- **One continuous 3D world** (`src/components/scene/`): the gate at z = 0, the corridor and the four-discipline sculpture behind it. GSAP tweens a plain mutable object (`src/utils/sceneState.ts`); the render loop reads it every frame, so the sequence never triggers React re-renders.
- **Opening sequence** (`src/hooks/useExperience.tsx`): activation → unlock → reveal → transformation as one GSAP timeline. *Skip intro*, the *Escape* key and *Skip to content* finish it instantly and safely. The choice is remembered for the session; *Replay the gate* in the footer resets it. Deep links (`/projects/...`, `/#section`) skip the intro.
- **Performance**: the Three.js bundle is lazy-loaded; rendering stops when the hero scrolls out of view; low-powered or small touch devices get a lighter tier (fewer particles, no real-time reflections, lower DPR). Force a tier with `?quality=low` or `?quality=high`.
- **Fallbacks**: no WebGL, a crashed scene or a lost GL context all switch to a CSS gate and sculpture driven by the same timeline.
- **Accessibility**: semantic sections, skip link, visible focus, keyboard tabs and filters, modal with focus trap + Escape + focus restore, reduced-motion support throughout, labelled form fields with inline errors.
- **SEO**: per-view title/description/canonical/Open Graph, Person + WebSite JSON-LD from `profile.ts` (no review markup), generated `sitemap.xml` and `robots.txt`, descriptive project URLs.

## Deploying

It's a static SPA in `dist/`. Project deep links need an SPA fallback — already included:

- **Netlify**: `public/_redirects`
- **Vercel**: `vercel.json`
- **Apache / cPanel / Hostinger**: `public/.htaccess` (copied into `dist/`):

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```
