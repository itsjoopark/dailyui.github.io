/**
 * ============================================
 * FRAMER COPY-PASTE READY: Interactive Background Light
 * ============================================
 * 
 * COPY THIS ENTIRE FILE INTO FRAMER'S CUSTOM CODE COMPONENT
 * 
 * Instructions:
 * 1. In Framer, add a "Custom Code" component to your Page
 * 2. Open the Custom Code component
 * 3. Paste this entire file
 * 4. Done! The effect will work automatically
 */

(function() {
    // Create background light elements
    const primaryLight = document.createElement('div');
    primaryLight.id = 'bg-light-primary';
    primaryLight.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:1;transition:opacity 0.3s ease;will-change:background;';
    
    const secondaryLight = document.createElement('div');
    secondaryLight.id = 'bg-light-secondary';
    secondaryLight.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:1;transition:opacity 0.3s ease;will-change:background;mix-blend-mode:screen;';
    
    document.body.appendChild(primaryLight);
    document.body.appendChild(secondaryLight);
    
    // Mouse tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX, currentY = mouseY;
    let currentX2 = mouseX, currentY2 = mouseY;
    
    // Animation loop
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
    
    // Event listeners
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


