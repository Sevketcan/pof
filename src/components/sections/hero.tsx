"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { ArrowDown, Download, Mail } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background zoom animation
      gsap.to(backgroundRef.current, {
        scale: 1.2,
        duration: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5,
          ease: "power4.out",
          delay: 0.5
        }
      )

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5,
          ease: "power4.out",
          delay: 0.8
        }
      )

      // CTA buttons animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5,
          ease: "power4.out",
          delay: 1.1
        }
      )

      // Parallax effect on scroll
      gsap.to([titleRef.current, subtitleRef.current], {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background/90 to-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
        >
          Sevketcan
          <br />
          Kalyoncuoglu
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-12 font-light"
        >
          Computer Science Engineer
          <br />
          <span className="text-primary">Crafting Digital Experiences</span>
        </p>

        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            size="lg" 
            className="px-8 py-6 text-lg group"
            onClick={() => scrollToSection('#projects')}
          >
            View My Work
            <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 text-lg group"
            onClick={() => scrollToSection('#contact')}
          >
            Get In Touch
            <Mail className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-foreground/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}