# Content Management System - Usage Guide

Your website now uses a dynamic content management system powered by JSON files. All content is stored in the `/content` directory and loaded dynamically by JavaScript.

## Quick Start

### Editing Content

1. Navigate to the `/content` directory
2. Open any `.json` file in a text editor
3. Make your changes
4. Save the file
5. Refresh your website to see the changes

## How It Works

### Architecture

```
/content/               # All editable content
  ├── profile.json     # Personal info & social links
  ├── articles.json    # Blog articles
  ├── experience.json  # Work experience
  ├── projects.json    # Project portfolio
  └── woodworking.json # Gallery images

/scripts/              # JavaScript loaders
  ├── content-loader.js      # Core loading utility
  ├── render-home.js         # Homepage renderer
  ├── render-articles.js     # Articles page renderer
  ├── render-experience.js   # Experience page renderer
  └── render-projects.js     # Projects page renderer

/pages/                # HTML pages (no hardcoded content)
  ├── articles.html
  ├── expierence.html
  ├── projects.html
  └── wood.html

index.html            # Homepage
```

### Loading Process

1. **Page Loads** → HTML structure is rendered
2. **Script Runs** → `content-loader.js` initializes
3. **Fetch Content** → Appropriate JSON file is fetched
4. **Render** → Content is dynamically inserted into the page
5. **Display** → User sees the content

## Common Tasks

### Adding a New Article

1. Open `/content/articles.json`
2. Add a new object at the top of the array:

```json
{
  "title": "Your Article Title",
  "date": "Feb 2, 2026",
  "url": "https://your-article-url.com",
  "excerpt": "Brief description of your article..."
}
```

3. Make sure to add a comma after the previous first article
4. Save and refresh

### Adding a New Project

1. Open `/content/projects.json`
2. Add a new object to the array:

```json
{
  "title": "My Cool Project",
  "url": "https://github.com/username/project",
  "description": "What this project does and why it's awesome.",
  "skills": ["Python", "React", "AI", "APIs"]
}
```

3. Save and refresh

### Adding Work Experience

1. Open `/content/experience.json`
2. Add to the array (keep in reverse chronological order):

```json
{
  "title": "Software Engineer",
  "company": "Cool Company",
  "date": "Feb 2026 - Present",
  "location": "San Francisco, CA · Remote",
  "description": "What you did in this role."
}
```

3. Save and refresh

### Updating Your Bio

1. Open `/content/profile.json`
2. Edit the `bio` array - each string is a paragraph
3. You can include HTML links using `<a href="...">text</a>`
4. Update social links in the `social` object
5. Save and refresh

**Example with links:**
```json
{
  "bio": [
    "I work at <a href=\"https://company.com/\">My Company</a>.",
    "Check out my <a href=\"https://github.com/username\">projects</a>."
  ]
}
```

## Benefits of This System

✅ **No HTML knowledge required** - Edit simple JSON files
✅ **No code deployment** - Just edit and save
✅ **Version control friendly** - JSON files work great with git
✅ **Centralized content** - Everything in one place
✅ **Type safety** - JSON structure prevents errors
✅ **Fast loading** - Content is cached by the browser

## Advanced Usage

### Adding a New Content Type

If you want to add a new section (e.g., "Books"):

1. Create `/content/books.json` with your data structure
2. Create `/scripts/render-books.js` with rendering logic
3. Create `/pages/books.html` and include the scripts
4. Add navigation link to header

Example `books.json`:

```json
[
  {
    "title": "Book Title",
    "author": "Author Name",
    "review": "Your review here...",
    "rating": 5
  }
]
```

### Validating JSON

If your page isn't loading content:

1. Check browser console for errors (F12 → Console)
2. Validate JSON syntax at [jsonlint.com](https://jsonlint.com)
3. Ensure all quotes are double quotes `"`
4. Check for missing/extra commas
5. Verify file paths are correct

## Troubleshooting

### Content Not Showing

- **Check browser console** - Press F12 and look for errors
- **Verify JSON syntax** - Use a JSON validator
- **Check file paths** - Ensure `/content` and `/scripts` folders exist
- **Clear cache** - Hard refresh with Ctrl+Shift+R (or Cmd+Shift+R)

### Search Not Working

- Search is automatically integrated and works after content loads
- Wait for content to fully load before searching
- Search looks in title, excerpt/description, and dates

### Images Not Loading

- Verify image paths in `woodworking.json`
- Ensure paths are relative to the HTML file location
- Check that image files exist in `/pics` directory

## Best Practices

1. **Always validate JSON** before saving
2. **Keep backups** of your content files
3. **Test locally** before deploying
4. **Use consistent formatting** for dates and text
5. **Escape special characters** in strings
6. **Keep arrays in order** (newest first for articles/experience)

## Git Workflow

```bash
# After editing content
git add content/
git commit -m "Update articles: add new post about X"
git push

# Your website will automatically use the new content
```

## Support

If you encounter issues:

1. Check the browser console for specific error messages
2. Validate your JSON files
3. Ensure all file paths are correct
4. Check that scripts are loading properly

---

**Remember**: The beauty of this system is that you never need to touch HTML files again. Everything is managed through simple JSON files in the `/content` directory!
