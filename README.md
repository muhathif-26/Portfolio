# Jabeer Mohammed Muhaththeef — Portfolio

## Folder structure
```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
└── assets/
    ├── images/       ← your photo & project screenshots go here
    └── resume/       ← your resume PDF (already included)
```

Open `index.html` in any browser to preview it. To publish it, upload the whole
`portfolio` folder to GitHub Pages, Netlify, or Vercel (all free).

---

## 1. Add your real photo (replaces the placeholder)

Two spots use your photo: the small floating circle in the hero code-card, and
the bigger photo in the About section. Both currently point to
`assets/images/profile-placeholder.svg`.

**Steps:**
1. Pick a clear, front-facing photo (square-ish crops work best, e.g. 800×800px).
2. Rename it to something simple, e.g. `profile.jpg`.
3. Drop it into `assets/images/profile.jpg`.
4. In `index.html`, find these two lines and change the `src`:

```html
<!-- Hero floating photo -->
<img src="assets/images/profile-placeholder.svg" alt="Jabeer Mohammed Muhaththeef" id="profile-photo">

<!-- About section photo -->
<img src="assets/images/profile-placeholder.svg" alt="Jabeer Mohammed Muhaththeef portrait">
```
Change both `src="assets/images/profile-placeholder.svg"` to `src="assets/images/profile.jpg"`.

That's it — no CSS changes needed, both containers already crop the image nicely (`object-fit: cover`).

---

## 2. Add your own projects

Each project is one `<article class="project-card glass" ...>` block inside the
`<section id="projects">` in `index.html`. The easiest way to add a new one is to
copy an existing project block and edit the text. There's already a placeholder
"Your next project" card at the bottom of the projects grid you can replace.

**Steps:**
1. Add a screenshot of your project to `assets/images/`, e.g. `assets/images/project-myapp.jpg`
   (recommended size: ~800×450px, landscape).
2. Copy this template and paste it inside the `<div class="projects-grid">`,
   replacing the placeholder "Your next project" card:

```html
<article class="project-card glass" data-reveal data-tilt>
  <div class="project-thumb" style="background:none; padding:0;">
    <img src="assets/images/project-myapp.jpg" alt="My App screenshot"
         style="width:100%; height:100%; object-fit:cover;">
  </div>
  <div class="project-body">
    <h3>Your Project Name</h3>
    <p>One or two sentences describing what the project does and the problem it solves.</p>
    <ul class="project-features">
      <li>Key feature one</li>
      <li>Key feature two</li>
      <li>Key feature three</li>
    </ul>
    <div class="tech-badges">
      <span class="tech-badge">HTML5</span>
      <span class="tech-badge">CSS3</span>
      <span class="tech-badge">JavaScript</span>
      <!-- add/remove badges to match your stack -->
    </div>
    <div class="project-links">
      <a href="https://github.com/your-username/your-repo" target="_blank" rel="noopener">
        <i class="fa-brands fa-github"></i> Code
      </a>
      <a href="https://your-live-demo-url.com" target="_blank" rel="noopener">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
      </a>
    </div>
  </div>
</article>
```

3. If you don't have a screenshot yet, you can keep the icon-based thumbnail style
   instead — just copy one of the two existing project cards (Car Rental or
   Prescription System) and edit the `<i class="fa-solid ...">` icon, heading,
   description, feature list, and tech badges.
4. If a project has no live demo or public repo yet, add `class="disabled"` to
   that link (as done on the current two projects) so it's greyed out instead of
   pointing nowhere.

Font Awesome has thousands of icons if you want a different one for the thumbnail —
browse them at https://fontawesome.com/icons and swap the class name
(e.g. `fa-solid fa-gamepad`, `fa-solid fa-chart-line`, `fa-solid fa-cart-shopping`).

---

## 3. Other quick edits you'll likely want

- **Social links & WhatsApp**: search `href="https://github.com/"`,
  `href="https://linkedin.com/"`, and `wa.me/94000000000` in `index.html` and
  replace with your real profile URLs / phone number.
- **Phone number**: in the Contact section, replace "Add your phone number here".
- **Contact form**: Already fully wired with serverless HTTPS email delivery directly to your inbox (`muhathifmuhathif26@gmail.com`). Messages submitted on your website are instantly delivered with 0 backend maintenance required.
- **GitHub Activity card**: it's a placeholder in the "More" section — if you
  want live contribution stats, an easy no-backend option is an image widget
  like `https://ghchart.rshah.org/your-github-username`.
- **Resume button**: already wired to `assets/resume/Jabeer_Mohammed_Muhaththeef_Resume.pdf`.
  Replace that file whenever you update your resume, keeping the same filename
  (or update the `href` in the "Download Resume" button in `index.html`).

---

## 4. Publishing it for free

**GitHub Pages** (recommended, gives you a shareable link):
1. Create a new GitHub repo, e.g. `portfolio`.
2. Upload all files/folders from this `portfolio` directory to the repo root.
3. Go to Settings → Pages → set source to `main` branch, `/root`.
4. Your site will be live at `https://your-username.github.io/portfolio/`.

**Netlify / Vercel**: drag-and-drop the `portfolio` folder onto their dashboard
for an instant live link — no git required.
