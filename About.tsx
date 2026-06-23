'use client'

import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Text3D, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useInView } from 'framer-motion'

function RotatingSculpture({ shape = 'torus' }: { shape?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.3
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
  })

  const geometries: Record<string, JSX.Element> = {
    torus: <torusKnotGeometry args={[1, 0.35, 128, 16]} />,
    sphere: <sphereGeometry args={[1.2, 64, 64]} />,
    icosahedron: <icosahedronGeometry args={[1.2, 2]} />,
    octahedron: <octahedronGeometry args={[1.2, 2]} />,
  }

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        {geometries[shape] || geometries.torus}
        <MeshDistortMaterial
          color="#7c3aed"
          envMapIntensity={0.8}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0.2}
          roughness={0.1}
          distort={0.3}
          speed={3}
        />
      </mesh>
    </Float>
  )
}

function Scene3D({ activeShape }: { activeShape: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#7c3aed" />
      <pointLight position={[-5, -5, 3]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#d946ef" />

      <RotatingSculpture shape={activeShape} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
    </Canvas>
  )
}

const sculptures = [
  { id: 'torus', label: 'Knot I', description: 'Möbius-inspired torus knot exploring continuous flow and mathematical beauty.' },
  { id: 'sphere', label: 'Orb II', description: 'Distorted sphere study — organic surface displacement through procedural noise.' },
  { id: 'icosahedron', label: 'Prism III', description: 'Low-poly icosahedron subdivision. Sacred geometry meets digital minimalism.' },
  { id: 'octahedron', label: 'Crystal IV', description: 'Crystalline octahedron form. Raw geometric purity with reflective surface.' },
]

export default function Gallery3D() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [active, setActive] = useState('torus')

  const activeData = sculptures.find(s => s.id === active)

  return (
    <section id="gallery" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-emerald-400 uppercase">3D Gallery</span>
            <span className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent max-w-xs" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-fluid-xl font-bold text-white max-w-2xl"
          >
            Interactive{' '}
            <span className="text-gradient-violet">3D sculptures</span>{' '}
            — rotate & explore
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass border border-white/8">
              {/* 3D Canvas */}
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                </div>
              }>
                <Scene3D activeShape={active} />
              </Suspense>

              {/* Corner label */}
              <div className="absolute top-4 left-4 glass px-3 py-1.5 rounded-full border border-white/10">
                <span className="font-mono text-[10px] text-white/50">Drag to rotate</span>
              </div>

              {/* Active shape info */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass rounded-2xl p-4 border border-white/8">
                  <span className="font-display text-lg font-bold text-white">{activeData?.label}</span>
                  <p className="font-body text-xs text-white/50 mt-1 leading-relaxed">{activeData?.description}</p>
                </div>
              </div>
            </div>

            {/* Ambient glow */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ boxShadow: '0 0 80px rgba(124,58,237,0.2)' }} />
          </motion.div>

          {/* Selector + Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">Select sculpture</p>
            {sculptures.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActive(s.id)}
                className={`w-full text-left glass rounded-2xl p-5 border transition-all duration-300 group ${
                  active === s.id
                    ? 'border-violet-500/40 bg-violet-500/5'
                    : 'border-white/6 hover:border-white/15'
                }`}
                data-cursor-hover
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Mini shape indicator */}
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      active === s.id ? 'bg-violet-400 shadow-[0_0_8px_rgba(124,58,237,0.8)]' : 'bg-white/20'
                    }`} />
                    <div>
                      <h4 className={`font-display font-bold transition-colors duration-300 ${
                        active === s.id ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                      }`}>
                        {s.label}
                      </h4>
                      <p className="font-body text-xs text-white/30 mt-0.5 line-clamp-1">{s.description}</p>
                    </div>
                  </div>
                  <svg
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    className={`w-4 h-4 transition-all duration-300 ${
                      active === s.id ? 'text-violet-400 translate-x-0' : 'text-white/20 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                    }`}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            ))}

            {/* Info note */}
            <div className="pt-4">
              <p className="font-mono text-xs text-white/20 leading-relaxed">
                All models are built in Cinema 4D and Blender, rendered with custom shaders and lighting setups.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
