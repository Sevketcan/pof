"use client"

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Briefcase } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

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

      // Timeline items stagger animation
      const items = timelineRef.current?.children
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, x: -100 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.3,
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const timelineEvents = [
    {
      year: "2024",
      title: "Senior Software Engineer",
      company: "Tech Innovation Labs",
      location: "San Francisco, CA",
      type: "work",
      description: "Leading development of scalable cloud-native applications and mentoring junior developers.",
      technologies: ["React", "Node.js", "AWS", "Kubernetes"]
    },
    {
      year: "2023",
      title: "Machine Learning Engineer",
      company: "AI Solutions Inc.",
      location: "Remote",
      type: "work",
      description: "Developed and deployed ML models for production systems, improving accuracy by 40%.",
      technologies: ["Python", "TensorFlow", "PyTorch", "Docker"]
    },
    {
      year: "2022",
      title: "Bachelor of Computer Science",
      company: "University of California",
      location: "Berkeley, CA",
      type: "education",
      description: "Graduated Magna Cum Laude with specialization in Artificial Intelligence and Software Engineering.",
      technologies: ["Algorithms", "Data Structures", "Machine Learning", "Distributed Systems"]
    },
    {
      year: "2021",
      title: "Software Engineering Intern",
      company: "Google",
      location: "Mountain View, CA",
      type: "work",
      description: "Worked on the Google Cloud Platform team, developing internal tools for resource management.",
      technologies: ["Go", "Kubernetes", "Cloud APIs", "Microservices"]
    },
    {
      year: "2020",
      title: "Full-Stack Developer",
      company: "StartupHub",
      location: "Austin, TX",
      type: "work",
      description: "Built and launched multiple web applications serving 10,000+ users.",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"]
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="timeline"
      className="py-20 px-4 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          My <span className="text-primary">Journey</span>
        </motion.h2>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-border" />

          {/* Timeline events */}
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Timeline dot */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />

              {/* Content */}
              <div className={`ml-20 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto'
              }`}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-primary">
                        {event.year}
                      </Badge>
                      {event.type === 'work' ? (
                        <Briefcase className="h-4 w-4 text-foreground/60" />
                      ) : (
                        <Calendar className="h-4 w-4 text-foreground/60" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-primary font-medium mb-1">{event.company}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-foreground/60 mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                    
                    <p className="text-foreground/80 mb-4">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {event.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}