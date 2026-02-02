/**
 * Content Loader Utility
 * Fetches and loads content from JSON files
 */

class ContentLoader {
    constructor(basePath = '../content/') {
        this.basePath = basePath;
        this.cache = {};
    }

    /**
     * Fetch JSON content from file
     * @param {string} filename - Name of the JSON file
     * @returns {Promise<any>} - Parsed JSON data
     */
    async fetch(filename) {
        // Check cache first
        if (this.cache[filename]) {
            return this.cache[filename];
        }

        try {
            const response = await fetch(this.basePath + filename);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
            }
            const data = await response.json();
            this.cache[filename] = data;
            return data;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return null;
        }
    }

    /**
     * Load profile data
     */
    async getProfile() {
        return await this.fetch('profile.json');
    }

    /**
     * Load articles data
     */
    async getArticles() {
        return await this.fetch('articles.json');
    }

    /**
     * Load experience data
     */
    async getExperience() {
        return await this.fetch('experience.json');
    }

    /**
     * Load projects data
     */
    async getProjects() {
        return await this.fetch('projects.json');
    }

    /**
     * Load woodworking data
     */
    async getWoodworking() {
        return await this.fetch('woodworking.json');
    }
}

// Create global instance
window.contentLoader = new ContentLoader();
