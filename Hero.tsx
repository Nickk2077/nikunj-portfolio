'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const caseStudies = [
  {
    id: 1,
    title: 'Nova Finance App',
    subtitle: 'Mobile Banking Reimagined',
    problem: 'Users found traditional banking apps overwhelming, leading to low engagement and poor financial literacy.',
    solution: 'Designed a conversational interface with AI-powered insights, turning complex data into actionable advice.',
    outcome: '42% increase in DAU, 3.8 → 4.7 App Store rating, 60% reduction in support tickets.',
    process: ['Research', 'Wireframes', 'Prototyping', 'Testing', 'Handoff'],
    color: '#d946ef',
    screens: 4,
  },
  {
    id: 2,
    title: 'Horizon Design System',
    subtitle: 'Enterprise Component Library',
    problem: 'A 200-person product team working with inconsistent UI patterns across 8 products.',
    solution: 'Built a comprehensive design system with 200+ components, design tokens, and thorough documentation.',
    outcome: '70% faster design handoff, 40% reduction in QA bugs, adopted across 8 products in 6 weeks.',
    process: ['Audit', 'Token System', 'Component Library', 'Documentation', 'Adoption'],
    color: '#7c3aed',
    screens: 6,
  },
  {
    id: 3,
    title: 'Orbit Health Platform',
    subtitle: 'Patient-Centered Healthcare UX',
    problem: 'Patients struggled to navigate complex health information and appointment scheduling.',
    solution: 'Redesigned the patient portal with progressive disclosure, guided flows, and accessible typography.',
    outcome: '55% reduction in scheduling friction, 89% task completion rate, WCAG 2.1 AA certified.',
    process: ['User Research', 'Journey Mapping', 'IA', 'UI Design', 'Accessibility'],
    color: '#06b6d4',
    screens: 5,
  },
]

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="glass rounded-3xl border border-white/6 overflow-hidden hover:border-white/10 transition-all duration-500"
        data-cursor-hover
      >
        {/* Header */}
        <div
          className="p-8 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{ background: `${study.color}15`, color: study.color, border: `1px solid ${study.color}30` }}
                >
                  UI/UX Case Study
                </span>
                <span className="font-mono text-[10px] text-white/25">{study.screens} screens</span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-1">{study.title}</h3>
              <p className="font-body text-sm text-white/40">{study.subtitle}</p>
            </div>

            <motion.button
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all duration-300 flex-shrink-0 ml-4"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </motion.button>
          </div>

          {/* Process steps */}
          <div className="flex items-center gap-2 mt-5">
            {study.process.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-white/30">{step}</span>
                {i < study.process.length - 1 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-2.5 h-2.5 text-white/15">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8 border-t border-white/5">
                {/* Mock screens */}
                <div className="flex gap-3 mt-6 mb-8 overflow-x-auto pb-2">
                  {Array.from({ length: study.screens }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-32 h-56 rounded-xl border border-white/8 overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${study.color}15, rgba(0,0,0,0.4))` }}
                    >
                      <div className="p-2 h-full flex flex-col gap-1.5">
                        <div className="w-full h-2 rounded-full" style={{ background: `${study.color}30` }} />
                        <div className="w-3/4 h-1.5 rounded-full bg-white/10" />
                        <div className="flex-1 rounded-lg" style={{ background: `${study.color}10` }} />
                        <div className="w-full h-1.5 rounded-full bg-white/10" />
                        <div className="w-2/3 h-1.5 rounded-full bg-white/6" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-white/25 uppercase mb-2">The Problem</p>
                    <p className="font-body text-sm text-white/55 leading-relaxed">{study.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-white/25 uppercase mb-2">The Solution</p>
                    <p className="font-body text-sm text-white/55 leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-white/25 uppercase mb-2">Outcomes</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: study.color }}>{study.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function UIUXCaseStudies() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="uiux" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-fuchsia-950/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-fuchsia-400 uppercase">UI/UX Case Studies</span>
            <span className="flex-1 h-px bg-gradient-to-r from-fuchsia-500/50 to-transparent max-w-xs" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-fluid-xl font-bold text-white max-w-2xl"
          >
            Design that{' '}
            <span className="text-gradient-fire">solves</span>{' '}
            real problems
          </motion.h2>
        </div>

        <div className="space-y-5">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.id} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
