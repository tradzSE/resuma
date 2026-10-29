# Architecture

## Stack

Resuma uses Next.js 16 App Router, React 19, and TypeScript. Tailwind CSS/PostCSS packages are present, while the application's page styling is primarily defined in `src/app/globals.css`. `@/*` resolves to `src/*`.

The resume editor is a client component because it needs interactive React state, local storage, browser preview rendering, and downloads. Resume data has no server persistence.

## Routes

| Route | Implementation | Purpose |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing page and `SoftwareApplication` / `WebSite` JSON-LD. |
| `/builder` | `src/app/builder/page.tsx` | Resume editor and live preview. |
| `/about` | `src/app/about/page.tsx` | Project information. |
| `/privacy` | `src/app/privacy/page.tsx` | Public privacy explanation. |
| `/terms` | `src/app/terms/page.tsx` | Public terms of use. |
| `/opengraph-image` | `src/app/opengraph-image.tsx` | Generated Open Graph image. |
| `/robots.txt` | `src/app/robots.ts` | Crawler rules and sitemap URL. |
| `/sitemap.xml` | `src/app/sitemap.ts` | Static route sitemap. |

Unknown routes render the custom not-found page.

## Main source areas

| Path | Responsibility |
|---|---|
| `src/app/` | App Router routes, metadata, generated web resources, and global styles. |
| `src/components/ResumeBuilder.tsx` | Editor, form controls, live preview, browser persistence, reset/sample confirmation, and PDF export. |
| `src/components/LandingPage.tsx` | Public landing experience and platform showcase. |
| `src/components/InfoPage.tsx` | Shared layout for About, Privacy, and Terms pages. |
| `src/components/ui/` | Reusable visual components, including the landing-page laptop showcase. |
| `src/lib/resume.ts` | Resume TypeScript types, blank defaults, entry factories, and sample content. |
| `public/` | Static icons, screenshots, and platform logos. |
| `docs/` | User, developer, data, and collaboration documentation. |

## State and export flow

```text
src/lib/resume.ts (types and defaults)
        ↓
ResumeBuilder React state
        ├── writes resume/preferences to localStorage
        ├── renders ResumePreview
        └── captures preview → html2canvas → jsPDF → browser download
```

The resume model is held in React state while editing. An effect writes it to `localStorage`; initialization restores it from the same browser. The preview is rendered from this in-memory data. PDF creation dynamically imports `html2canvas` and `jspdf`, captures the preview, and downloads the resulting PDF.

## Hosting and metadata

The default public origin is `https://resuma.ranierteraldico.me`. `NEXT_PUBLIC_SITE_URL` can override the origin used by metadata, robots, and the sitemap. The root layout defines site metadata, Open Graph/Twitter cards, icons, and fonts. The landing page emits JSON-LD for `SoftwareApplication` and `WebSite`.

The app icon uses the black-and-white document mark with a lime fold: `public/favicon.svg` is the scalable source, with PNG variants for common browser and Apple touch-icon sizes. ICO variants are provided in `public/` and `src/app/` for browser and Next.js favicon handling. The browser theme color is set to near-black in the root layout.
