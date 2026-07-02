# lucas-spain.com

My personal site — a single-page portfolio for Lucas Spain, software engineer.

Built with [SvelteKit](https://kit.svelte.dev/), [Tailwind CSS](https://tailwindcss.com/),
and [daisyUI](https://daisyui.com/), and prerendered to static files via
`@sveltejs/adapter-static`.

## Development

```bash
npm install
npm run dev        # start the dev server
```

## Build

```bash
npm run build      # prerender to ./build
npm run preview    # serve the production build locally
```

## Checks

```bash
npm run check      # svelte-check (type checking)
npm run lint       # prettier + eslint
npm run format     # prettier --write
```

## Tests

```bash
npm run test:unit         # Vitest — actions and components (jsdom)
npm run test:integration  # Playwright — builds and tests the real site
npm test                  # both
```

Unit tests live next to the code they cover (`*.test.ts`); integration tests are in
`tests/`.

## Design

Editorial, print-inspired layout: paper/ink palette with a vermilion accent, headings set
in [Fraunces](https://fonts.google.com/specimen/Fraunces) (variable, with its SOFT/WONK
axes used on the hero), metadata in IBM Plex Mono. Both fonts are self-hosted via
Fontsource. Light and dark themes are defined as daisyUI themes in `tailwind.config.js`.

## Structure

The whole site lives on one route (`src/routes/+page.svelte`), composed of section
components in `src/routes/` (Hero, About, Highlights, Skills, Projects, Experience,
Contact). Shared pieces (header, footer, theme toggle, scroll-to-top) are in
`src/lib/components/`, and the scroll-reveal action is in `src/lib/actions/animate.ts`.

The contact form posts to [FormSubmit](https://formsubmit.co/). Light/dark theme is
applied before paint by an inline script in `src/app.html` and toggled by `ThemeToggle`.
