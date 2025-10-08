"use client"

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center space-y-2 text-foreground/60"
      >
        <span className="text-sm font-medium">Scroll to explore</span>
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </motion.div>
  )
}