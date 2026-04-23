# Mydate

A cute, personalized GitHub Pages mini-site for asking someone to be your Valentine, go on a date, or say yes to forever.

Live site:
`https://helmij1992.github.io/Mydate/`

## Features

- Personalized homepage with `Your Name` and `Their Name`
- Three playful question flows:
  - `valentine.html`
  - `date.html`
  - `married.html`
- Cute cat reaction GIFs
- Playful `No` button logic
- Celebration page with confetti
- GitHub Pages ready static site

## Project Files

```text
Mydate/
├── index.html
├── home.js
├── valentine.html
├── date.html
├── married.html
├── question-page.js
├── yes.html
├── yes-script.js
├── style.css
└── music/
```

## Local Preview

Open `index.html` in a browser, or serve the folder with any static file server.

Examples:

```bash
cd /Users/muhammadhelmi/Documents/Mydate
python3 -m http.server 8000
```

Then open:
`http://localhost:8000`

## GitHub Pages

This repo is configured to deploy from:

- Branch: `main`
- Folder: `/ (root)`

Published URL:
`https://helmij1992.github.io/Mydate/`

## Custom Domain

To use a custom domain, you will need:

1. A domain or subdomain you control
2. DNS access from your domain provider
3. A `CNAME` file in this repo with your chosen domain

Typical setup:

- For a subdomain like `love.example.com`:
  - Create a `CNAME` DNS record pointing `love.example.com` to `helmij1992.github.io`
- For an apex domain like `example.com`:
  - Use your DNS provider's `A` or `ALIAS/ANAME` records based on GitHub Pages requirements

After DNS is ready, add the custom domain in GitHub Pages settings and commit a `CNAME` file containing only the domain.

## Personalization

The site passes names using query params and local storage:

- `from`
- `to`

Example:

```text
https://helmij1992.github.io/Mydate/valentine.html?from=Muhammad&to=Alya
```

## License

Personal project. Customize freely.
