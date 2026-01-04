# IMAGE OPTIMIZATION GUIDE

## Current Image Sizes (CRITICAL)
- `paris-map-background.jpg`: **364KB** → Target: **~50KB**
- `pierre-mascot.png`: **389KB** → Target: **~30KB**  
- `studynest-logo.png`: **176KB** → Target: **~15KB** (or use SVG)

**Total Current**: 929KB
**Total Target**: ~95KB
**Savings**: 834KB (90% reduction)

---

## Steps to Optimize

### 1. Install Image Optimization Tools

```bash
# Install sharp for image processing
npm install --save-dev sharp

# Or use online tools:
# - squoosh.app (Google's image compressor)
# - tinypng.com
# - cloudconvert.com
```

### 2. Convert to WebP Format

#### Using Sharp (Node.js)
Create a script `scripts/optimize-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  {
    input: 'public/images/paris-map-background.jpg',
    output: 'public/images/paris-map-background.webp',
    quality: 80,
    resize: { width: 1920 } // Resize for web
  },
  {
    input: 'public/images/pierre-mascot.png',
    output: 'public/images/pierre-mascot.webp',
    quality: 85,
    resize: { width: 800 }
  },
  {
    input: 'public/images/studynest-logo.png',
    output: 'public/images/studynest-logo.webp',
    quality: 90,
    resize: { width: 400 }
  }
];

images.forEach(async (img) => {
  await sharp(img.input)
    .resize(img.resize)
    .webp({ quality: img.quality })
    .toFile(img.output);
  console.log(`✓ Optimized ${img.output}`);
});
```

Run: `node scripts/optimize-images.js`

#### Using Squoosh (Manual)
1. Go to https://squoosh.app
2. Upload each image
3. Select WebP format on right panel
4. Adjust quality to 80% (balance between size and quality)
5. Download and replace in `public/images/`

### 3. Update Image References

Replace old references with WebP versions and add fallbacks:

```tsx
// Example: TreasureHuntMap.tsx
<Image
  src="/images/paris-map-background.webp"
  alt="Vintage Paris Map"
  fill
  className="object-cover"
  priority
  sizes="(max-width: 768px) 100vw, 1920px"
/>

// For browsers without WebP support, use picture element:
<picture>
  <source srcSet="/images/paris-map-background.webp" type="image/webp" />
  <source srcSet="/images/paris-map-background.jpg" type="image/jpeg" />
  <img src="/images/paris-map-background.jpg" alt="Vintage Paris Map" />
</picture>
```

### 4. Add Responsive Image Sizes

Generate multiple sizes for different screen sizes:

```bash
# Create different sizes
sharp input.jpg -o output-mobile.webp --resize 640 --webp
sharp input.jpg -o output-tablet.webp --resize 1024 --webp
sharp input.jpg -o output-desktop.webp --resize 1920 --webp
```

Use with srcset:
```tsx
<Image
  src="/images/paris-map-background.webp"
  srcSet="
    /images/paris-map-background-mobile.webp 640w,
    /images/paris-map-background-tablet.webp 1024w,
    /images/paris-map-background-desktop.webp 1920w
  "
  sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
  alt="Paris Map"
/>
```

### 5. Logo → SVG Conversion (Recommended)

If possible, convert the logo to SVG for:
- Infinite scalability
- Tiny file size (~5-10KB)
- Crisp rendering on all devices

Tools:
- Adobe Illustrator (File → Save As → SVG)
- Inkscape (free)
- https://convertio.co/png-svg/

---

## Verification

After optimization, check sizes:
```bash
ls -lh public/images/
```

Expected output:
```
-rw-r--r-- paris-map-background.webp  ~50KB
-rw-r--r-- pierre-mascot.webp         ~30KB
-rw-r--r-- studynest-logo.webp        ~15KB (or .svg ~10KB)
```

## Performance Impact

### Before:
- Total image load: 929KB
- LCP on 3G: ~6-8 seconds
- Mobile data usage: High

### After:
- Total image load: ~95KB
- LCP on 3G: ~2-3 seconds  
- Mobile data usage: 90% reduction
- Lighthouse score: +20-30 points

---

## Next.js Image Component Best Practices

```tsx
// Priority images (above fold)
<Image src="..." priority sizes="..." />

// Lazy loaded images (below fold)
<Image src="..." loading="lazy" sizes="..." />

// Always specify sizes for proper responsive loading
sizes="(max-width: 768px) 100vw, 50vw"
```

## Quick Win Commands

```bash
# If you have sharp installed
npm install --save-dev sharp
node -e "const sharp = require('sharp'); sharp('public/images/paris-map-background.jpg').resize(1920).webp({quality:80}).toFile('public/images/paris-map-background.webp')"
node -e "const sharp = require('sharp'); sharp('public/images/pierre-mascot.png').resize(800).webp({quality:85}).toFile('public/images/pierre-mascot.webp')"
node -e "const sharp = require('sharp'); sharp('public/images/studynest-logo.png').resize(400).webp({quality:90}).toFile('public/images/studynest-logo.webp')"
```

Then update all image references from `.jpg`/`.png` to `.webp`
