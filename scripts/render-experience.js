/**
 * Render Experience Page
 * Dynamically loads and displays experience from experience.json
 */

async function renderExperience() {
    const experienceTimeline = document.querySelector('.experience-timeline');
    
    if (!experienceTimeline) {
        console.error('Experience timeline element not found');
        return;
    }

    // Show loading state
    experienceTimeline.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading experience...</div>';

    try {
        const experiences = await window.contentLoader.getExperience();
        
        if (!experiences || experiences.length === 0) {
            experienceTimeline.innerHTML = '<div style="text-align: center; padding: 2rem;">No experience found.</div>';
            return;
        }

        // Clear loading state
        experienceTimeline.innerHTML = '';

        // Render each experience
        experiences.forEach(experience => {
            const experienceElement = createExperienceElement(experience);
            experienceTimeline.appendChild(experienceElement);
        });

    } catch (error) {
        console.error('Error rendering experience:', error);
        experienceTimeline.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--error);">Error loading experience. Please try again.</div>';
    }
}

/**
 * Create experience HTML element
 * @param {Object} experience - Experience data object
 * @returns {HTMLElement} - Experience DOM element
 */
function createExperienceElement(experience) {
    const experienceItem = document.createElement('div');
    experienceItem.className = 'experience-item';

    const locationHtml = experience.location 
        ? `<p class="experience-location">${escapeHtml(experience.location)}</p>` 
        : '';

    experienceItem.innerHTML = `
        <div class="experience-card">
            <h2 class="experience-title">
                ${escapeHtml(experience.title)}
                <span class="experience-company">${escapeHtml(experience.company)}</span>
            </h2>
            <p class="experience-date">${escapeHtml(experience.date)}</p>
            ${locationHtml}
            <p class="experience-description">
                ${escapeHtml(experience.description)}
            </p>
        </div>
    `;

    return experienceItem;
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
    document.addEventListener('DOMContentLoaded', renderExperience);
} else {
    renderExperience();
}
