# Framer TSX Component Instructions

I've created two TypeScript React files that you can use in Framer:

## Files Created:

1. **`InteractiveBackgroundLight.tsx`** - Full-featured component with detailed comments
2. **`BackgroundLightOverride.tsx`** - Simplified version optimized for code overrides

## Quick Start (Recommended):

### Use `BackgroundLightOverride.tsx`:

1. **Open your Framer project**
   - Go to your project: https://framer.com/projects/jp-works-v3--85fgIgtU4E82H6oNK1ou-5Fqfw

2. **Add as Code Override:**
   - Select your **Page** component (or main Frame)
   - In the right panel, click the **"Code"** tab
   - Click **"Add Code Override"**
   - Name it: `BackgroundLight` (or any name you prefer)
   - **Copy the entire contents** of `BackgroundLightOverride.tsx`
   - **Paste** into the code editor
   - Save

3. **Set Z-Index on Your Content:**
   - Select your main content frames/components
   - In the Layout panel, set **Z Index** to `1` or higher
   - This ensures your content appears above the background effect

4. **Test:**
   - Click **Preview** in Framer
   - Move your mouse around - you should see the blue lighting effect!

---

## Alternative: Use as Component:

1. **Create Code Component:**
   - In Framer, go to **Components** → **Create Code Component**
   - Name it `BackgroundLight`

2. **Paste Code:**
   - Copy the entire contents of `BackgroundLightOverride.tsx`
   - Paste into the component editor

3. **Use the Component:**
   - Drag the `BackgroundLight` component onto your page
   - Position it at the top level (not inside other frames)

---

## Key Features:

✅ **TypeScript/React** - Fully typed, works with Framer's React system  
✅ **Framer Integration** - Uses `addEffect` from Framer for optimal performance  
✅ **Dual Layer Effect** - Two gradient layers for depth and texture  
✅ **Smooth Animation** - Uses easing for natural cursor following  
✅ **Performance Optimized** - Uses `requestAnimationFrame` via Framer's `addEffect`  
✅ **Proper Cleanup** - Removes event listeners on unmount  

---

## Customization:

You can customize the effect by modifying these values in the code:

### Colors:
```typescript
// Primary layer color (bright blue)
rgba(59, 130, 246, 0.45)  // Change RGB values and opacity

// Secondary layer color (darker blue)
rgba(37, 99, 235, 0.3)     // Change RGB values and opacity
```

### Size:
```typescript
// Primary layer size
circle 1000px  // Change to 500px for smaller, 1500px for larger

// Secondary layer size
circle 1200px  // Change to 800px for smaller, 1800px for larger
```

### Speed:
```typescript
// Primary layer speed (faster)
currentX += (mouseX - currentX) * 0.08  // Increase for faster (0.15), decrease for slower (0.05)

// Secondary layer speed (slower for depth)
currentX2 += (mouseX - currentX2) * 0.05  // Adjust similarly
```

### Opacity:
```typescript
// When mouse is active
opacity: "1"  // Full intensity

// When mouse leaves
opacity: "0.7"  // Reduce to 0.5 for more subtle, 0.9 for less change
```

---

## Troubleshooting:

**Effect not showing:**
- Make sure you added the code override correctly
- Check that your content has `z-index: 1` or higher
- Verify the code was pasted completely (no missing brackets)

**Effect too intense:**
- Reduce opacity values in the gradient stops
- Change `0.45` to `0.25`, `0.35` to `0.20`, etc.

**Effect too subtle:**
- Increase opacity values
- Change `0.45` to `0.60`, `0.35` to `0.50`, etc.

**Performance issues:**
- Reduce gradient sizes (1000px → 600px, 1200px → 800px)
- Reduce the number of gradient stops

---

## Technical Details:

- Uses React hooks (`useEffect`, `useRef`)
- Integrates with Framer's `addEffect` for animation
- Properly cleans up event listeners
- TypeScript typed for better development experience
- Fixed positioning ensures it covers the entire viewport
- `pointer-events: none` ensures it doesn't interfere with interactions

The component is production-ready and optimized for Framer's environment!


