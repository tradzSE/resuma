# Resuma documentation

This documentation describes the current implementation in the repository. The source code is authoritative if the documentation and application behavior differ.

## Guides

- [User guide](./USER_GUIDE.md) — editor sections, preview controls, autosave, reset, sample data, and PDF export.
- [Data model](./DATA_MODEL.md) — TypeScript resume shapes and browser-storage keys.
- [Architecture](./ARCHITECTURE.md) — routes, component responsibilities, state flow, and structured metadata.
- [Development and deployment](./DEVELOPMENT_AND_DEPLOYMENT.md) — prerequisites, commands, environment configuration, and production behavior.
- [Privacy and limitations](./PRIVACY_AND_LIMITATIONS.md) — browser storage, exports, and current product constraints.
- [Contributing to Resuma](./CONTRIBUTING.md) — how to request access or contribute with a fork, and the code contribution workflow.

## Project summary

Resuma is a single-user resume editor built with Next.js App Router, React, and TypeScript. The builder edits one resume draft at a time, previews it in the browser, saves it locally, and creates a PDF download. There is no account system, collaboration feature, application API, or server-side resume database in the current implementation.

The application source is under `src/`. Core resume types and defaults are in `src/lib/resume.ts`; the builder and preview are in `src/components/ResumeBuilder.tsx`; app routes are in `src/app/`.

## Maintenance

Update the user guide when editor behavior changes, the data model guide when resume fields or persistence keys change, the architecture guide when routes or boundaries change, and the privacy guide when data handling or analytics changes. Keep the root README as the GitHub landing-page overview and point it to this index.
