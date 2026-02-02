/**
 * Render Home Page
 * Dynamically loads and displays profile content from profile.json
 */

async function renderHomeContent() {
    try {
        const profile = await window.contentLoader.getProfile();
        
        if (!profile) {
            console.error('Failed to load profile data');
            return;
        }

        // Update bio paragraphs
        const revealableContent = document.getElementById('revealableContent');
        if (revealableContent && profile.bio) {
            // Note: We're allowing HTML in bio for links - content is trusted
            const bioHtml = profile.bio.map(paragraph => `
                <p class="description">${paragraph}</p>
                <br>
            `).join('');

            // Find the social icons section
            const socialIcons = revealableContent.querySelector('.social-icons');
            
            // Replace content before social icons
            revealableContent.innerHTML = bioHtml + (socialIcons ? socialIcons.outerHTML : '');
        }

        // Update social links (they're already in HTML, but we could update them dynamically if needed)
        updateSocialLinks(profile.social);

    } catch (error) {
        console.error('Error rendering home content:', error);
    }
}

/**
 * Update social media links
 * @param {Object} social - Social media links object
 */
function updateSocialLinks(social) {
    if (!social) return;

    const linkMap = {
        'emailIcon': social.email ? `mailto:${social.email}` : null,
        'phoneLink': social.phone ? `tel:${social.phone}` : null,
        'linkedinLink': social.linkedin,
        'githubLink': social.github,
        'mediumLink': social.medium,
        'twitterLink': social.twitter,
        'hackerNewsLink': social.hackernews,
        'instagramLink': social.instagram
    };

    // Update href attributes if elements exist
    Object.entries(linkMap).forEach(([id, href]) => {
        if (href) {
            const element = document.getElementById(id) || 
                          document.querySelector(`[href*="${href.split('/').pop()}"]`);
            if (element && element.tagName === 'A') {
                element.href = href;
            }
        }
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
    document.addEventListener('DOMContentLoaded', renderHomeContent);
} else {
    renderHomeContent();
}
