// photos.js - Photo database auto-generated from GitHub repository
// This file will be automatically updated when you add new photos

const photoDatabase = [
    // Photos will be automatically added here
    // Format: { id, title, theme, color, orientation, proportion, src, tags, date }
];

// Auto-load photos from GitHub repository
async function loadPhotosFromGitHub() {
    const owner = 'StevenMKay';
    const repo = 'DRaz-Photography';
    const photosPath = 'Photos';
    
    try {
        // Fetch list of files from GitHub API
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${photosPath}`);
        const files = await response.json();
        
        // Filter for image files
        const imageFiles = files.filter(file => {
            const ext = file.name.toLowerCase();
            return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
                   ext.endsWith('.png') || ext.endsWith('.webp');
        });
        
        // Convert to photo objects
        const photos = imageFiles.map((file, index) => {
            // Extract title from filename (remove extension and clean up)
            const title = file.name
                .replace(/\.[^/.]+$/, '') // Remove extension
                .replace(/[-_]/g, ' ')    // Replace dashes/underscores with spaces
                .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize words
            
            return {
                id: photoDatabase.length + index + 1,
                title: title,
                theme: detectTheme(title.toLowerCase()),
                color: 'all', // You can enhance this with image analysis
                orientation: 'horizontal', // Default, can be detected
                proportion: '16:9', // Default
                src: file.download_url,
                tags: generateTags(title.toLowerCase()),
                date: new Date().toISOString(),
                filename: file.name
            };
        });
        
        return photos;
    } catch (error) {
        console.error('Error loading photos from GitHub:', error);
        return [];
    }
}

// Detect theme from filename/title
function detectTheme(text) {
    const themes = {
        nature: ['nature', 'tree', 'forest', 'plant', 'flower', 'garden'],
        landscape: ['landscape', 'mountain', 'valley', 'hill', 'vista', 'scenery'],
        portrait: ['portrait', 'person', 'people', 'face', 'model'],
        urban: ['urban', 'city', 'street', 'building', 'downtown'],
        architecture: ['architecture', 'building', 'structure', 'bridge'],
        wildlife: ['wildlife', 'animal', 'bird', 'creature'],
        travel: ['travel', 'destination', 'vacation', 'trip'],
        abstract: ['abstract', 'pattern', 'texture', 'geometric']
    };
    
    for (const [theme, keywords] of Object.entries(themes)) {
        if (keywords.some(keyword => text.includes(keyword))) {
            return theme;
        }
    }
    return 'nature'; // Default theme
}

// Generate tags from title
function generateTags(text) {
    const words = text.split(/\s+/);
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for'];
    const tags = words
        .filter(word => word.length > 3 && !commonWords.includes(word))
        .slice(0, 4); // Take first 4 meaningful words
    return tags;
}

// Initialize and export
async function initializePhotos() {
    const newPhotos = await loadPhotosFromGitHub();
    photoDatabase.push(...newPhotos);
    return photoDatabase;
}

// For use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { photoDatabase, initializePhotos, loadPhotosFromGitHub };
}
