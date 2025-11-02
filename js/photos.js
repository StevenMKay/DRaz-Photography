// photos.js - Photo database auto-generated from GitHub repository
// This file will be automatically updated when you add new photos

const photoDatabase = [];

// Auto-load photos from GitHub repository
async function loadPhotosFromGitHub() {
    const owner = 'StevenMKay';
    const repo = 'DRaz-Photography';
    const photosPath = 'Photos';
    
    console.log('Loading photos from GitHub...');
    
    try {
        // Fetch list of files from GitHub API
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${photosPath}`;
        console.log('Fetching from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            console.error('GitHub API error:', response.status, response.statusText);
            throw new Error(`GitHub API returned ${response.status}`);
        }
        
        const files = await response.json();
        console.log('Found files:', files.length);
        
        // Filter for image files
        const imageFiles = files.filter(file => {
            const ext = file.name.toLowerCase();
            const isImage = ext.endsWith('.jpg') || ext.endsWith('.jpeg') || 
                           ext.endsWith('.png') || ext.endsWith('.webp') ||
                           ext.endsWith('.gif');
            return file.type === 'file' && isImage;
        });
        
        console.log('Image files found:', imageFiles.length);
        
        // Convert to photo objects
        const photos = imageFiles.map((file, index) => {
            // Extract title from filename (remove extension and clean up)
            const title = file.name
                .replace(/\.[^/.]+$/, '') // Remove extension
                .replace(/[-_]/g, ' ')    // Replace dashes/underscores with spaces
                .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize words
            
            // Generate GitHub raw URL for image
            const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${photosPath}/${encodeURIComponent(file.name)}`;
            
            const photo = {
                id: photoDatabase.length + index + 1,
                title: title,
                theme: detectTheme(title.toLowerCase()),
                color: detectColor(title.toLowerCase()),
                orientation: 'horizontal', // Default, can be detected
                proportion: '16:9', // Default
                src: rawUrl,
                tags: generateTags(title.toLowerCase()),
                date: new Date().toISOString(),
                filename: file.name
            };
            
            console.log('Loaded photo:', photo.title);
            return photo;
        });
        
        console.log('Successfully loaded', photos.length, 'photos from GitHub');
        return photos;
        
    } catch (error) {
        console.error('Error loading photos from GitHub:', error);
        console.log('Using fallback sample data');
        return null; // Return null to trigger fallback
    }
}

// Detect color from filename/title
function detectColor(text) {
    const colors = {
        blue: ['blue', 'ocean', 'sea', 'sky', 'water'],
        green: ['green', 'forest', 'tree', 'grass', 'nature'],
        red: ['red', 'sunset', 'fire'],
        yellow: ['yellow', 'sun', 'gold'],
        orange: ['orange', 'autumn', 'fall'],
        pink: ['pink', 'flower', 'blossom'],
        warm: ['warm', 'sunset', 'sunrise', 'golden'],
        cool: ['cool', 'winter', 'ice', 'snow'],
        neutral: ['neutral', 'gray', 'beige']
    };
    
    for (const [color, keywords] of Object.entries(colors)) {
        if (keywords.some(keyword => text.includes(keyword))) {
            return color;
        }
    }
    return 'all';
}

// Detect theme from filename/title
function detectTheme(text) {
    const themes = {
        nature: ['nature', 'tree', 'forest', 'plant', 'flower', 'garden', 'leaf', 'botanical'],
        landscape: ['landscape', 'mountain', 'valley', 'hill', 'vista', 'scenery', 'horizon'],
        portrait: ['portrait', 'person', 'people', 'face', 'model', 'headshot'],
        urban: ['urban', 'city', 'street', 'building', 'downtown', 'metro'],
        architecture: ['architecture', 'building', 'structure', 'bridge', 'tower'],
        wildlife: ['wildlife', 'animal', 'bird', 'creature', 'beast'],
        travel: ['travel', 'destination', 'vacation', 'trip', 'journey'],
        abstract: ['abstract', 'pattern', 'texture', 'geometric', 'minimal']
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
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with'];
    const tags = words
        .filter(word => word.length > 2 && !commonWords.includes(word))
        .slice(0, 5); // Take first 5 meaningful words
    return tags;
}

// Initialize and export
async function initializePhotos() {
    const newPhotos = await loadPhotosFromGitHub();
    if (newPhotos && newPhotos.length > 0) {
        photoDatabase.push(...newPhotos);
        return photoDatabase;
    }
    return null; // Signal to use fallback
}

// For use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { photoDatabase, initializePhotos, loadPhotosFromGitHub };
}
