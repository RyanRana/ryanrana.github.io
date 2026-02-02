# Content Directory

This directory contains all the human-readable and editable content for the website in JSON format.

## Files

### `profile.json`
Contains personal information, bio, social links, and important URLs.

**Fields:**
- `name`: Your full name
- `title`: Your professional title
- `bio`: Array of paragraphs for the homepage bio (HTML allowed for links)
- `social`: Object with social media links (email, phone, linkedin, github, etc.)
- `links`: Object with important external links referenced in the bio

**Usage:**
Edit this file to update your personal information and social links across the site.

**Note:** The `bio` field supports HTML tags for links. Use `<a href="...">text</a>` to add links in your bio paragraphs.

---

### `articles.json`
Contains all blog articles/posts with their metadata.

**Structure:** Array of article objects
**Fields per article:**
- `title`: Article title
- `date`: Publication date (format: "Mon DD, YYYY")
- `url`: Full URL to the article
- `excerpt`: Brief description/preview of the article

**Usage:**
- Add new articles by appending to the array
- Update existing articles by editing their respective objects
- Remove articles by deleting their objects from the array

---

### `experience.json`
Contains all professional experience entries.

**Structure:** Array of experience objects
**Fields per experience:**
- `title`: Job title/role
- `company`: Company/organization name
- `date`: Date range (e.g., "Nov 2025 - Present")
- `location`: Physical or remote location (optional)
- `description`: Brief description of role and responsibilities

**Usage:**
- Keep entries in reverse chronological order (newest first)
- Add new experiences at the beginning of the array
- Update current positions with "Present" as the end date

---

### `projects.json`
Contains all project entries with descriptions and technology tags.

**Structure:** Array of project objects
**Fields per project:**
- `title`: Project name
- `url`: Link to project (GitHub, live site, etc.)
- `description`: Detailed description of the project
- `skills`: Array of technology/skill tags

**Usage:**
- Add new projects by appending to the array
- Update project descriptions and skills as needed
- Skills are displayed as colored tags on the site

---

### `woodworking.json`
Contains metadata for woodworking/craft images.

**Structure:** Object with title, description, and images array
**Fields:**
- `title`: Gallery title
- `description`: Gallery description
- `images`: Array of image objects with:
  - `src`: Path to image file (relative to HTML file)
  - `alt`: Alt text for accessibility
  - `description`: Optional description (currently empty)

**Usage:**
- Add new images by appending to the images array
- Update image paths if files are moved
- Add descriptions to provide context for each piece

---

## How to Use

1. **Edit any JSON file** in a text editor
2. **Maintain the JSON structure** (proper commas, brackets, quotes)
3. **Save the file**
4. **The website will automatically use the updated content** when you reload

## JSON Formatting Tips

- Use double quotes `"` for all strings
- Separate items in arrays with commas `,`
- No comma after the last item in an array or object
- Validate JSON syntax using online tools if needed (jsonlint.com)

## Example: Adding a New Article

```json
{
  "title": "My New Article Title",
  "date": "Feb 2, 2026",
  "url": "https://example.com/my-article",
  "excerpt": "This is a brief description of what the article is about..."
}
```

Add this object to the `articles.json` array, separating it from other entries with a comma.

## Example: Adding a New Project

```json
{
  "title": "My Cool Project",
  "url": "https://github.com/username/project",
  "description": "A detailed description of what this project does and why it's cool.",
  "skills": ["Python", "React", "Machine Learning", "APIs"]
}
```

Add this object to the `projects.json` array.

---

**Note:** After editing content files, make sure to test the website locally to ensure everything displays correctly.
