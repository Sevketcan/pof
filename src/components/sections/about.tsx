"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code, Database, Globe, Brain, Rocket, Users } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -60 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Cards stagger animation
      gsap.fromTo(cardsRef.current?.children,
        { opacity: 0, y: 60, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const specialties = [
    { icon: Code, title: "Full-Stack Development", description: "Building end-to-end solutions with modern frameworks" },
    { icon: Database, title: "Data Engineering", description: "Designing scalable database architectures and pipelines" },
    { icon: Globe, title: "Web Technologies", description: "Creating responsive, performant web applications" },
    { icon: Brain, title: "Machine Learning", description: "Implementing AI/ML solutions for complex problems" },
    { icon: Rocket, title: "System Design", description: "Architecting robust, scalable systems" },
    { icon: Users, title: "Team Leadership", description: "Leading cross-functional development teams" }
  ]

  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js", "Python", 
    "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB",
    "Machine Learning", "DevOps", "Agile", "System Design"
  ]

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="py-20 px-4 bg-background/50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          About <span className="text-primary">Me</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg text-foreground/80 leading-relaxed">
              I'm a passionate Computer Science Engineer with a keen interest in building 
              innovative digital solutions that bridge the gap between complex problems and 
              elegant user experiences.
            </p>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              With expertise spanning full-stack development, machine learning, and system 
              architecture, I thrive on tackling challenges that require both technical depth 
              and creative problem-solving.
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              My approach combines engineering rigor with a user-centric mindset, ensuring 
              that every solution is not only technically sound but also delivers real value.
            </p>

            {/* Skills Tags */}
            <div className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Specialties Cards */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 gap-4">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.title}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <specialty.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{specialty.title}</h3>
                        <p className="text-sm text-foreground/70">{specialty.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}