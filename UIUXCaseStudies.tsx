'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const steps = [
      { target: 30, duration: 400 },
      { target: 65, duration: 600 },
      { target: 90, duration: 400 },
      { target: 100, duration: 300 },
    ]

    let current = 0
    const runStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setTimeout(() => setLoading(false), 300)
        return
      }
      const step = steps[stepIndex]
      const startVal = current
      const diff = step.target - startVal
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const pct = Math.min(elapsed / step.duration, 1)
        const eased = 1 - Math.pow(1 - pct, 3)
        current = startVal + diff * eased
        setProgress(Math.round(current))
        if (pct < 1) {
          requestAnimationFrame(animate)
        } else {
          setPhase(stepIndex + 1)
          runStep(stepIndex + 1)
        }
      }
      requestAnimationFrame(animate)
    }

    runStep(0)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16 text-center"
          >
            <span className="font-display text-5xl font-bold text-gradient-neon">NZ</span>
            <p className="font-mono text-xs text-white/25 tracking-[0.4em] uppercase mt-2">Portfolio</p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 md:w-80">
            <div className="flex justify-between mb-3">
              <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">Loading</span>
              <span className="font-mono text-[10px] text-white/40">{progress}%</span>
            </div>
            <div className="h-px bg-white/8 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-cyan-400"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Phase text */}
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] text-white/20 mt-6 tracking-widest"
          >
            {['Initializing...', 'Loading assets...', 'Building 3D scene...', 'Almost ready...', 'Welcome'][phase]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
