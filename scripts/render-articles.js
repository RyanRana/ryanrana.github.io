/**
 * Render Articles Page
 * Dynamically loads and displays articles from articles.json
 */

async function renderArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    
    if (!articlesGrid) {
        console.error('Articles grid element not found');
        return;
    }

    // Show loading state
    articlesGrid.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading articles...</div>';

    try {
        const articles = await window.contentLoader.getArticles();
        
        if (!articles || articles.length === 0) {
            articlesGrid.innerHTML = '<div style="text-align: center; padding: 2rem;">No articles found.</div>';
            return;
        }

        // Clear loading state
        articlesGrid.innerHTML = '';

        // Render each article
        articles.forEach(article => {
            const articleElement = createArticleElement(article);
            articlesGrid.appendChild(articleElement);
        });

    } catch (error) {
        console.error('Error rendering articles:', error);
        articlesGrid.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--error);">Error loading articles. Please try again.</div>';
    }
}

/**
 * Create article HTML element
 * @param {Object} article - Article data object
 * @returns {HTMLElement} - Article DOM element
 */
function createArticleElement(article) {
    const articleEl = document.createElement('article');
    articleEl.className = 'post-teaser';

    articleEl.innerHTML = `
        <div class="post-header" onclick="toggleArticle(this)">
            <div>
                <h2 class="post-title">
                    <a href="${escapeHtml(article.url)}" onclick="event.stopPropagation()">
                        ${escapeHtml(article.title)}
                    </a>
                </h2>
                <p class="post-meta">${escapeHtml(article.date)}</p>
            </div>
            <i class="fas fa-chevron-down expand-icon"></i>
        </div>
        <div class="post-content" style="display: none;">
            <div class="post-excerpt">
                <p>${escapeHtml(article.excerpt)}</p>
            </div>
            <div class="continue-reading">
                <a href="${escapeHtml(article.url)}">Continue reading →</a>
            </div>
        </div>
    `;

    return articleEl;
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
    document.addEventListener('DOMContentLoaded', renderArticles);
} else {
    renderArticles();
}
