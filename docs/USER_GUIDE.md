# User guide

Resuma is a browser-based editor for creating one resume draft at a time. It does not require an account.

## Start a resume

1. Open the landing page and select **Create resume**, or navigate to `/builder`.
2. Fill in the sections in the editor. The preview updates as you type.
3. Use the **Load sample** action to review a populated example. Confirm the dialog before replacing the current draft with the sample.
4. Use **Reset** to replace the current resume content with the blank starter draft. Confirm before resetting.
5. Select **Download PDF** to export the current preview. An entirely empty resume must be filled in before it can be exported.

## Resume sections

- **Contact:** full name, location, email, phone, LinkedIn, portfolio, and professional summary.
- **Education:** school, location, degree/program, dates, and academic details.
- **Experience:** organization, role, location, dates, and bullet-point achievements.
- **Projects:** project name, link, technologies, and bullet-point highlights.
- **Skills:** free-form text, with one category or line per line in the preview.
- **More / Certifications:** certification name, issuer, and date.

Education, experience, projects, and certifications are repeatable lists. Add entries, remove entries, and move them up or down to change their displayed order. Blank entries are omitted from the preview.

## Preview controls

- **Format:** Classic or Centered.
- **Titles:** choose the resume section-title color.
- **Zoom:** changes only the preview's on-screen scale.
- **Font size:** changes the resume preview text size.
- On small screens, use **Edit** and **Preview** to switch between the editor and rendered document.

The selected format and title color are saved locally. Zoom and font size are session controls and return to their defaults when the builder is reloaded.

## Autosave and reset

The builder saves resume content and visual preferences to this browser's local storage. The “Saved locally” status appears after content changes. Data is specific to the browser profile and site origin; it does not follow you to another device.

Reset clears the resume draft to its blank starting values. It does not clear the selected format or title color. To remove all local Resuma values, clear this site's storage using your browser's site-data settings.

## PDF download

PDF generation runs in the browser using the rendered resume preview. The current implementation captures the preview as an image and places it on a single portrait Letter-size PDF page. The exported page is not a multi-page, selectable-text document; a long resume may be scaled to fit. Review the downloaded PDF before sending it to an employer.

The downloaded filename is based on the entered full name when available, otherwise `Resume.pdf`.
