/**
 * Interactive Background Lighting Effect for Framer
 * 
 * This component creates an interactive blue lighting effect that follows the cursor,
 * similar to the Microsoft AI landing page.
 * 
 * USAGE AS CODE OVERRIDE:
 * 1. In Framer, select your Page or Frame component
 * 2. Go to the Code tab
 * 3. Click "Add Code Override"
 * 4. Paste this file and name it "InteractiveBackgroundLight"
 * 5. The effect will automatically apply
 * 
 * USAGE AS COMPONENT:
 * 1. In Framer, go to Components
 * 2. Create a new Code Component
 * 3. Paste this file
 * 4. Drag the component onto your page
 * 
 * Make sure your content has z-index: 1 or higher to appear above the effect.
 */

import { addEffect } from "framer"
import { useEffect, useRef } from "react"

export function InteractiveBackgroundLight() {
    const primaryRef = useRef<HTMLDivElement>(null)
    const secondaryRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        // Initialize mouse position to center of screen
        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2
        let currentX = mouseX
        let currentY = mouseY
        let currentX2 = mouseX
        let currentY2 = mouseY
        
        // Animation function to update background gradient positions
        const updateBackgroundLight = () => {
            if (!primaryRef.current || !secondaryRef.current) return
            
            // Easing for smooth movement (primary layer - faster)
            currentX += (mouseX - currentX) * 0.08
            currentY += (mouseY - currentY) * 0.08
            
            // Secondary layer with different easing for depth (slower)
            currentX2 += (mouseX - currentX2) * 0.05
            currentY2 += (mouseY - currentY2) * 0.05
            
            // Calculate percentage positions
            const xPercent = (currentX / window.innerWidth) * 100
            const yPercent = (currentY / window.innerHeight) * 100
            const xPercent2 = (currentX2 / window.innerWidth) * 100
            const yPercent2 = (currentY2 / window.innerHeight) * 100
            
            // Update primary background gradient position
            primaryRef.current.style.background = `radial-gradient(
                circle 1000px at ${xPercent}% ${yPercent}%,
                rgba(59, 130, 246, 0.45) 0%,
                rgba(59, 130, 246, 0.35) 15%,
                rgba(59, 130, 246, 0.22) 30%,
                rgba(59, 130, 246, 0.12) 45%,
                rgba(59, 130, 246, 0.05) 60%,
                rgba(59, 130, 246, 0.02) 75%,
                transparent 85%
            )`
            
            // Update secondary background gradient position
            secondaryRef.current.style.background = `radial-gradient(
                circle 1200px at ${xPercent2}% ${yPercent2}%,
                rgba(37, 99, 235, 0.3) 0%,
                rgba(37, 99, 235, 0.2) 20%,
                rgba(37, 99, 235, 0.12) 40%,
                rgba(37, 99, 235, 0.06) 55%,
                transparent 70%
            )`
        }
        
        // Mouse event handlers
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            
            if (primaryRef.current && secondaryRef.current) {
                primaryRef.current.style.opacity = "1"
                secondaryRef.current.style.opacity = "1"
            }
        }
        
        const handleMouseLeave = () => {
            if (primaryRef.current && secondaryRef.current) {
                primaryRef.current.style.opacity = "0.7"
                secondaryRef.current.style.opacity = "0.7"
            }
        }
        
        const handleMouseEnter = () => {
            if (primaryRef.current && secondaryRef.current) {
                primaryRef.current.style.opacity = "1"
                secondaryRef.current.style.opacity = "1"
            }
        }
        
        // Handle window resize
        const handleResize = () => {
            // Reset position if needed
            if (mouseX === 0 && mouseY === 0) {
                mouseX = window.innerWidth / 2
                mouseY = window.innerHeight / 2
                currentX = mouseX
                currentY = mouseY
                currentX2 = mouseX
                currentY2 = mouseY
            }
        }
        
        // Start animation loop using Framer's addEffect
        const unsubscribe = addEffect(() => {
            updateBackgroundLight()
        })
        
        // Add event listeners
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)
        window.addEventListener("resize", handleResize)
        
        // Cleanup function
        return () => {
            unsubscribe()
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseleave", handleMouseLeave)
            document.removeEventListener("mouseenter", handleMouseEnter)
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    
    return (
        <>
            {/* Primary light layer */}
            <div
                ref={primaryRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 0,
                    opacity: 1,
                    transition: "opacity 0.3s ease",
                    willChange: "background",
                }}
            />
            {/* Secondary light layer for depth */}
            <div
                ref={secondaryRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 0,
                    background: "radial-gradient(circle 1200px at 50% 50%, rgba(37, 99, 235, 0.25) 0%, rgba(37, 99, 235, 0.15) 25%, rgba(37, 99, 235, 0.08) 45%, transparent 70%)",
                    opacity: 1,
                    transition: "opacity 0.3s ease",
                    willChange: "background",
                    mixBlendMode: "screen",
                }}
            />
        </>
    )
}

/**
 * Code Override Function for Framer
 * 
 * Use this if you want to apply the effect as a code override to a Frame or Page
 */
export function applyBackgroundLight(props: any, ref: React.Ref<any>) {
    return <InteractiveBackgroundLight />
}


