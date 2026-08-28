# aaronjosephhall.com

Personal website of Aaron Joseph Hall — pastor, author, speaker, teacher, and
leadership writer. Rebuilt from scratch as a static site; the previous
Lovable/Supabase implementation is not used here.

## Status

This is an initial scaffold, not a finished migration. Most page copy and
article bodies are placeholders marked "content pending" until the original
text is migrated verbatim from the live site. See `MIGRATION.md` for the
full inventory of what is verified, what is guessed/inferred (flagged), and
what is still needed.

## Stack

- **[Astro](https://astro.build)** — static site generator, ships zero JS by
  default. Chosen because this is a content/writing-first site with no need
  for client-side app state.
- **Content collections** (`src/content/`) — articles, speaking topics,
  books, and media entries are MDX files with typed frontmatter
  (`src/content/config.ts`). No database, no CMS, no runtime API calls.
- **Tailwind CSS v4** for styling.
- Category filtering and search on `/articles` are plain client-side
  JavaScript over the statically-rendered list — no server, no database.

## Adding content

Each collection is a folder of `.mdx` files under `src/content/`:

- `articles/<slug>.mdx` → `/articles/<slug>`
- `speaking/<slug>.mdx` → `/speaking/<slug>`
- `books/<slug>.mdx` → `/books/<slug>/` (trailing slash, matches the live
  site's existing book URL)
- `media/<slug>.mdx` → `/media/<slug>`

The filename (minus `.mdx`) becomes the URL slug, so **do not rename an
existing file** without also adding a redirect — see "Redirects" below.

Frontmatter fields are typed and validated in `src/content/config.ts`.
Anything not yet confirmed from the live site is left optional rather than
guessed; components render a "pending" state instead of inventing content.

## Redirects

If a slug must change, add an entry to `vercel.json`'s `redirects` array so
the old public URL keeps resolving. Do not silently rename a live URL.

`vercel.json` deliberately does not set a global `trailingSlash` value.
Vercel's `trailingSlash` config is site-wide (true/false), but this site's
verified URLs are mixed — the one book page keeps its trailing slash while
articles, speaking topics, and media entries don't. Astro's static output
(`dist/<route>/index.html` for every route) serves both the with- and
without-slash form of any URL without a forced redirect, so the mix works
without needing per-path Vercel config. Each page's `<link rel="canonical">`
still points at the exact original URL form for SEO.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # astro check (types + content schema)
npm run build     # static build to dist/
npm run preview   # serve the production build locally
```

## Deployment

GitHub → Vercel → aaronjosephhall.com. Push to `main` deploys to Vercel's
preview/production pipeline. **The production domain is intentionally not
connected yet** — see `MIGRATION.md` for what's still pending before that
happens.

No database, no Supabase, no CMS, no authentication, and no runtime API
calls are required to serve this site.
