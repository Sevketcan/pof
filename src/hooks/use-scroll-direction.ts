"use client"

import { useState, useEffect } from 'react'

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      if (scrollY !== lastScrollY) {
        setScrollDirection(direction)
      }
      
      setLastScrollY(scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return scrollDirection
}