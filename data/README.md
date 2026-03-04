# Site content (JSON)

The site loads content from this folder. Edit these files to update the site without changing HTML.

| File | Used by | Format |
|------|---------|--------|
| `bio.json` | Homepage → intro | `{ name, paragraphs: [ { parts: [ { text? }, { code? }, { link: { href, text }? }, { ref: number }? ] } ], references: { "1": "tip text", ... } }` |
| `articles.json` | Homepage → Articles | Array of `{ title, date, url, excerpt }` |
| `experience.json` | Homepage → Experience | Array of `{ title, company, date, location?, description }` |
| `projects.json` | Homepage → Projects | Array of `{ title, url, description, skills[] }` |
| `woodworking.json` | Craft page (`pages/wood.html`) | `{ title?, description?, images: [ { src, alt, description? } ] }` |

Image paths in `woodworking.json` are relative to the page (e.g. `../pics/photo.jpg` from `pages/wood.html` = project root `pics/photo.jpg`).

**Note:** The site must be served over HTTP (e.g. `npx serve`, GitHub Pages) for JSON to load. Opening `index.html` as a file may leave sections empty.
