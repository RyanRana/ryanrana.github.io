# How to Run Your Website Locally

Your website uses JavaScript to load content from JSON files. Browsers block this when opening HTML files directly (`file://` protocol) for security reasons. You need to run a local web server.

## Quick Start (Easiest)

### Option 1: Python (Recommended)

**Python 3:**
```bash
python3 server.py
```

Then open: **http://localhost:8000**

### Option 2: Python Simple HTTP Server

If you don't want to use the custom server:

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

Then open: **http://localhost:8000**

### Option 3: Node.js

If you have Node.js installed:

```bash
npx http-server -p 8000
```

Then open: **http://localhost:8000**

### Option 4: PHP

If you have PHP installed:

```bash
php -S localhost:8000
```

Then open: **http://localhost:8000**

### Option 5: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

## Troubleshooting

### Port Already in Use

If port 8000 is already in use, try a different port:

```bash
python3 -m http.server 8001
```

Then open: **http://localhost:8001**

### Python Not Found

- **macOS/Linux**: Python 3 is usually pre-installed
- **Windows**: Download from [python.org](https://www.python.org/downloads/)

### Command Not Found

Make sure you're in the correct directory:

```bash
cd /Users/ryanrana/Downloads/Untitled/ryanrana.github.io
```

## Why Do I Need This?

Modern browsers implement security policies that prevent JavaScript from:
- Reading local files directly
- Making fetch requests to `file://` URLs
- Loading JSON from the file system

Running a local web server (`http://`) bypasses these restrictions safely.

## For Production

When you deploy to GitHub Pages, Vercel, Netlify, or any web host, this isn't needed. The web server handles everything automatically.

---

**Quick Command Reference:**

```bash
# Start server
python3 server.py

# Or use built-in Python server
python3 -m http.server 8000

# Open browser
open http://localhost:8000

# Stop server
Ctrl+C
```
