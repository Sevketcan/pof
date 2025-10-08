"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ExternalLink, Github, X } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  features: string[]
  liveUrl?: string
  githubUrl?: string
  category: string
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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

      // Project cards stagger animation
      const cards = projectsRef.current?.children
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 60, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const projects: Project[] = [
    {
      id: 1,
      title: "AI-Powered Analytics Platform",
      description: "Real-time data analytics platform with machine learning insights",
      longDescription: "A comprehensive analytics platform that leverages machine learning algorithms to provide real-time insights and predictive analytics. Built with microservices architecture for scalability and performance.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "Python", "TensorFlow", "PostgreSQL", "Redis"],
      features: [
        "Real-time data processing",
        "ML-powered predictions",
        "Interactive dashboards",
        "Custom report generation",
        "API-first architecture"
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "Full-Stack"
    },
    {
      id: 2,
      title: "Cloud-Native E-Commerce Solution",
      description: "Scalable e-commerce platform with microservices architecture",
      longDescription: "Enterprise-grade e-commerce solution designed to handle millions of transactions. Implements event-driven architecture and containerized microservices for maximum scalability and reliability.",
      image: "/api/placeholder/600/400",
      technologies: ["Next.js", "Go", "Kubernetes", "Docker", "MongoDB", "RabbitMQ"],
      features: [
        "Microservices architecture",
        "Auto-scaling infrastructure",
        "Real-time inventory management",
        "Payment gateway integration",
        "Advanced search and filtering"
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "Cloud"
    },
    {
      id: 3,
      title: "Machine Learning Pipeline",
      description: "Automated ML pipeline for model training and deployment",
      longDescription: "End-to-end machine learning pipeline that automates data preprocessing, model training, evaluation, and deployment. Supports multiple ML frameworks and provides comprehensive monitoring.",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "Apache Airflow", "Kubeflow", "MLflow", "Docker", "AWS"],
      features: [
        "Automated model training",
        "Version control for models",
        "A/B testing framework",
        "Performance monitoring",
        "CI/CD integration"
      ],
      githubUrl: "https://github.com",
      category: "Machine Learning"
    },
    {
      id: 4,
      title: "Real-Time Collaboration Platform",
      description: "WebSocket-based collaborative workspace for teams",
      longDescription: "A real-time collaboration platform that enables teams to work together seamlessly. Features include live document editing, video conferencing, and project management tools.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Socket.io", "WebRTC", "Node.js", "Express", "MongoDB"],
      features: [
        "Real-time document editing",
        "Video conferencing",
        "Screen sharing",
        "Project management",
        "Team analytics"
      ],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "Real-Time"
    },
    {
      id: 5,
      title: "Blockchain Supply Chain",
      description: "Transparent supply chain management using blockchain technology",
      longDescription: "Revolutionary supply chain management system built on blockchain technology. Provides complete transparency and traceability for products from manufacturer to consumer.",
      image: "/api/placeholder/600/400",
      technologies: ["Solidity", "Web3.js", "React", "Node.js", "IPFS", "Ethereum"],
      features: [
        "Blockchain-based tracking",
        "Smart contracts",
        "Immutable records",
        "Supplier verification",
        "Consumer transparency"
      ],
      githubUrl: "https://github.com",
      category: "Blockchain"
    },
    {
      id: 6,
      title: "IoT Smart Home System",
      description: "Comprehensive smart home automation and monitoring system",
      longDescription: "Complete IoT ecosystem for smart home management. Integrates various sensors and devices to provide automated control, energy monitoring, and security features.",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "MQTT", "Raspberry Pi", "React", "Node-RED", "InfluxDB"],
      features: [
        "Device automation",
        "Energy monitoring",
        "Security alerts",
        "Voice control integration",
        "Mobile app control"
      ],
      githubUrl: "https://github.com",
      category: "IoT"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 bg-background/50"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          Featured <span className="text-primary">Projects</span>
        </motion.h2>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-t-lg flex items-center justify-center">
                    <div className="text-6xl text-primary/30">
                      {project.category === 'Full-Stack' && '🌐'}
                      {project.category === 'Cloud' && '☁️'}
                      {project.category === 'Machine Learning' && '🤖'}
                      {project.category === 'Real-Time' && '⚡'}
                      {project.category === 'Blockchain' && '⛓️'}
                      {project.category === 'IoT' && '🏠'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{project.category}</Badge>
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  
                  <p className="text-foreground/70 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Project Image */}
                <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <div className="text-8xl text-primary/30">
                    {selectedProject.category === 'Full-Stack' && '🌐'}
                    {selectedProject.category === 'Cloud' && '☁️'}
                    {selectedProject.category === 'Machine Learning' && '🤖'}
                    {selectedProject.category === 'Real-Time' && '⚡'}
                    {selectedProject.category === 'Blockchain' && '⛓️'}
                    {selectedProject.category === 'IoT' && '🏠'}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overview</h3>
                  <p className="text-foreground/80">{selectedProject.longDescription}</p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {selectedProject.liveUrl && (
                    <Button asChild>
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live
                      </a>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}