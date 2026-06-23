'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    id: '01',
    title: 'Graphic Design',
    description: 'Brand identities, print collateral, visual systems, and editorial design that communicate with clarity and impact. Every mark is deliberate.',
    gradient: 'from-violet-600/20 to-purple-800/10',
    borderColor: 'border-violet-500/20',
    glowColor: 'rgba(124,58,237,0.3)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Motion Graphics',
    description: 'Animated logos, title sequences, explainer videos, and kinetic typography that bring static design to cinematic life.',
    gradient: 'from-cyan-600/20 to-blue-800/10',
    borderColor: 'border-cyan-500/20',
    glowColor: 'rgba(6,182,212,0.3)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" /><path d="M9 8l6 4-6 4V8z" />
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Video Editing',
    description: 'Commercials, reels, documentary edits, and social content — storytelling through rhythm, pacing, color grading, and sound design.',
    gradient: 'from-rose-600/20 to-pink-800/10',
    borderColor: 'border-rose-500/20',
    glowColor: 'rgba(244,63,94,0.3)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M10 9l5 3-5 3V9z" />
      </svg>
    ),
  },
  {
    id: '04',
    title: 'UI/UX Design',
    description: 'User research, wireframes, high-fidelity interfaces, and interactive prototypes. Design that converts because it actually respects the user.',
    gradient: 'from-fuchsia-600/20 to-pink-800/10',
    borderColor: 'border-fuchsia-500/20',
    glowColor: 'rgba(217,70,239,0.3)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: '05',
    title: '3D Design & Art',
    description: 'Product visualizations, abstract sculptures, environment art, and motion-ready 3D assets built in Cinema 4D and Blender.',
    gradient: 'from-amber-600/20 to-orange-800/10',
    borderColor: 'border-amber-500/20',
    glowColor: 'rgba(245,158,11,0.3)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      data-cursor-hover
    >
      <div
        className={`relative glass rounded-3xl p-8 border ${service.borderColor} overflow-hidden
          transition-all duration-500 hover:scale-[1.02] hover:border-opacity-60
          bg-gradient-to-br ${service.gradient}`}
        style={{
          '--glow': service.glowColor,
        } as React.CSSProperties}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
          style={{ background: service.glowColor, transform: 'scale(1.1)' }}
        />

        {/* Number */}
        <span className="font-mono text-xs text-white/20 font-medium tracking-widest">{service.id}</span>

        {/* Icon */}
        <div className="mt-6 mb-6 w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-gradient-violet transition-all duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
          {service.description}
        </p>

        {/* Arrow */}
        <div className="mt-8 flex items-center gap-2 text-xs font-mono text-white/30 group-hover:text-white/70 transition-colors duration-300">
          <span>Learn more</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-obsidian to-void" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-950/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-violet-400 uppercase">What I Do</span>
            <span className="flex-1 h-px bg-gradient-to-r from-violet-500/50 to-transparent max-w-xs" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-fluid-xl font-bold leading-tight text-white max-w-2xl"
          >
            Crafting{' '}
            <span className="text-gradient-neon">experiences</span>{' '}
            across five disciplines
          </motion.h2>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-16"
        >
          <p className="font-body text-white/40 mb-6">Got a project in mind?</p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="magnetic inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-violet-500/30 text-violet-300 font-medium text-sm hover:bg-violet-500/10 hover:border-violet-500/60 transition-all duration-300"
          >
            Start a conversation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
