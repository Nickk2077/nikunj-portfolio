'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Reel() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isPlaying, setIsPlaying] = useState(false)

  const marqueeText = 'Motion Graphics • Video Editing • Visual Storytelling • After Effects • Cinema 4D • Color Grading • '.repeat(3)

  return (
    <section id="reel" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Marquee band above */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden py-3 bg-violet-600/10 border-y border-violet-500/15">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="font-mono text-[10px] tracking-[0.2em] text-violet-400/60 uppercase px-4">{marqueeText}</span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-violet-400/60 uppercase px-4" aria-hidden>{marqueeText}</span>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="flex-1 h-px bg-gradient-to-l from-fuchsia-500/50 to-transparent max-w-xs" />
            <span className="font-mono text-xs tracking-[0.3em] text-fuchsia-400 uppercase">Motion Reel</span>
            <span className="flex-1 h-px bg-gradient-to-r from-fuchsia-500/50 to-transparent max-w-xs" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-fluid-xl font-bold text-white"
          >
            Where ideas become{' '}
            <span className="text-gradient-neon">motion</span>
          </motion.h2>
        </div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-video bg-obsidian border border-white/8">
            {/* Placeholder visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-950/80 via-obsidian to-cyan-950/60 flex items-center justify-center">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)',
                  backgroundSize: '60px 60px'
                }}
              />

              {/* Center decoration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border border-violet-500/10 absolute animate-spin-slow" />
                <div className="w-48 h-48 rounded-full border border-cyan-500/10 absolute animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
                <div className="text-center">
                  <p className="font-mono text-xs text-white/30 tracking-widest uppercase mb-2">Motion Reel</p>
                  <p className="font-display text-3xl font-bold text-white/20">2024</p>
                </div>
              </div>
            </div>

            {/* Play button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center group/btn z-10"
              aria-label="Play reel"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-24 h-24"
              >
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-violet-600/20 blur-xl group-hover/btn:bg-violet-600/40 transition-all duration-500" />
                {/* Button */}
                <div className="relative w-24 h-24 rounded-full glass border border-white/20 flex items-center justify-center group-hover/btn:border-violet-500/60 group-hover/btn:bg-violet-600/20 transition-all duration-400">
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 opacity-80">
                      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 opacity-80 translate-x-0.5">
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  )}
                </div>
              </motion.div>
            </button>

            {/* Duration bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                initial={{ width: '0%' }}
                animate={isPlaying ? { width: '65%' } : { width: '0%' }}
                transition={{ duration: 120, ease: 'linear' }}
              />
            </div>

            {/* Controls overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono text-xs text-white/60">00:00 / 02:30</span>
              <div className="flex-1 h-px bg-white/10" />
              <button className="text-white/50 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl glow-violet opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 scale-[1.02]" />
        </motion.div>

        {/* Reel stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-5 mt-8"
        >
          {[
            { label: 'Projects featured', value: '24' },
            { label: 'Awards nominated', value: '6' },
            { label: 'Runtime', value: '2:30' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center border border-white/5">
              <span className="font-display text-2xl md:text-3xl font-bold text-gradient-violet">{stat.value}</span>
              <p className="font-mono text-xs text-white/30 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
