'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const items = [
  'Graphic Design', '✦', 'Motion Graphics', '✦', 'Video Editing',
  '✦', 'UI/UX Design', '✦', '3D Art', '✦', 'Brand Identity',
  '✦', 'Creative Direction', '✦', 'Visual Storytelling',
]

export default function MarqueeBand() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const text = [...items, ...items].join('  ')

  return (
    <section ref={ref} className="relative py-8 overflow-hidden border-y border-white/5 bg-obsidian/40">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="flex"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className={`mx-4 font-mono text-xs uppercase tracking-[0.2em] ${
                item === '✦' ? 'text-violet-500' : 'text-white/20'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee whitespace-nowrap" aria-hidden>
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className={`mx-4 font-mono text-xs uppercase tracking-[0.2em] ${
                item === '✦' ? 'text-violet-500' : 'text-white/20'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
