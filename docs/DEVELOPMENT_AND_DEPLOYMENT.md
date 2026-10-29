# Development and deployment

## Prerequisites

- Node.js compatible with the project's Next.js version.
- npm.

## Local setup

Run from the repository root:

```bash
npm install
npm run dev
```

The development server uses Next.js with Webpack. Open `http://localhost:3000`.

## Validation and production

```bash
npm run lint
npm run build
npm run start
```

- `npm run lint` runs ESLint.
- `npm run build` makes a production build using Next.js with Webpack.
- `npm run start` serves the production build locally; run it after a successful build.

There is no test script configured in the current `package.json`.

The master app icon is `public/favicon.svg`; raster icon variants are checked in alongside it. If the mark changes, regenerate the PNG and ICO variants together so browser tabs, shortcuts, and Apple touch icons stay consistent.

## Environment

`NEXT_PUBLIC_SITE_URL` is optional. When unset, the application uses `https://resuma.ranierteraldico.me`. The value is read by the root layout, `src/app/robots.ts`, and `src/app/sitemap.ts`; use the deployed canonical origin when setting it for another deployment.

No database credentials or application-backend secrets are required by the current source.

## Deployment notes

Deploy to a host that supports Next.js 16 and the configured Webpack build. The repository has no custom API server, database, or file-upload service. Resume data stays in client storage; PDF rendering uses browser capabilities.

`src/app/sitemap.ts` lists `/`, `/builder`, `/about`, `/privacy`, and `/terms`. `src/app/robots.ts` allows public crawling and points to the generated sitemap. Update those routes if public pages are added or removed.
