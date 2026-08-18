# mirzagol.github.io

Personal site / landing page for Hossein Mirzagol. Plain HTML/CSS/JS — no build
step, no dependencies — so it can be served directly by GitHub Pages.

## Deploy to GitHub Pages

**Option A — user site (`https://mirzagol.github.io`):**

1. On GitHub, create a new repository named exactly `mirzagol.github.io`.
2. From this folder:
   ```bash
   git remote add origin git@github.com:mirzagol/mirzagol.github.io.git
   git branch -M main
   git push -u origin main
   ```
3. In the repo's **Settings → Pages**, set the source to the `main` branch, `/` (root).
4. The site goes live at `https://mirzagol.github.io` within a minute or two.

**Option B — project site (any repo name, e.g. `mirzagol/website`):**

Same as above but push to that repo, then in **Settings → Pages** select the
`main` branch. The site is served at `https://mirzagol.github.io/<repo-name>/`.
With this option, note that `index.html`/`styles.css`/`script.js` all use
relative paths, so it works fine under a subpath — no changes needed.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Structure

- `index.html` — all page content and sections
- `styles.css` — design tokens (colors, type, spacing) + all styling
- `script.js` — scroll-reveal, mobile nav toggle, typed hero line

## Updating content

All real data (repos, dates, roles) was pulled from `github.com/mirzagol`
and `Hossein_Mirzagol_Master_CV.md` as of Aug 2026. Update project cards in
the `#projects` section and timeline entries in `#experience` as new work
ships.
