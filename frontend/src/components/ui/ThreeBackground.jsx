'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
    camera.position.z = 80

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const makeParticles = (count, color, size, opacity, spread) => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        pos[i * 3]     = (Math.random() - 0.5) * spread.x
        pos[i * 3 + 1] = (Math.random() - 0.5) * spread.y
        pos[i * 3 + 2] = (Math.random() - 0.5) * spread.z
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity, sizeAttenuation: true })
      return { points: new THREE.Points(geo, mat), mat }
    }

    const { points: gold, mat: goldMat } = makeParticles(300, 0xd4af37, 0.55, 0.5,  { x: 220, y: 170, z: 90 })
    const { points: dust }               = makeParticles(200, 0xffffff, 0.22, 0.18, { x: 220, y: 170, z: 90 })
    const { points: deep }               = makeParticles(150, 0xd4af37, 0.18, 0.12, { x: 300, y: 220, z: 150 })
    scene.add(gold, dust, deep)

    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let frame = 0, animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      frame += 0.0005
      gold.rotation.y  =  frame * 0.35 + mouseX * 0.04
      gold.rotation.x  =  frame * 0.12 + mouseY * 0.03
      dust.rotation.y  = -frame * 0.22 + mouseX * 0.02
      dust.rotation.x  =  frame * 0.09 + mouseY * 0.02
      deep.rotation.y  =  frame * 0.15
      deep.rotation.x  = -frame * 0.07
      goldMat.opacity  = 0.42 + Math.sin(frame * 5) * 0.08
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}
