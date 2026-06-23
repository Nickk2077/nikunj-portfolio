'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skills = [
  { name: 'Motion Graphics', level: 95, color: '#7c3aed' },
  { name: 'Graphic Design', level: 92, color: '#06b6d4' },
  { name: 'UI/UX Design', level: 88, color: '#d946ef' },
  { name: 'Video Editing', level: 90, color: '#f59e0b' },
  { name: '3D Design', level: 82, color: '#10b981' },
]

const tools = [
  'After Effects', 'Premiere Pro', 'Photoshop', 'Illustrator',
  'Figma', 'Cinema 4D', 'Blender', 'DaVinci Resolve',
]

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-2">
        <span className="font-body text-sm text-white/70 font-medium">{name}</span>
        <span className="font-mono text-xs text-white/40">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
        />
      </div>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-violet-400 uppercase">About Me</span>
          <span className="flex-1 h-px bg-gradient-to-r from-violet-500/50 to-transparent max-w-xs" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* Left: Narrative */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-fluid-lg font-bold leading-tight text-white mb-8"
            >
              Designing at the{' '}
              <span className="text-gradient-violet">intersection</span>{' '}
              of art and technology
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 text-white/55 font-body leading-relaxed"
            >
              <p>
                I&apos;m a multidisciplinary creative based in India, driven by a single obsession:
                making things that move people. Over the past 5+ years, I&apos;ve worked across
                the full spectrum of visual communication — from brand identities to cinematic
                motion pieces to immersive digital products.
              </p>
              <p>
                My work lives at the crossroads of graphic design, motion graphics, and
                interactive technology. I believe the best creative work isn&apos;t just seen —
                it&apos;s felt. Every pixel, every frame, every interaction is an opportunity
                to create an emotional connection.
              </p>
              <p>
                When I&apos;m not pushing boundaries with clients, I&apos;m exploring generative
                art, experimenting with 3D worlds, and studying how the most iconic visual
                communicators across history made their mark.
              </p>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <p className="font-mono text-xs tracking-widest text-white/30 uppercase mb-4">Tools & Software</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-mono font-medium text-white/60 glass rounded-full border border-white/6 hover:border-violet-500/40 hover:text-white/90 transition-all duration-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 inline-flex items-center gap-3 px-4 py-2.5 glass rounded-full border border-emerald-500/20"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-emerald-400 font-medium">Available for projects</span>
            </motion.div>
          </div>

          {/* Right: Skills + floating card */}
          <div className="space-y-8">
            {/* Portrait card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8 border border-white/6 overflow-hidden">
                {/* Abstract portrait placeholder with gradient geometry */}
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6"
                  style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2), rgba(217,70,239,0.15))' }}>
                  {/* Decorative geometry */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-2 border-violet-500/30 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600/50 to-cyan-500/50 flex items-center justify-center">
                        <span className="font-display text-3xl font-bold text-white">NZ</span>
                      </div>
                    </div>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-2xl border border-violet-500/20 rotate-12 animate-float" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full border border-cyan-500/30 animate-float" style={{ animationDelay: '1s' }} />
                </div>
                <div className="text-center">
                  <h3 className="font-display text-xl font-bold text-white mb-1">Nikunj Zapadiya</h3>
                  <p className="font-mono text-xs text-violet-400 tracking-wider">Creative Director & Designer</p>
                </div>
              </div>

              {/* Floating achievement badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 border border-violet-500/20"
              >
                <span className="font-display text-lg font-bold text-gradient-violet">5+</span>
                <p className="font-mono text-[10px] text-white/40">Years</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 border border-cyan-500/20"
              >
                <span className="font-display text-lg font-bold text-gradient-violet">50+</span>
                <p className="font-mono text-[10px] text-white/40">Projects</p>
              </motion.div>
            </motion.div>

            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-3xl p-6 border border-white/6 space-y-5"
            >
              <p className="font-mono text-xs tracking-widest text-white/30 uppercase mb-6">Expertise Level</p>
              {skills.map((skill, i) => (
                <SkillBar key={i} {...skill} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
