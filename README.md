# Resuma

Resuma is a browser-based resume editor with a live preview, locally saved drafts, simple layout controls, and direct PDF export. It does not require an account.

## Features

- Edit contact details, a professional summary, education, experience, projects, skills, and certifications.
- See a live resume preview and reorder or remove list entries.
- Choose Classic or Centered formatting, title color, preview zoom, and font size.
- Load an example resume or reset the current draft.
- Autosave resume content and selected visual preferences in browser storage.
- Export the preview as a PDF from the browser.
- Use an editor/preview switch on mobile screens.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

## Documentation

See [`docs/README.md`](./docs/README.md) for the documentation index, including the user guide, data model, architecture, development, privacy, and collaboration instructions.

## Privacy note

Resume content is saved in this browser's local storage; it is not synchronized to a Resuma account or server. Downloaded PDFs are generated in the browser. Use a device and browser profile you trust, and keep a separate copy of important resumes.
