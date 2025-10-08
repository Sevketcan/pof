"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState(0)

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

      // Orbit animation
      gsap.fromTo(orbitRef.current,
        { opacity: 0, scale: 0.5 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: orbitRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Skills cards animation
      const cards = skillsRef.current?.children
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const techStack = [
    { name: "React", level: 95, category: "Frontend", color: "bg-blue-500" },
    { name: "TypeScript", level: 90, category: "Language", color: "bg-blue-600" },
    { name: "Node.js", level: 88, category: "Backend", color: "bg-green-600" },
    { name: "Python", level: 85, category: "Language", color: "bg-yellow-500" },
    { name: "AWS", level: 82, category: "Cloud", color: "bg-orange-500" },
    { name: "Docker", level: 78, category: "DevOps", color: "bg-blue-400" },
    { name: "PostgreSQL", level: 85, category: "Database", color: "bg-indigo-600" },
    { name: "MongoDB", level: 80, category: "Database", color: "bg-green-500" },
    { name: "Kubernetes", level: 75, category: "DevOps", color: "bg-blue-700" },
    { name: "GraphQL", level: 82, category: "Backend", color: "bg-pink-600" },
    { name: "TensorFlow", level: 70, category: "AI/ML", color: "bg-orange-600" },
    { name: "Rust", level: 65, category: "Language", color: "bg-red-600" }
  ]

  const orbitTech = [
    { name: "React", icon: "⚛️", angle: 0 },
    { name: "Node.js", icon: "🟢", angle: 30 },
    { name: "Python", icon: "🐍", angle: 60 },
    { name: "AWS", icon: "☁️", angle: 90 },
    { name: "Docker", icon: "🐳", angle: 120 },
    { name: "TypeScript", icon: "📘", angle: 150 },
    { name: "PostgreSQL", icon: "🐘", angle: 180 },
    { name: "MongoDB", icon: "🍃", angle: 210 },
    { name: "Kubernetes", icon: "☸️", angle: 240 },
    { name: "GraphQL", icon: "◈", angle: 270 },
    { name: "TensorFlow", icon: "🤖", angle: 300 },
    { name: "Rust", icon: "🦀", angle: 330 }
  ]

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: techStack.filter(s => s.category === "Frontend")
    },
    {
      title: "Backend Development", 
      skills: techStack.filter(s => s.category === "Backend")
    },
    {
      title: "Cloud & DevOps",
      skills: techStack.filter(s => s.category === "Cloud" || s.category === "DevOps")
    },
    {
      title: "Languages & Databases",
      skills: techStack.filter(s => s.category === "Language" || s.category === "Database")
    },
    {
      title: "AI & Machine Learning",
      skills: techStack.filter(s => s.category === "AI/ML")
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="skills"
      className="py-20 px-4 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          Technical <span className="text-primary">Skills</span>
        </motion.h2>

        {/* Orbit Visualization */}
        <div className="flex justify-center mb-20">
          <div ref={orbitRef} className="relative w-80 h-80">
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">TECH</span>
            </div>
            
            {/* Orbit rings */}
            <div className="absolute inset-0 border-2 border-border/30 rounded-full" />
            <div className="absolute inset-8 border border-border/20 rounded-full" />
            <div className="absolute inset-16 border border-border/10 rounded-full" />
            
            {/* Orbiting tech icons */}
            {orbitTech.map((tech, index) => {
              const angle = (tech.angle + rotation) * (Math.PI / 180)
              const radius = index % 2 === 0 ? 120 : 90
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius
              
              return (
                <motion.div
                  key={tech.name}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
                  }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative group">
                    <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center border border-border/50 shadow-lg">
                      <span className="text-xl">{tech.icon}</span>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs bg-background px-2 py-1 rounded border border-border/50 whitespace-nowrap">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Skills Categories */}
        <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={category.title} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-foreground/60">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-6">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Git", "CI/CD", "REST APIs", "Microservices", "Agile", "Scrum",
              "Jest", "Cypress", "Webpack", "Vite", "Next.js", "Express",
              "Redis", "Elasticsearch", "Apache Kafka", "gRPC", "Selenium"
            ].map((tech) => (
              <Badge key={tech} variant="outline" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}