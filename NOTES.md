# Jay Egger Site Notes

## Live setup
- Host: Cloudflare Pages
- Build: `npm run build` → `_site`
- Domain: jayegger.com (www redirects via `_redirects`)
- GA: G-70QQ2KC0XH
- Formspree: mvzdvzko

## Content structure
- Home: hero, now, featured writing, featured project (coming soon), contact CTA
- Blog: Markdown posts in `src/blog/posts/*.md`
- About: bio, highlights, skills/tools, links
- Contact: Formspree form + mailto/LinkedIn

## Design system
- Palette: bg #111822, card #f6f0e9, burnt #bf5700, teal #3caea3, maize #f7c948
- Fonts: Press Start 2P (accents), Syne Mono (headings), system body
- Layout: mobile-first; 1-col by default; 2-col hero/blog at ≥960px; nav wraps; overflow-x hidden
- Hero image: aspect 4:5, max-width ~300px, object-fit: cover

## SEO/meta
- Canonical + OG/Twitter in `base.njk`; per-post OG uses `featuredImage` if set
- Person JSON-LD in base; Article JSON-LD in posts (headline, desc, author, dates, image, publisher)
- Feeds: `/rss.xml`; Sitemap: `/sitemap.xml`; Robots: `/robots.txt`

## Deployment
- Push to `main`; Cloudflare Pages auto-builds/deploys
- `_redirects` handles www → root
- Keep secrets out of repo; IDs live in `src/_data/site.json`

## Drafts
- Add `draft: true` to exclude from production
- Preview drafts locally: `npm run dev:drafts` (or `ELEVENTY_ENV=drafts npm run dev`)

## How to add a post
1) `npm run new:post -- --title "My Post" [--slug slug] [--date YYYY-MM-DD]` (creates draft by default)
2) Edit front matter/content; optional fields:
   ```yaml
   updated: 2026-02-10            # optional
   featuredImage: /assets/img.jpg # optional for OG/schema
   featured: false                # set true to show in Featured Writing
   draft: true|false
   ```
3) Images: add to `src/assets/`, reference as `/assets/filename.ext`
4) Optional sanity check: `npm run build`
5) Publish: set `draft: false`, commit, push to `main`

## Featured writing
- Mark a post with `featured: true` to surface it on the home “Featured Writing” section.
- If no featured posts, home falls back to latest posts; if none, it shows a message.

## Backlog / Next steps
- Add real featured project content or a Projects page
- Write/publish real posts; add `featuredImage` per post for better previews
- Consider a per-post OG image helper if needed
- Optionally simplify marquee further
