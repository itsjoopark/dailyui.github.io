/**
 * Framer Code Override: Interactive Background Lighting Effect
 * 
 * HOW TO USE IN FRAMER:
 * 
 * Option 1 - As Code Override:
 * 1. Select your Page or Frame component in Framer
 * 2. Click the "Code" tab in the right panel
 * 3. Click "Add Code Override"
 * 4. Name it "BackgroundLight" (or any name)
 * 5. Paste this entire file
 * 6. The effect will automatically work!
 * 
 * Option 2 - As Component:
 * 1. In Framer, go to Components → Create Code Component
 * 2. Paste this file
 * 3. Drag the component onto your page
 * 
 * IMPORTANT: Make sure your content has z-index: 1 or higher
 * so it appears above the background effect (z-index: 0)
 */

import { addEffect } from "framer"
import { useEffect, useRef } from "react"

export default function BackgroundLight() {
    const primaryRef = useRef<HTMLDivElement>(null)
    const secondaryRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        // Initialize mouse position to center
        let mouseX = window.innerWidth / 2
        let mouseY = window.innerHeight / 2
        let currentX = mouseX
        let currentY = mouseY
        let currentX2 = mouseX
        let currentY2 = mouseY
        
        // Update function
        const update = () => {
            if (!primaryRef.current || !secondaryRef.current) return
            
            // Smooth easing
            currentX += (mouseX - currentX) * 0.08
            currentY += (mouseY - currentY) * 0.08
            currentX2 += (mouseX - currentX2) * 0.05
            currentY2 += (mouseY - currentY2) * 0.05
            
            // Calculate positions
            const x = (currentX / window.innerWidth) * 100
            const y = (currentY / window.innerHeight) * 100
            const x2 = (currentX2 / window.innerWidth) * 100
            const y2 = (currentY2 / window.innerHeight) * 100
            
            // Update gradients
            primaryRef.current.style.background = `radial-gradient(circle 1000px at ${x}% ${y}%,rgba(59,130,246,0.45) 0%,rgba(59,130,246,0.35) 15%,rgba(59,130,246,0.22) 30%,rgba(59,130,246,0.12) 45%,rgba(59,130,246,0.05) 60%,rgba(59,130,246,0.02) 75%,transparent 85%)`
            secondaryRef.current.style.background = `radial-gradient(circle 1200px at ${x2}% ${y2}%,rgba(37,99,235,0.3) 0%,rgba(37,99,235,0.2) 20%,rgba(37,99,235,0.12) 40%,rgba(37,99,235,0.06) 55%,transparent 70%)`
        }
        
        // Mouse handlers
        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            if (primaryRef.current && secondaryRef.current) {
                primaryRef.current.style.opacity = "1"
                secondaryRef.current.style.opacity = "1"
            }
        }
        
        const onLeave = () => {
            if (primaryRef.current && secondaryRef.current) {
                primaryRef.current.style.opacity = "0.7"
                secondaryRef.current.style.opacity = "0.7"
            }
        }
        
        const onEnter = () => {
            if (primaryRef.current && secondaryRef.current) {
                primaryRef.current.style.opacity = "1"
                secondaryRef.current.style.opacity = "1"
            }
        }
        
        const onResize = () => {
            if (mouseX === 0 && mouseY === 0) {
                mouseX = window.innerWidth / 2
                mouseY = window.innerHeight / 2
                currentX = currentX2 = mouseX
                currentY = currentY2 = mouseY
            }
        }
        
        // Start animation
        const unsubscribe = addEffect(update)
        
        // Add listeners
        document.addEventListener("mousemove", onMove)
        document.addEventListener("mouseleave", onLeave)
        document.addEventListener("mouseenter", onEnter)
        window.addEventListener("resize", onResize)
        
        // Cleanup
        return () => {
            unsubscribe()
            document.removeEventListener("mousemove", onMove)
            document.removeEventListener("mouseleave", onLeave)
            document.removeEventListener("mouseenter", onEnter)
            window.removeEventListener("resize", onResize)
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

