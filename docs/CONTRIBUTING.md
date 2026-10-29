# Contributing and adding collaborators

## Invite a GitHub collaborator

Adding a repository collaborator grants a person access to the code; it does not create a collaborative resume-editing feature in the Resuma website.

For a GitHub repository you own or administer:

1. Open the repository on GitHub.
2. Open **Settings** → **Collaborators** (the exact label may appear as **Collaborators and teams**).
3. Select **Add people** / **Add collaborator**.
4. Search for the person's GitHub username or enter their email, then send the invitation.
5. Choose the least-privileged role that supports their work. Write access is generally enough to contribute branches and pull requests; avoid granting administrator access unless necessary.
6. Ask the invitee to accept the GitHub invitation.

If the repository belongs to an organization, an organization owner may need to manage team or repository access. Do not share your password or personal access token to grant access.

## Suggested code contribution workflow

1. Clone the repository after receiving access, or fork it if direct repository access is not intended.
2. Install dependencies with `npm install`.
3. Create a focused branch for the change.
4. Run the development app with `npm run dev`; run `npm run lint` and `npm run build` before opening a pull request.
5. Push the branch and open a pull request with a concise summary, screenshots for UI changes, and validation results.
6. Review and merge through GitHub according to the repository owner's process.

## Current collaboration boundary

Resuma is currently a single-user browser application. Multiple GitHub collaborators can work on its source code, but the live app has no shared drafts, user accounts, invitations, simultaneous editing, or backend persistence. Adding those product capabilities would require a separately designed feature and storage/authentication architecture.
