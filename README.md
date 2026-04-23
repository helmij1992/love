# love

A cute, personalized static mini-site for asking someone to be your Valentine, go on a date, or say yes to forever.

Live site:
`https://helmij1992.github.io/love/`

## Features

- Personalized homepage with `Your Name` and `Their Name`
- Three playful question flows:
  - `valentine.html`
  - `date.html`
  - `married.html`
- Cute cat reaction GIFs
- Playful `No` button logic
- Celebration page with confetti
- Static site ready for Netlify or GitHub Pages

## Project Files

```text
love/
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

## Netlify Deployment

This project is deployable as-is on Netlify:

- Build command: none
- Publish directory: `.`
- Config file: `netlify.toml`

Quick steps:

1. Push this repo to GitHub
2. In Netlify, choose `Add new site` -> `Import an existing project`
3. Select this repo
4. Keep the default branch as `main`
5. Leave the build command empty
6. Set the publish directory to `.`
7. Deploy

Because the site uses relative asset paths and runtime-generated share links, it does not depend on the GitHub Pages URL structure.

## GitHub Pages

If you still want GitHub Pages too, this repo also works from the root of the `main` branch.

## Personalization

The site passes names using query params and local storage:

- `from`
- `to`

Example:

```text
/valentine.html?from=Your%20Name&to=Their%20Name
```

## License

Personal project. Customize freely.
