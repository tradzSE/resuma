# Resume data model

The application does not use a database schema. Resume data is represented by TypeScript types in `src/lib/resume.ts` and saved as JSON in the user's browser local storage.

## TypeScript model

```ts
type Contact = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
};

type Education = {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
};

type Experience = {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string;
};

type Project = {
  id: string;
  name: string;
  link: string;
  technologies: string;
  bullets: string;
};

type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

type ResumeData = {
  contact: Contact;
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string;
  certifications: Certification[];
};
```

Every field is a string. Repeated entries have an `id` for React list identity and editing/reordering. Text-area bullet lists are stored as newline-delimited strings and split into trimmed, non-empty lines when rendered.

`defaultResume` creates a blank draft with one empty education, experience, project, and certification row. `sampleResume` supplies example content for those fields. This is a fixed application model, not a configurable form schema.

## Local storage

The builder currently uses these keys:

| Key | Stored value | Persistence |
|---|---|---|
| `resuma-resume-data-v2` | JSON-serialized `ResumeData` | Automatically updated as resume content changes. |
| `resuma-document-style` | `classic` or `centered` | Updated when the format control changes. |
| `resuma-title-color` | Hex color string | Updated when the title color control changes. |

Zoom and font size are not persisted. There is no account, server-side storage, synchronization, or import/export of the JSON draft in the current product. The PDF download is an output document, not a restorable data backup.

On startup, the builder parses the stored resume JSON. If parsing fails, it removes that resume key and continues with the blank default. The stored JSON is type-asserted; it is not runtime-validated against the `ResumeData` shape.

## Structured web metadata

The landing page emits JSON-LD with Schema.org `SoftwareApplication` and `WebSite` objects. This metadata describes the public website for search engines; it is not a database schema and does not contain the user's resume.
