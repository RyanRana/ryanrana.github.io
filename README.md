# Ryan Rana's Personal Website

Personal portfolio website featuring articles, projects, and professional experience.

## 🚀 Quick Start

### Running Locally

**Option 1: Quick Start (Recommended)**
```bash
./start.sh
```

**Option 2: Python Server**
```bash
python3 server.py
```

**Option 3: Simple Python HTTP Server**
```bash
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

See [START_SERVER.md](START_SERVER.md) for more options and troubleshooting.

## 📝 Editing Content

All website content is stored in human-readable JSON files in the `/content` directory.

### Content Files

- **`content/profile.json`** - Personal info, bio, and social links
- **`content/articles.json`** - Blog posts and articles
- **`content/experience.json`** - Work experience and roles
- **`content/projects.json`** - Project portfolio
- **`content/woodworking.json`** - Gallery images

### How to Edit

1. Open any JSON file in `/content` with a text editor
2. Make your changes
3. Save the file
4. Refresh your browser

**No HTML knowledge required!**

See [content/README.md](content/README.md) for detailed documentation.
See [content/USAGE.md](content/USAGE.md) for complete usage guide.

## 📁 Project Structure

```
/
├── index.html              # Homepage
├── pages/                  # Site pages
│   ├── articles.html
│   ├── expierence.html
│   ├── projects.html
│   └── wood.html
├── content/                # ✏️ Edit these files!
│   ├── profile.json
│   ├── articles.json
│   ├── experience.json
│   ├── projects.json
│   └── woodworking.json
├── scripts/                # JavaScript loaders
│   ├── content-loader.js
│   ├── render-home.js
│   ├── render-articles.js
│   ├── render-experience.js
│   └── render-projects.js
├── styles/                 # CSS
│   └── styles.css
├── pics/                   # Images
├── voronoi-archive/        # Archived experiments
├── server.py               # Local dev server
└── start.sh                # Quick start script
```

## 🛠️ How It Works

1. HTML pages load with structure (no hardcoded content)
2. JavaScript fetches JSON files from `/content`
3. Content is dynamically rendered on the page
4. All edits happen in simple JSON files

## 📦 Deployment

This site works on any static hosting service:

- **GitHub Pages**: Push to `gh-pages` branch
- **Vercel**: Connect repository and deploy
- **Netlify**: Drag and drop or connect Git
- **Any web host**: Upload files via FTP

No build process required - it's pure HTML/CSS/JS!

## 🔧 Technologies

- Pure HTML5, CSS3, JavaScript (ES6+)
- No frameworks or dependencies
- JSON-based content management
- Responsive design
- Font Awesome icons
- Google Fonts (Inter & JetBrains Mono)

## 📄 License

Personal website - All rights reserved.

## 🤝 Contact

- Website: [ryanrana.github.io](https://ryanrana.github.io)
- Email: ryanrana04@gmail.com
- LinkedIn: [linkedin.com/in/ryanrana](https://linkedin.com/in/ryanrana)
- GitHub: [github.com/RyanRana](https://github.com/RyanRana)

---

Built with ❤️ by Ryan Rana
