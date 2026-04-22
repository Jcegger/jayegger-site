# Local Reference (Not Tracked)

> This folder is in .gitignore. Use it for your own notes.

## Post Creation (CLI)
- Scaffold: `npm run new:post -- --title "My Post" [--slug slug] [--date YYYY-MM-DD]`
- Edits: open `src/blog/posts/<slug>.md`; fill description, excerpt, tags, body. Set `draft: false` when ready.
- Optional: `updated: YYYY-MM-DD`, `featuredImage: /assets/your-image.jpg` for OG/schema.
- Images: add to `src/assets/`, reference as `/assets/name.ext`.
- Build check (optional): `npm run build`.
- Deploy: commit/push to `main` (Cloudflare Pages auto-builds).
- Draft preview: `ELEVENTY_ENV=drafts npm run dev` (drafts excluded in prod).

## Site Management
- Local dev: `npm run dev` (Eleventy serve).
- Build: `npm run build`.
- New post helper: `npm run new:post -- --title "..."`.
- GA/Formspree IDs: `src/_data/site.json`.
- Notes: public `NOTES.md`; private notes here.

## Cleanup
- Delete a post: remove the Markdown in `src/blog/posts/` and push (RSS/sitemap update automatically).
- www redirect: handled by `_redirects` (already set).
- Avoid secrets in repo; don’t commit this folder.

## Troubleshooting
- Draft not showing: ensure `ELEVENTY_ENV=drafts` locally.
- Horizontal scroll: check grids/nav widths and images (already mobile-first).
- Previews broken: OG/Twitter use `featuredImage` or default OG; clear platform cache.
