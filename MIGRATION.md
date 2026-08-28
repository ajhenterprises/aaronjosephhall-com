# Migration inventory & status

Source of truth for this migration is the inventory the site owner supplied
directly in-session (2026-08-28), **not** an independent crawl of
aaronjosephhall.com. This Claude Code environment's network egress policy
blocks outbound access to essentially all external domains except a fixed
dev-infrastructure allowlist (npm, GitHub API, etc.) — confirmed by a direct
`curl` returning `403 connect_rejected` for both `aaronjosephhall.com` and
`web.archive.org`. `WebSearch` still works but only returns short snippets,
not full page text, image assets, or exhaustive link listings, so it cannot
substitute for a real crawl.

**This inventory is not independently verified and is not guaranteed
complete.** Do not treat it as final until either (a) this environment's
egress allowlist is widened so a real crawl can run, or (b) the site owner
confirms it's complete by other means.

## Pages — status: verified list, structure built

| URL | Built | Copy status |
|---|---|---|
| `/` | ✅ | Placeholder hero/intro copy |
| `/about` | ✅ | Pending — no body copy supplied yet |
| `/speaking` | ✅ | Structure built, topic list may be incomplete (see below) |
| `/books` | ✅ | Structure built, book list may be incomplete (see below) |
| `/leadership` | ✅ | Structure list preserved verbatim; intro copy pending |
| `/consulting` | ✅ | Service list preserved verbatim; descriptions pending |
| `/ministry` | ✅ | Area list preserved verbatim; descriptions pending |
| `/media` | ✅ | Structure built, media list may be incomplete (see below) |
| `/articles` | ✅ | Archive + client-side category filter + search built |
| `/contact` | ✅ | Placeholder — need to confirm form vs. mailto on the live site |

## Articles — 4 of an unknown total

Verified article URLs, built as content-collection entries at their exact
existing slugs:

| URL | Title | Date | Category |
|---|---|---|---|
| `/articles/leadership-begins-with-a-healthy-soul` | Leadership Begins with a Healthy Soul | **pending** | **pending** |
| `/articles/7-lessons-ive-learned-planting-a-church` | 7 Lessons I've Learned Planting a Church | **pending** | **pending** |
| `/articles/a-bold-witness` | A Bold Witness | **pending** | **pending** |
| `/articles/my-review-of-rags-to-rescued-365-days-devotional` | My Review of Rags to Rescued 365 Days Devotional | **pending** | Devotionals *(inferred from title/URL — not independently confirmed; flagging per your instruction not to guess silently)* |

**Not yet accounted for:** dates, categories, excerpts, featured images, and
full body content for all four; and — critically — the archive almost
certainly contains more than four articles. I have not been able to crawl
`/articles` pagination, category/filter URLs, or internal links to find the
rest, per the access limitation above.

The 14 categories you listed are preserved in `src/content.config.ts` as the
full allowed set, independent of which articles use them yet.

## Speaking — 3 of an unknown total

`/speaking/lead-well`, `/speaking/redeem-the-story`,
`/speaking/church-planting` are built. The live index's "Other Topics"
flexible option is noted on the page but not implemented as a route pending
clarification of what it actually links to. Whether additional named topic
pages exist beyond these three is unverified.

## Books — 1 of an unknown total

`/books/redeem-the-story-a-call-to-let-god-rewrite-your-story/` is built
with the exact trailing-slash URL preserved. Description, ISBN, page count,
and purchase links are all pending — none of that text was in the supplied
inventory. Whether additional books exist on the live `/books` index is
unverified.

## Media — 2 of an unknown total

`/media/week-11-acts-6-aaron-joseph-hall` and
`/media/freedom-people-purpose-vision-casting` are built. Whether these are
sermons, interviews, or conversations, their dates, embeds, and descriptions
are all pending. Whether additional media entries exist is unverified.

## Redirects

None needed yet — every built URL matches a verified live URL exactly,
including the trailing slash on the one book page. If any slug needs to
change during content migration, add it to a `redirects` entry in
`vercel.json` before renaming — see README.md.

## Architecture

- **Framework:** Astro 7 (static output, zero client JS by default).
- **Static generation:** `astro build` → prerendered HTML in `dist/`. No
  server-side rendering, no edge functions, no ISR.
- **Content storage:** MDX files with typed frontmatter under
  `src/content/{articles,speaking,books,media}/`, validated by
  `src/content.config.ts`. Filenames are the URL slugs.
- **Search/filtering:** plain client-side JS over the statically rendered
  `/articles` list (`src/pages/articles/index.astro`). No API, no database.

## Backend

- **No database of any kind.**
- **Supabase is not used and not required.**
- **No runtime API calls are required to serve any page.** The optional
  contact form (pending confirmation of whether the live site even has one)
  would be the one exception, and even that should be a stateless mail
  relay, not a database-backed feature.

## Deployment

- **GitHub repository:** not yet created — `create_repository` for
  `ajhenterprises/aaronjosephhall-com` returns `403 Resource not accessible
  by integration`. Needs either the repo created manually by the site owner
  or the GitHub App granted repo-creation rights.
- **Vercel:** not yet connected — depends on the GitHub repo existing first.
- **Temporary Vercel URL:** none yet.

## What's needed from the site owner to move this forward

1. Either widen this environment's network egress allowlist to include
   aaronjosephhall.com (so an actual crawl can run), or continue supplying
   the inventory and content directly.
2. The empty `aaronjosephhall-com` GitHub repo (or granted repo-creation
   permission).
3. Full body copy for: home, about, leadership intro, consulting
   descriptions, ministry descriptions, the 4 verified articles (plus
   whatever others exist), the 3 speaking topics, the book page, and the 2
   media entries.
4. Confirmation of whether `/contact` has a real form or a mailto link on
   the live site.
