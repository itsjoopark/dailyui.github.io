# Framer Setup Guide: Interactive Background Lighting Effect

## Step-by-Step Instructions for Your Framer Project

### Method 1: Using Custom Code Component (Recommended)

1. **Open your Framer project**
   - Go to: https://framer.com/projects/jp-works-v3--85fgIgtU4E82H6oNK1ou-5Fqfw
   - Make sure you're in the editor view

2. **Add Custom Code Component**
   - In the left sidebar, click the **Components** icon (or press `I`)
   - Search for **"Custom Code"** in the component library
   - Drag and drop it onto your landing page (or the main Page component)

3. **Configure the Custom Code**
   - Select the Custom Code component you just added
   - In the right panel, you'll see a code editor
   - Open the file `framer-simple-copy-paste.js` from this folder
   - **Copy the entire contents** (lines 15-80, everything inside the `(function() { ... })();`)
   - Paste it into the Framer Custom Code editor

4. **Position the Component**
   - The Custom Code component should be placed at the **top level** of your page
   - It doesn't need to be visible in the canvas (it runs in the background)
   - Make sure it's not inside any container that might clip it

5. **Set Z-Index for Your Content**
   - Select your main content frames/components
   - In the right panel, go to **Layout** section
   - Set **Z Index** to `1` or higher (so content appears above the background effect)

6. **Test It**
   - Click **Preview** in Framer
   - Move your mouse around the page
   - You should see the blue lighting effect following your cursor!

---

### Method 2: Using Page Settings (Alternative)

1. **Go to Page Settings**
   - Select your Page component in the canvas
   - In the right panel, scroll down to find **Custom Code** section

2. **Add to Head or Body**
   - Click on **Head** or **Body** tab
   - Paste the code from `framer-simple-copy-paste.js` (lines 15-80)
   - Save

---

## Important Notes for Framer

### Z-Index Management
- The background effect uses `z-index: 0`
- Make sure all your content (frames, text, images, etc.) has `z-index: 1` or higher
- This ensures the lighting effect stays behind your content

### Performance
- The effect is optimized with `requestAnimationFrame`
- It should work smoothly on all devices
- If you notice performance issues, you can reduce the gradient sizes (change `1000px` and `1200px` to smaller values)

### Customization
If you want to adjust the effect:

**Change Color:**
- Find `rgba(59,130,246,0.45)` and change the RGB values
- Example: `rgba(255,0,0,0.45)` for red

**Change Intensity:**
- Change the opacity values (the last number in rgba)
- Higher = more intense (max 1.0)
- Lower = more subtle

**Change Size:**
- Change `circle 1000px` to `circle 500px` for smaller effect
- Change `circle 1200px` to `circle 1500px` for larger effect

**Change Speed:**
- Change `0.08` to a higher number (like `0.15`) for faster tracking
- Change to a lower number (like `0.05`) for slower, smoother tracking

---

## Troubleshooting

**Effect not showing:**
- Check that your content has z-index higher than 0
- Make sure the Custom Code component is on the page (not hidden)
- Check browser console for errors (F12 → Console tab)

**Effect too intense:**
- Reduce opacity values in the gradient (change `0.45` to `0.25`, etc.)
- Reduce the circle sizes

**Effect not following cursor:**
- Make sure the code was pasted completely
- Check that there are no syntax errors in the Framer code editor
- Try refreshing the preview

**Performance issues:**
- Reduce gradient sizes (1000px → 600px, 1200px → 800px)
- Reduce the number of gradient stops

---

## Quick Copy-Paste Code

Here's the exact code to paste into Framer's Custom Code component:

```javascript
(function() {
    const primaryLight = document.createElement('div');
    primaryLight.id = 'bg-light-primary';
    primaryLight.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:1;transition:opacity 0.3s ease;will-change:background;';
    
    const secondaryLight = document.createElement('div');
    secondaryLight.id = 'bg-light-secondary';
    secondaryLight.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:1;transition:opacity 0.3s ease;will-change:background;mix-blend-mode:screen;';
    
    document.body.appendChild(primaryLight);
    document.body.appendChild(secondaryLight);
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX, currentY = mouseY;
    let currentX2 = mouseX, currentY2 = mouseY;
    
    function update() {
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        currentX2 += (mouseX - currentX2) * 0.05;
        currentY2 += (mouseY - currentY2) * 0.05;
        
        const x = (currentX / window.innerWidth) * 100;
        const y = (currentY / window.innerHeight) * 100;
        const x2 = (currentX2 / window.innerWidth) * 100;
        const y2 = (currentY2 / window.innerHeight) * 100;
        
        primaryLight.style.background = `radial-gradient(circle 1000px at ${x}% ${y}%,rgba(59,130,246,0.45) 0%,rgba(59,130,246,0.35) 15%,rgba(59,130,246,0.22) 30%,rgba(59,130,246,0.12) 45%,rgba(59,130,246,0.05) 60%,rgba(59,130,246,0.02) 75%,transparent 85%)`;
        secondaryLight.style.background = `radial-gradient(circle 1200px at ${x2}% ${y2}%,rgba(37,99,235,0.3) 0%,rgba(37,99,235,0.2) 20%,rgba(37,99,235,0.12) 40%,rgba(37,99,235,0.06) 55%,transparent 70%)`;
        
        requestAnimationFrame(update);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        primaryLight.style.opacity = '1';
        secondaryLight.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        primaryLight.style.opacity = '0.7';
        secondaryLight.style.opacity = '0.7';
    });
    
    document.addEventListener('mouseenter', () => {
        primaryLight.style.opacity = '1';
        secondaryLight.style.opacity = '1';
    });
    
    window.addEventListener('resize', () => {
        if (mouseX === 0 && mouseY === 0) {
            mouseX = window.innerWidth / 2;
            mouseY = window.innerHeight / 2;
            currentX = currentX2 = mouseX;
            currentY = currentY2 = mouseY;
        }
    });
    
    update();
})();
```

---

## Need Help?

If you run into any issues:
1. Check the browser console for errors
2. Make sure the code is pasted completely (no missing brackets)
3. Verify z-index settings on your content
4. Try the alternative method (Page Settings → Custom Code)

The effect should work immediately after pasting the code!


