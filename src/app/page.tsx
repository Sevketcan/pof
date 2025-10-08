"use client"

import { useEffect, useRef, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Projects } from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { Timeline } from '@/components/sections/timeline'
import { Contact } from '@/components/sections/contact'
import { FloatingObject } from '@/components/three/floating-object'
import { ScrollIndicator } from '@/components/ui/scroll-indicator'
import { SmoothScroll } from '@/components/smooth-scroll'
import { useScrollDirection } from '@/hooks/use-scroll-direction'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollDirection = useScrollDirection()
  const [isNavVisible, setIsNavVisible] = useState(true)

  useEffect(() => {
    setIsNavVisible(scrollDirection === 'up' || scrollDirection === null)
  }, [scrollDirection])

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <Navigation isVisible={isNavVisible} />
        
        {/* 3D Floating Background Object */}
        <FloatingObject />
        
        {/* Scroll Indicator */}
        <ScrollIndicator />
        
        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Timeline Section */}
          <Timeline />
          
          {/* Projects Section */}
          <Projects />
          
          {/* Skills Section */}
          <Skills />
          
          {/* Contact Section */}
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  )
}