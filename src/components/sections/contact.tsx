"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, x: 60 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Reset form
    setFormData({ name: '', email: '', message: '' })
    setIsSubmitting(false)
    
    // Show success message (you could use a toast here)
    alert('Thank you for your message! I will get back to you soon.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sevketcan@example.com",
      href: "mailto:sevketcan@example.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: "#"
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="py-20 px-4 bg-background/50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2 
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          Get In <span className="text-primary">Touch</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
              <p className="text-foreground/80 mb-6">
                I'm always interested in hearing about new opportunities, exciting projects, 
                or just having a chat about technology and innovation. Feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <motion.div
                  key={info.label}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                    <CardContent className="p-4">
                      <a 
                        href={info.href}
                        className="flex items-center space-x-4 hover:text-primary transition-colors"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60">{info.label}</p>
                          <p className="font-medium">{info.value}</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.div
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="h-12 w-12 rounded-full"
                    >
                      <a 
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="mt-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                🟢 Available for freelance projects
              </Badge>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="bg-background/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hello..."
                      className="bg-background/50 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}