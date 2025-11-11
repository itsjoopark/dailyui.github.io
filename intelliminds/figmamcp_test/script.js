// Character counting functionality
const businessOverview = document.getElementById('business-overview');
const targetAudience = document.getElementById('target-audience');
const countBusiness = document.getElementById('count-business');
const countAudience = document.getElementById('count-audience');

const maxLength = 500;

function updateCharacterCount(textarea, countElement) {
    const currentLength = textarea.value.length;
    const remaining = maxLength - currentLength;
    countElement.textContent = `${currentLength}/${maxLength}`;
    
    // Optionally change color when approaching limit
    if (remaining < 50) {
        countElement.style.color = '#ef4444'; // red
    } else {
        countElement.style.color = '#4b5563'; // gray
    }
}

// Initialize character counts on page load
updateCharacterCount(businessOverview, countBusiness);
updateCharacterCount(targetAudience, countAudience);

// Update character counts as user types
businessOverview.addEventListener('input', () => {
    updateCharacterCount(businessOverview, countBusiness);
});

targetAudience.addEventListener('input', () => {
    updateCharacterCount(targetAudience, countAudience);
});

// Cursor glow effect
const cardContainer = document.querySelector('.card-container');
let cursorGlow = null;

// Create cursor glow element
function createCursorGlow() {
    cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 70%);
        box-shadow: 0 0 5px 5px rgba(59, 130, 246, 0.5);
        pointer-events: none;
        opacity: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.2s ease;
        z-index: 10000;
    `;
    document.body.appendChild(cursorGlow);
}

// Initialize cursor glow
createCursorGlow();

// Track mouse movement over card container
cardContainer.addEventListener('mouseenter', () => {
    if (cursorGlow) {
        cursorGlow.style.opacity = '1';
    }
});

cardContainer.addEventListener('mouseleave', () => {
    if (cursorGlow) {
        cursorGlow.style.opacity = '0';
    }
});

cardContainer.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
        const rect = cardContainer.getBoundingClientRect();
        const x = e.clientX;
        const y = e.clientY;
        cursorGlow.style.left = x + 'px';
        cursorGlow.style.top = y + 'px';
    }
});

// Background lighting effect that follows cursor
const backgroundLight = document.querySelector('.background-light');
const backgroundLightSecondary = document.querySelector('.background-light-secondary');
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let currentX2 = 0;
let currentY2 = 0;

// Smooth cursor tracking with easing
function updateBackgroundLight() {
    // Easing for smooth movement (lower value = smoother, slower)
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    
    // Secondary layer with different easing for depth
    currentX2 += (mouseX - currentX2) * 0.05;
    currentY2 += (mouseY - currentY2) * 0.05;
    
    // Update primary background gradient position
    const xPercent = (currentX / window.innerWidth) * 100;
    const yPercent = (currentY / window.innerHeight) * 100;
    
    backgroundLight.style.background = `radial-gradient(
        circle 1000px at ${xPercent}% ${yPercent}%,
        rgba(59, 130, 246, 0.45) 0%,
        rgba(59, 130, 246, 0.35) 15%,
        rgba(59, 130, 246, 0.22) 30%,
        rgba(59, 130, 246, 0.12) 45%,
        rgba(59, 130, 246, 0.05) 60%,
        rgba(59, 130, 246, 0.02) 75%,
        transparent 85%
    )`;
    
    // Update secondary background gradient position (slightly offset for depth)
    const xPercent2 = (currentX2 / window.innerWidth) * 100;
    const yPercent2 = (currentY2 / window.innerHeight) * 100;
    
    backgroundLightSecondary.style.background = `radial-gradient(
        circle 1200px at ${xPercent2}% ${yPercent2}%,
        rgba(37, 99, 235, 0.3) 0%,
        rgba(37, 99, 235, 0.2) 20%,
        rgba(37, 99, 235, 0.12) 40%,
        rgba(37, 99, 235, 0.06) 55%,
        transparent 70%
    )`;
    
    requestAnimationFrame(updateBackgroundLight);
}

// Initialize mouse position to center of screen
mouseX = window.innerWidth / 2;
mouseY = window.innerHeight / 2;
currentX = mouseX;
currentY = mouseY;
currentX2 = mouseX;
currentY2 = mouseY;

// Track mouse movement across the entire page
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Keep the background light effects always visible
    backgroundLight.style.opacity = '1';
    backgroundLightSecondary.style.opacity = '1';
});

// Slightly reduce opacity when mouse leaves the page (but keep it visible)
document.addEventListener('mouseleave', () => {
    backgroundLight.style.opacity = '0.7';
    backgroundLightSecondary.style.opacity = '0.7';
});

// Restore full opacity when mouse returns
document.addEventListener('mouseenter', () => {
    backgroundLight.style.opacity = '1';
    backgroundLightSecondary.style.opacity = '1';
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reset position on resize to prevent issues
    if (mouseX === 0 && mouseY === 0) {
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
        currentX = mouseX;
        currentY = mouseY;
    }
});

// Initialize the animation loop
updateBackgroundLight();

