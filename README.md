# pablonortiz.com

[![CI](https://github.com/pablonortiz/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/pablonortiz/portfolio/actions/workflows/ci.yml)

[![Pablo Ortiz: I design and build software and systems for web, mobile and desktop](https://pablonortiz.com/og/en.png)](https://pablonortiz.com)

My portfolio, in Spanish and English: the projects I've built for web, mobile and desktop, plus a few open source dev tools, with how I work and how to reach me. Live at **[pablonortiz.com](https://pablonortiz.com)**.

## Stack

- [Astro 7](https://astro.build), fully static, with TypeScript and [Tailwind CSS 4](https://tailwindcss.com)
- Content Collections validated with Zod
- [Vercel](https://vercel.com) for the site, [Cloudflare R2](https://developers.cloudflare.com/r2/) for the videos
- [Satori](https://github.com/vercel/satori) and [sharp](https://sharp.pixelplumbing.com) for the share images
- Tooling: [mise](https://mise.jdx.dev), pnpm, [just](https://just.systems), [prek](https://github.com/j178/prek) for the pre-commit hooks, ESLint and Prettier

## Highlights

- **No UI framework.** Astro components and CSS. The few interactive pieces are small scripts that reattach after each client-side navigation ([`lib/page-lifecycle.ts`](src/lib/page-lifecycle.ts)). The rule is CSS first, then a motion library only if CSS can't do it; none was needed so far.
- **Scroll-driven animations in plain CSS**: the Hero handing over to the projects, the cards coming in, the "About" timeline lighting up as you read. Without support, or with reduced motion, the page shows its final state: it reads the same without animations.
- **The URL is the state.** The language is in the path, with translated segments (`/es/proyectos/…`, `/en/projects/…`), the projects tab is in the query, and each project is its own page. The language switch keeps the section you're reading and the open tab.
- **The platform does the work**: project tours in a native `<dialog>` opened with Invoker Commands (no JavaScript), view transitions, and color tokens in `oklch` with `light-dark()`.
- **Content apart from the UI.** Each project is a folder with its data and its texts in both languages, checked by a schema that tells apps from npm packages.
- **Lean media.** Clips in AV1 with an H.264 fallback, from R2, requested only when their card is about to show, and never with reduced motion or data saver. A share card per page, generated at build.
- **Accessibility**: WCAG 2.2 AA as the floor, with lint rules for it, and keyboard-tested.
- **Client work with synthetic data.** Client projects are shown with fictional brands and data.

## Getting started

You need [mise](https://mise.jdx.dev), which installs everything else at the versions in `.mise.toml`.

```sh
mise install    # Node 24, pnpm 12, prek, just and rclone
pnpm install
prek install    # the pre-commit hooks: Prettier, ESLint and astro check
pnpm dev        # http://localhost:4321
```

| Command                    | What it does                                        |
| -------------------------- | --------------------------------------------------- |
| `pnpm dev`                 | Dev server                                          |
| `pnpm build`               | Static build in `dist/`                             |
| `pnpm preview`             | Serves the build                                    |
| `pnpm check`               | Type-checks `.astro` and `.ts` files                |
| `pnpm lint`                | ESLint, accessibility rules included                |
| `pnpm format`              | Prettier (`format:check` only checks)               |
| `just placeholder-videos`  | Creates stand-in videos for projects without them   |
| `just encode-video <slug>` | Encodes a project's masters into what the site uses |
| `just upload-videos`       | Uploads the encoded videos to R2                    |

### Videos

Videos stay out of git. In development they're served from `public/videos/`, and in production from `media.pablonortiz.com`, so a fresh clone has none and the cards show their still image; `just placeholder-videos` creates stand-ins. Encoding needs ffmpeg with SVT-AV1 (Homebrew's build includes it), and uploading needs `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in a `.env` file.

## Structure

```text
src/
├─ content/projects/<slug>/   project.yaml, es.md, en.md and poster.png
├─ sections/                  hero, projects, about, process, contact: each with its texts in both languages
├─ components/                site-wide pieces: navigation, footer
├─ layouts/BaseLayout.astro   the <head>: SEO, Open Graph and the saved theme
├─ lib/                       i18n, localized URLs, projects and the share images (og-image/)
├─ pages/                     the [lang]/ routes and the og/ image endpoints
├─ config/                    site texts, navigation, contact links
└─ styles/global.css          design tokens
```

## Docs

[`docs/`](docs/README.md) (in Spanish) records what's built, how and why: the goals, the architecture, each section, and a log of every decision with its reasons.

## License

© 2026 Pablo Ortiz. All rights reserved: the code is public to be read, not licensed for reuse.
