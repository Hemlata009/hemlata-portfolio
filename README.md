# Hemlata – Portfolio

A recruiter-focused portfolio for data analyst, data engineer, data scientist, ML engineer and AI engineer roles.
React 18 + TypeScript + Vite, plain CSS, no backend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Checks

```bash
npm run typecheck  # tsc
npm run lint       # eslint
npm test           # vitest: data integrity and claim checks
npm run build      # production build into dist/
npm run check-links  # confirms every external URL in the data responds
```

## Where the content lives

All copy is data, not markup. Edit these files; the pages update.

| File | Content |
| --- | --- |
| `src/data/profile.ts` | Name, headline, links, education, four-stage narrative, achievements |
| `src/data/projects.ts` | Case studies (problem, approach, results, limitations, repo link) |
| `src/data/experience.ts` | Roles and skills |

`src/data/data.test.ts` fails the build if a case study is incomplete, a repo link points outside
`github.com/hemlata009`, or an unverified claim (for example "R² > 0.85" or "250,000") appears.

## Rules for adding a project

1. Run the project and take the metrics from its own output. Do not copy numbers from a resume.
2. Fill every field in `projects.ts`, including limitations.
3. Set `repo` to a real public URL or `null`. Set `demo` only when the demo is live.
4. Run `npm test` and `npm run check-links`.

## Deploy (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables: none
- Routing: `public/_redirects` sends every path to `index.html` so `/projects/...` works on refresh.
- Update: push to the connected branch; Netlify rebuilds.
- Roll back: Netlify → Deploys → pick the previous deploy → *Publish deploy*.

### Deploy (Vercel)

`vercel.json` already sets the build command, the `dist` output and a fallback to `index.html`, so
`/projects/...` links survive a refresh. Import the GitHub repo in Vercel and deploy; no settings or
environment variables are needed. Roll back from the project's *Deployments* tab by promoting an earlier deployment.

Keep the old site live until this one is verified, then point the domain over.

### After you know the final domain

- Make `og:image` in `index.html` absolute, e.g. `https://your-domain/og-image.png`.
- Add `<link rel="canonical" href="https://your-domain/">` to `index.html`.
- Add a `Sitemap:` line to `public/robots.txt` and a `public/sitemap.xml` listing `/` and each `/projects/<slug>`.

## Known limitations

- Single-page app: social previews show the home-page title and image for every route.
- No project screenshots yet; case studies use workflow diagrams and measured results instead.
- No contact form on purpose. Email is a plain `mailto:` link, so nothing can silently fail.
