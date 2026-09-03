# USW Local 5025-02 website

Static site built with Astro. Hosted free on Netlify. News posts are markdown
files, so publishing is: write a file, push, and the site rebuilds itself.

## What's here

- **News** — markdown files in `src/content/announcements/`. Newest shows first; set `pinned: true` to stick one to the top.
- **Documents** — the CBA and elections manual. Files live in `public/documents/`. The list is set in `src/pages/documents.astro`.
- **Contact** — a Netlify form. Submissions land in your Netlify dashboard and can email you.
- **About** — the local's info. Add your officers and stewards here.

## Run it on your machine

```bash
npm install
npm run dev        # open http://localhost:4321
npm run build      # output goes to dist/
```

Node 22 or newer.

## Put it online (one time)

1. Push this folder to a new GitHub repo.
2. In Netlify: **Add new site > Import from GitHub**, pick the repo. Netlify reads `netlify.toml`, so the build settings are already set. Deploy.
3. Point your domain: in Netlify **Domain settings**, add `usw5025.com`, then update the DNS at GoDaddy to Netlify's records. The address stays the same for members.

After that, every push to GitHub redeploys automatically.

## Post a news announcement

Two ways.

**Edit the file directly (works today, no setup):**
Copy an existing file in `src/content/announcements/`, rename it, change the
front matter and text, and push. Done.

```markdown
---
title: "Your headline"
date: 2025-09-15
summary: "One or two sentences that show in the news list."
pinned: false
---

Your announcement text here. Regular markdown: **bold**, lists, links.
```

**Use the admin panel (nicer, edit from your phone):**
The `/admin` page runs Sveltia CMS. To turn it on, you set up GitHub login once:

1. Edit `public/admin/config.yml` and set `repo:` to your GitHub username + repo.
2. Set up a GitHub OAuth app so the panel can log in. The free route is a small
   Cloudflare Worker (`sveltia-cms-auth`). Follow the getting-started guide at
   https://github.com/sveltia/sveltia-cms
3. Then visit `usw5025.com/admin`, log in with GitHub, and post from anywhere.

Until you do that, editing the markdown files directly works fine.

## Replace the placeholder PDFs

`public/documents/` has two PLACEHOLDER PDFs. Drop your real files in with the
same names to keep the links working:

- `cba-2024-2027.pdf`
- `usw-elections-manual.pdf`

## Contact form email

By default submissions show in the Netlify dashboard under **Forms**. To get
emailed each time, go to **Forms > Settings > Form notifications** and add your
email. The free tier covers 100 submissions a month.

## Change something common

- **Colors, fonts, spacing:** `src/styles/global.css`, top of the file.
- **Nav links:** `src/components/Header.astro`.
- **Footer / meeting info:** `src/components/Footer.astro`.
- **Officers:** `src/pages/about.astro`.
