# Prospera Website

Static website for Prospera, a student-led organization focused on early academic exposure for middle school students.

## What is included

- `index.html` home page
- `about.html` about and leadership page
- `programs.html` curriculum overview
- `resources.html` lesson plan and resource portal
- `contact.html` enrollment and partner contact page
- `styles.css` shared site styles
- `favicon/` icon assets and web manifest

## Local preview

Use any static web server from the project root. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub and Cloudflare Pages setup

1. Initialize the folder as a git repository.
2. Create a GitHub repository and push this project to it.
3. In Cloudflare Pages, connect the GitHub repository.
4. Use the repository root as the build output because this site is static HTML.

No build command is required unless the site is later converted to a framework or bundler-based app.