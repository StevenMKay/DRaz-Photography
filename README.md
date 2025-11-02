# David Raz Photography Website

A professional, rustic-looking photography portfolio website with automatic photo loading from GitHub.

## Features

✅ **Auto-Loading Photos** - Photos automatically load from your GitHub repository
✅ **Search Functionality** - Search bar in header to quickly find photos
✅ **Advanced Filters** - Filter by color, theme, orientation, and proportions
✅ **Responsive Design** - Works perfectly on desktop and mobile
✅ **Professional Design** - Rustic, earthy tones with modern hover effects

## How Auto-Loading Works

### Setup
1. **GitHub Repository**: Store your photos in `https://github.com/StevenMKay/DRaz-Photography/Photos/`
2. **Automatic Detection**: When users visit the site, photos are automatically loaded from GitHub
3. **Smart Naming**: Photo filenames are automatically converted to titles
   - Example: `sunset-mountain-view.jpg` → "Sunset Mountain View"

### Adding New Photos

Simply upload photos to your GitHub repository at:
```
https://github.com/StevenMKay/DRaz-Photography/Photos/
```

The website will automatically:
- Detect new image files (.jpg, .jpeg, .png, .webp)
- Generate titles from filenames
- Detect themes based on filename keywords
- Create searchable tags
- Display them in the photo library

### Photo Naming Best Practices

For best results, name your files descriptively:
- ✅ Good: `mountain-sunset-landscape.jpg`
- ✅ Good: `urban-street-photography.jpg`
- ❌ Avoid: `IMG_1234.jpg`
- ❌ Avoid: `photo1.jpg`

### Automatic Theme Detection

The system automatically detects themes from keywords in filenames:
- **Nature**: tree, forest, plant, flower, garden
- **Landscape**: mountain, valley, hill, vista, scenery
- **Portrait**: person, people, face, model
- **Urban**: city, street, building, downtown
- **Architecture**: building, structure, bridge
- **Wildlife**: animal, bird, creature
- **Travel**: destination, vacation, trip
- **Abstract**: pattern, texture, geometric

## Files Structure

```
DRaz Photos Site/
├── Index.html          # Homepage with recent photos
├── library.html        # Full photo library with filters
├── photos.js           # Auto-loading photo database
└── README.md           # This file
```

## Customization

### Change GitHub Repository
Edit `photos.js` lines 12-14:
```javascript
const owner = 'StevenMKay';
const repo = 'DRaz-Photography';
const photosPath = 'Photos';
```

### Modify Color Scheme
Edit CSS variables in `Index.html` and `library.html`:
- Primary: `#4a3f35` (Dark brown)
- Secondary: `#8b7355` (Medium brown)
- Accent: `#d4c5b9` (Light tan)
- Background: `#f5f1ed` (Cream)

## Search Functionality

- **Header Search**: Quick search from any page
- **Library Search**: Advanced search with filters
- **Real-time Results**: Searches as you type
- **URL Parameters**: Search terms passed between pages

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## License

© 2025 David Raz Photography. All rights reserved.
