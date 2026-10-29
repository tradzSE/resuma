# Contributing to Resuma

Thank you for your interest in contributing to Resuma! Whether you want to fix a bug, add a new resume template, polish the UI, or improve documentation, contributions are welcome.

---

## How to Contribute

### 1. Fork or Clone the Repository
- **Direct Collaborators** (if you have repository access):
  ```bash
  git clone https://github.com/tradzSE/resuma.git
  cd resuma
  ```
- **External Contributors**:
  1. Click **Fork** at the top-right of [https://github.com/tradzSE/resuma](https://github.com/tradzSE/resuma).
  2. Clone your forked repository:
     ```bash
     git clone https://github.com/<your-username>/resuma.git
     cd resuma
     ```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view your live edits.

### 4. Create a Feature Branch
Create a branch for your changes:
```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/your-bug-fix
```

### 5. Validate Your Changes
Before submitting your code, make sure the project passes linting and builds cleanly:
```bash
# Run ESLint
npm run lint

# Verify the production build
npm run build
```

### 6. Commit & Push
Commit your work with clear, descriptive messages:
```bash
git add .
git commit -m "feat: describe your change clearly"
git push origin feature/your-feature-name
```

### 7. Open a Pull Request (PR)
1. Go to the repository on GitHub.
2. Click **"Compare & pull request"**.
3. Describe the change, why it was made, and include screenshots or screen recordings for any visual/UI updates.
4. Submit the pull request for review.

---

## Development Guidelines

- **Privacy First**: Resuma is an on-device application. Resumes stay in the user's browser `localStorage`. Do not add third-party tracking, analytics cookies, or external server persistence without discussion.
- **Export Integrity**: Ensure any resume layout or styling changes render correctly both on screen and during browser PDF export.
- **Responsive Design**: Test changes on both mobile screens and desktop viewports.
