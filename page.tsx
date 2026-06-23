'use client'

import { useEffect, useRef, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'

const HeroScene = lazy(() => import('../3d/HeroScene'))

const roles = ['Graphic Designer', 'Motion Artist', 'Video Editor', 'UI/UX Designer', '3D Creator']

function RolesCycler() {
  const containerRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const cycle = () => {
      indexRef.current = (indexRef.current + 1) % roles.length
      const spans = el.querySelectorAll('span')
      spans.forEach((s, i) => {
        s.style.transform = `translateY(${(i - indexRef.current) * 100}%)`
      })
    }

    const interval = setInterval(cycle, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex overflow-hidden h-[1.2em]" ref={containerRef}>
      {roles.map((role, i) => (
        <span
          key={i}
          className="absolute text-gradient-violet font-display font-bold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: i === 0 ? 'translateY(0%)' : 'translateY(100%)' }}
        >
          {role}
        </span>
      ))}
      <span className="invisible">{roles[0]}</span>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } }
}

const lineVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full bg-gradient-radial from-violet-900/20 to-transparent" />
        }>
          <HeroScene />
        </Suspense>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-void/20 via-transparent to-void" />
      <div className="absolute bottom-0 left-0 right-0 h-64 z-[1] bg-gradient-to-t from-void to-transparent" />

      {/* Ambient glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[100px] z-[1] animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] z-[1] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-gradient-to-r from-transparent to-violet-500" />
          <span className="font-mono text-xs font-medium tracking-[0.3em] text-violet-400 uppercase">
            Creative Portfolio
          </span>
          <span className="w-8 h-px bg-gradient-to-l from-transparent to-violet-500" />
        </motion.div>

        {/* Main headline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <motion.div variants={lineVariants} className="overflow-hidden">
            <h1 className="font-display text-fluid-hero font-bold leading-[0.88] tracking-tight text-white mb-2">
              Nikunj
            </h1>
          </motion.div>
          <motion.div variants={lineVariants} className="overflow-hidden">
            <h1 className="font-display text-fluid-hero font-bold leading-[0.88] tracking-tight text-gradient-neon mb-6">
              Zapadiya
            </h1>
          </motion.div>
        </motion.div>

        {/* Role cycler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="relative flex justify-center mb-10"
        >
          <div className="font-display text-fluid-md font-medium text-white/70">
            <RolesCycler />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-base md:text-lg text-white/50 max-w-xl mx-auto leading-relaxed mb-12"
        >
          Crafting immersive digital experiences where design meets motion,
          storytelling meets technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="magnetic group relative px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium text-sm tracking-wide overflow-hidden hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] transition-shadow duration-400"
          >
            <span className="relative z-10">View My Work</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </a>

          <a
            href="#reel"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#reel')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="magnetic group px-8 py-4 rounded-full glass border border-white/10 text-white/80 font-medium text-sm tracking-wide hover:border-violet-500/40 hover:text-white transition-all duration-300"
          >
            <span className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center group-hover:border-violet-400 transition-colors">
                <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                  <path d="M0 0L8 5L0 10V0Z" />
                </svg>
              </span>
              Watch Reel
            </span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
            <motion.div
              className="absolute w-full bg-violet-400"
              animate={{ top: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              style={{ height: '40%' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-20 left-0 right-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="glass rounded-2xl px-8 py-5 flex flex-wrap justify-between gap-6">
            {[
              { num: '50+', label: 'Projects Delivered' },
              { num: '5+', label: 'Years Experience' },
              { num: '30+', label: 'Clients Worldwide' },
              { num: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center sm:items-start">
                <span className="font-display text-2xl font-bold text-gradient-violet">{stat.num}</span>
                <span className="font-mono text-xs text-white/40 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
