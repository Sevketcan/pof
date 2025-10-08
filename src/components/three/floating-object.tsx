"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function FloatingObject() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create floating cube with wireframe
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshPhongMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Add inner solid cube
    const innerGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0x0066ff,
      transparent: true,
      opacity: 0.1
    })
    const innerCube = new THREE.Mesh(innerGeometry, innerMaterial)
    scene.add(innerCube)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    scene.add(directionalLight)

    // Mouse movement
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Rotate cubes
      cube.rotation.x += 0.005
      cube.rotation.y += 0.005
      innerCube.rotation.x -= 0.003
      innerCube.rotation.y -= 0.003

      // Float effect
      cube.position.y = Math.sin(Date.now() * 0.001) * 0.3
      innerCube.position.y = Math.sin(Date.now() * 0.001) * 0.3

      // Mouse interaction
      cube.rotation.x += mouseY * 0.01
      cube.rotation.y += mouseX * 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      geometry.dispose()
      material.dispose()
      innerGeometry.dispose()
      innerMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}