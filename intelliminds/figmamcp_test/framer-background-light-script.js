/**
 * Framer Custom Code: Interactive Background Lighting Effect
 * 
 * Instructions for Framer:
 * 1. In Framer, go to your Page or Frame component
 * 2. Add a Custom Code component
 * 3. Paste this entire script into the Custom Code component
 * 4. The effect will automatically apply to the page background
 * 
 * Alternative: Add this to your page's Custom Code section in Framer
 */

(function() {
    'use strict';
    
    // Create background light elements
    function createBackgroundLights() {
        // Remove existing lights if any
        const existingPrimary = document.getElementById('framer-bg-light-primary');
        const existingSecondary = document.getElementById('framer-bg-light-secondary');
        if (existingPrimary) existingPrimary.remove();
        if (existingSecondary) existingSecondary.remove();
        
        // Create primary light layer
        const primaryLight = document.createElement('div');
        primaryLight.id = 'framer-bg-light-primary';
        primaryLight.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 1;
            transition: opacity 0.3s ease;
            will-change: background;
        `;
        
        // Create secondary light layer
        const secondaryLight = document.createElement('div');
        secondaryLight.id = 'framer-bg-light-secondary';
        secondaryLight.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            background: radial-gradient(circle 1200px at 50% 50%, rgba(37, 99, 235, 0.25) 0%, rgba(37, 99, 235, 0.15) 25%, rgba(37, 99, 235, 0.08) 45%, transparent 70%);
            opacity: 1;
            transition: opacity 0.3s ease;
            will-change: background;
            mix-blend-mode: screen;
        `;
        
        document.body.appendChild(primaryLight);
        document.body.appendChild(secondaryLight);
        
        return { primaryLight, secondaryLight };
    }
    
    // Initialize
    const { primaryLight, secondaryLight } = createBackgroundLights();
    
    // Mouse tracking variables
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let currentX2 = mouseX;
    let currentY2 = mouseY;
    
    // Animation function
    function updateBackgroundLight() {
        // Easing for smooth movement
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        
        // Secondary layer with different easing for depth
        currentX2 += (mouseX - currentX2) * 0.05;
        currentY2 += (mouseY - currentY2) * 0.05;
        
        // Update primary background gradient position
        const xPercent = (currentX / window.innerWidth) * 100;
        const yPercent = (currentY / window.innerHeight) * 100;
        
        primaryLight.style.background = `radial-gradient(
            circle 1000px at ${xPercent}% ${yPercent}%,
            rgba(59, 130, 246, 0.45) 0%,
            rgba(59, 130, 246, 0.35) 15%,
            rgba(59, 130, 246, 0.22) 30%,
            rgba(59, 130, 246, 0.12) 45%,
            rgba(59, 130, 246, 0.05) 60%,
            rgba(59, 130, 246, 0.02) 75%,
            transparent 85%
        )`;
        
        // Update secondary background gradient position
        const xPercent2 = (currentX2 / window.innerWidth) * 100;
        const yPercent2 = (currentY2 / window.innerHeight) * 100;
        
        secondaryLight.style.background = `radial-gradient(
            circle 1200px at ${xPercent2}% ${yPercent2}%,
            rgba(37, 99, 235, 0.3) 0%,
            rgba(37, 99, 235, 0.2) 20%,
            rgba(37, 99, 235, 0.12) 40%,
            rgba(37, 99, 235, 0.06) 55%,
            transparent 70%
        )`;
        
        requestAnimationFrame(updateBackgroundLight);
    }
    
    // Mouse event handlers
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
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (mouseX === 0 && mouseY === 0) {
            mouseX = window.innerWidth / 2;
            mouseY = window.innerHeight / 2;
            currentX = mouseX;
            currentY = mouseY;
            currentX2 = mouseX;
            currentY2 = mouseY;
        }
    });
    
    // Start animation loop
    updateBackgroundLight();
    
    // Cleanup function (optional, for Framer's component lifecycle)
    return function cleanup() {
        const primary = document.getElementById('framer-bg-light-primary');
        const secondary = document.getElementById('framer-bg-light-secondary');
        if (primary) primary.remove();
        if (secondary) secondary.remove();
    };
})();

