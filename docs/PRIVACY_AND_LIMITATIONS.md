# Privacy and limitations

## Resume storage

The editor stores resume content and selected visual preferences in local storage on the current browser and site origin. The keys are documented in the [data model](./DATA_MODEL.md). There is no account, sync service, or resume database in the current implementation, so drafts do not automatically move between browsers or devices.

Anyone with access to the same browser profile and site storage may be able to access the saved resume. Avoid using a shared or public browser for sensitive information, and clear the site's stored data when appropriate. Resetting the resume clears resume fields but does not clear the saved format or title color preferences.

## PDF export

PDF generation happens in the browser from the live preview. The current implementation captures the rendered document as an image and puts it on one portrait Letter page. It does not create selectable PDF text or paginate long content. Check legibility and completeness before using the exported file.

## Product limitations

- One active resume draft is supported per browser origin; there is no multiple-document manager.
- The data model is fixed in code. Users cannot define custom sections or templates.
- Resume content is not imported from or synchronized with job platforms.
- The PDF is a visual export of the preview, not a guarantee of acceptance by employers or applicant-tracking systems.
- Resume content and generated files are not validated for accuracy; review them before sharing.

## Web metadata

The landing page includes public Schema.org JSON-LD describing Resuma as software and a website. It does not include user-entered resume information.
