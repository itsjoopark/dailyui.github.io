# Interactive Background Lighting Effect for Framer

This effect creates an interactive blue lighting effect that follows the cursor, similar to the Microsoft AI landing page.

## Method 1: Custom Code Component (Recommended)

1. In Framer, add a **Custom Code** component to your Page or Frame
2. Open the Custom Code component settings
3. Paste the entire contents of `framer-background-light-script.js`
4. The effect will automatically apply to the page background

## Method 2: Code Override (React/TypeScript)

1. In Framer, select your Page or Frame component
2. Go to the **Code** tab
3. Click **Add Code Override**
4. Paste the contents of `framer-background-light-override.tsx`
5. Name it `InteractiveBackgroundLight`
6. The component will render the effect automatically

## Method 3: Global Script (Alternative)

If you want to add this globally to your Framer site:

1. Go to your Framer project settings
2. Navigate to **Custom Code** section
3. Add the script from `framer-background-light-script.js` to the **Head** or **Body** section
4. Save and publish

## Customization Options

You can customize the effect by modifying these values in the code:

### Color Intensity
- Change `rgba(59, 130, 246, 0.45)` values to adjust blue intensity
- Change `rgba(37, 99, 235, 0.3)` for secondary layer color

### Size
- Change `circle 1000px` to adjust primary layer size
- Change `circle 1200px` to adjust secondary layer size

### Speed
- Change `0.08` to adjust primary layer follow speed (lower = slower)
- Change `0.05` to adjust secondary layer follow speed

### Opacity
- Change initial `opacity: 1` to make it more/less visible
- Change `opacity: 0.7` when mouse leaves

## Notes

- The effect uses `position: fixed` and `z-index: 0` to stay behind content
- Make sure your main content has `z-index: 1` or higher
- The effect is performance-optimized using `requestAnimationFrame`
- Works on all modern browsers

## Troubleshooting

**Effect not showing:**
- Check that z-index of your content is higher than 0
- Verify the script is properly loaded in Framer
- Check browser console for errors

**Effect too intense:**
- Reduce opacity values in the gradient
- Reduce the circle size values

**Effect too slow:**
- Increase the easing values (0.08, 0.05) to make it faster
- Decrease for smoother, slower movement


