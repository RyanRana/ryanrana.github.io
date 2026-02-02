/**
 * Render Projects Page
 * Dynamically loads and displays projects from projects.json
 */

async function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }

    // Show loading state
    projectsGrid.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading projects...</div>';

    try {
        const projects = await window.contentLoader.getProjects();
        
        if (!projects || projects.length === 0) {
            projectsGrid.innerHTML = '<div style="text-align: center; padding: 2rem;">No projects found.</div>';
            return;
        }

        // Clear loading state
        projectsGrid.innerHTML = '';

        // Render each project
        projects.forEach(project => {
            const projectElement = createProjectElement(project);
            projectsGrid.appendChild(projectElement);
        });

        // Apply random colors to skill tags (from existing script)
        randomizeSkillTagColors();

    } catch (error) {
        console.error('Error rendering projects:', error);
        projectsGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--error);">Error loading projects. Please try again.</div>';
    }
}

/**
 * Create project HTML element
 * @param {Object} project - Project data object
 * @returns {HTMLElement} - Project DOM element
 */
function createProjectElement(project) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';

    const skillsHtml = project.skills
        .map(skill => `<span class="skill-tag">${escapeHtml(skill)}</span>`)
        .join('\n                            ');

    projectCard.innerHTML = `
        <h2 class="project-title">
            <a href="${escapeHtml(project.url)}">${escapeHtml(project.title)}</a>
        </h2>
        <p class="project-description">
            ${escapeHtml(project.description)}
        </p>
        <div class="skills-container">
            ${skillsHtml}
        </div>
    `;

    return projectCard;
}

/**
 * Randomize skill tag colors (from existing projects.html script)
 */
function randomizeSkillTagColors() {
    const colors = [
        '#2563eb', '#8b5cf6', '#06b6d4', '#e94560', '#f59e0b',
        '#10b981', '#ec4899', '#f97316', '#14b8a6', '#6366f1',
        '#a855f7', '#22c55e', '#ef4444', '#3b82f6', '#eab308'
    ];
    
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        tag.style.background = randomColor;
    });
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderProjects);
} else {
    renderProjects();
}
