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
            const bioHtml = profile.bio.map(paragraph => `
                <p class="description">${parseBioText(paragraph)}</p>
                <br>
            `).join('');

            // Generate references section if available
            let referencesHtml = '';
            if (profile.references && profile.references.length > 0) {
                referencesHtml = `
                    <div class="references" style="display: flex; flex-direction: column; gap: 0.2rem; margin-top: 0.2rem; margin-bottom: 1.5rem;">
                        ${profile.references.map(ref => `
                            <div class="reference-item" id="ref-${ref.number}" style="display: none;">
                                <p style="margin: 0; color: rgba(80, 80, 80, 0.95); line-height: 1.7; font-size: 1.1rem;">
                                    <strong style="color: #3b82f6; font-size: 1.1rem;">${ref.number}.</strong> ${parseBioText(ref.description)}
                                </p>
                                <br>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            // Find the social icons section
            const socialIcons = revealableContent.querySelector('.social-icons');
            
            // Replace content: bio + references + social icons
            revealableContent.innerHTML = bioHtml + referencesHtml + (socialIcons ? socialIcons.outerHTML : '');
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

/**
 * Parse bio/ref text: [text](url) → link, [n] → clickable ref link (bracket style)
 */
function parseBioText(text) {
    // 1. Links: [text](url)
    let result = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    
    // 2. Refs: [n] → clickable ref link, same look as terminal text
    result = result.replace(/\[(\d+)\]/g, (_, n) =>
        `<a href="#" class="ref-link" onclick="toggleRef(${n}); return false;" data-ref="${n}">[${n}]</a>`
    );
    
    return result;
}

/**
 * Toggle reference visibility - only show one at a time
 */
function toggleRef(refNumber) {
    // Hide all references first
    const allRefs = document.querySelectorAll('.reference-item');
    allRefs.forEach(ref => {
        ref.style.display = 'none';
    });
    
    // Show the clicked reference
    const refElement = document.getElementById(`ref-${refNumber}`);
    if (refElement) {
        refElement.style.display = 'block';
        // Smooth scroll to reference
        refElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Make toggleRef globally available
window.toggleRef = toggleRef;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHomeContent);
} else {
    renderHomeContent();
}
