/**
 * Framer Code Override: Interactive Background Lighting Effect
 * 
 * Instructions:
 * 1. In Framer, select your Frame or Page component
 * 2. Go to the Code tab
 * 3. Add this as a Code Override
 * 4. The effect will automatically apply to the background
 * 
 * This creates an interactive blue lighting effect that follows the cursor,
 * similar to the Microsoft AI landing page.
 */

import { addEffect } from "framer"
import { useEffect, useRef } from "react"

export function InteractiveBackgroundLight() {
    const primaryRef = useRef<HTMLDivElement>(null)
    const secondaryRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2
        let currentX = mouseX
        let currentY = mouseY
        let currentX2 = mouseX
        let currentY2 = mouseY
        
        const updateBackgroundLight = () => {
            if (!primaryRef.current || !secondaryRef.current) return
            
            // Easing for smooth movement
            currentX += (mouseX - currentX) * 0.08
            currentY += (mouseY - currentY) * 0.08
            
            // Secondary layer with different easing for depth
            currentX2 += (mouseX - currentX2) * 0.05
            currentY2 += (mouseY - currentY2) * 0.05
            
            // Update primary background gradient position
            const xPercent = (currentX / window.innerWidth) * 100
            const yPercent = (currentY / window.innerHeight) * 100
            
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
            const xPercent2 = (currentX2 / window.innerWidth) * 100
            const yPercent2 = (currentY2 / window.innerHeight) * 100
            
            secondaryRef.current.style.background = `radial-gradient(
                circle 1200px at ${xPercent2}% ${yPercent2}%,
                rgba(37, 99, 235, 0.3) 0%,
                rgba(37, 99, 235, 0.2) 20%,
                rgba(37, 99, 235, 0.12) 40%,
                rgba(37, 99, 235, 0.06) 55%,
                transparent 70%
            )`
        }
        
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
        
        // Start animation loop
        const unsubscribe = addEffect(() => {
            updateBackgroundLight()
        })
        
        // Add event listeners
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)
        
        // Handle window resize
        const handleResize = () => {
            if (mouseX === 0 && mouseY === 0) {
                mouseX = window.innerWidth / 2
                mouseY = window.innerHeight / 2
                currentX = mouseX
                currentY = mouseY
                currentX2 = mouseX
                currentY2 = mouseY
            }
        }
        window.addEventListener("resize", handleResize)
        
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


