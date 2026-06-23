'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Apex Brand Identity',
    category: 'Graphic Design',
    tags: ['Branding', 'Identity', 'Print'],
    year: '2024',
    description: 'Complete visual identity for a luxury sportswear brand. Custom typeface, icon system, and brand guidelines that cut through category noise.',
    bgColor: 'from-violet-950/60 to-purple-900/30',
    accent: '#7c3aed',
    wide: true,
  },
  {
    id: 2,
    title: 'Luminary Motion Reel',
    category: 'Motion Graphics',
    tags: ['After Effects', 'Cinema 4D', 'Sound Design'],
    year: '2024',
    description: 'Showcase motion piece for a tech startup — particle systems, data visualization, and fluid transitions.',
    bgColor: 'from-cyan-950/60 to-blue-900/30',
    accent: '#06b6d4',
    wide: false,
  },
  {
    id: 3,
    title: 'Nova App Design',
    category: 'UI/UX Design',
    tags: ['Figma', 'Prototyping', 'Design System'],
    year: '2023',
    description: 'End-to-end product design for a fintech mobile app — from user research and wireframes to a polished, system-ready design.',
    bgColor: 'from-fuchsia-950/60 to-pink-900/30',
    accent: '#d946ef',
    wide: false,
  },
  {
    id: 4,
    title: 'Epoch Documentary',
    category: 'Video Editing',
    tags: ['Premiere Pro', 'Color Grading', 'DaVinci'],
    year: '2023',
    description: 'Feature-length documentary edit exploring climate technology. Cinematic color grading, archival footage integration, and original score timing.',
    bgColor: 'from-amber-950/60 to-orange-900/30',
    accent: '#f59e0b',
    wide: true,
  },
  {
    id: 5,
    title: 'Crystal 3D Collection',
    category: '3D Design',
    tags: ['Blender', 'Cinema 4D', 'Rendering'],
    year: '2024',
    description: 'Abstract 3D art collection exploring crystalline geometries, light refraction, and procedural textures.',
    bgColor: 'from-emerald-950/60 to-teal-900/30',
    accent: '#10b981',
    wide: false,
  },
  {
    id: 6,
    title: 'Pulse Campaign',
    category: 'Motion + Design',
    tags: ['Multi-channel', 'Animation', 'Social'],
    year: '2024',
    description: 'Integrated campaign for a global music streaming brand — social content, OOH animations, and launch event experience.',
    bgColor: 'from-rose-950/60 to-red-900/30',
    accent: '#f43f5e',
    wide: false,
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative ${project.wide ? 'md:col-span-2' : ''}`}
      data-cursor-hover
    >
      <div className="relative overflow-hidden rounded-3xl glass border border-white/6 hover:border-white/10 transition-all duration-500">
        {/* Project visual */}
        <div
          className={`relative h-64 md:h-80 bg-gradient-to-br ${project.bgColor} overflow-hidden`}
        >
          {/* Abstract visual placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Geometric decoration based on category */}
              <div
                className="w-32 h-32 rounded-full opacity-20 animate-pulse"
                style={{ background: project.accent, filter: 'blur(20px)' }}
              />
              <div
                className="absolute inset-0 w-32 h-32 rounded-full border-2 opacity-30 animate-spin-slow"
                style={{ borderColor: project.accent }}
              />
              <div className="absolute inset-6 w-20 h-20 rounded-2xl border opacity-40 rotate-45"
                style={{ borderColor: project.accent }} />
            </div>
          </div>

          {/* Year badge */}
          <div className="absolute top-5 right-5">
            <span className="font-mono text-xs text-white/50 glass px-3 py-1 rounded-full border border-white/10">
              {project.year}
            </span>
          </div>

          {/* Category pill */}
          <div className="absolute top-5 left-5">
            <span
              className="font-mono text-[10px] font-medium px-3 py-1 rounded-full tracking-wider uppercase"
              style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}40` }}
            >
              {project.category}
            </span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium text-white border border-white/20 glass hover:border-white/40 transition-all duration-300"
              style={{ color: project.accent, borderColor: `${project.accent}40` }}
            >
              View Case Study
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-gradient-violet transition-all duration-300">
            {project.title}
          </h3>
          <p className="font-body text-sm text-white/50 leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="font-mono text-[10px] text-white/30 border border-white/8 rounded-full px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-5%'])

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400 uppercase">Featured Work</span>
            <span className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent max-w-xs" />
          </motion.div>

          <motion.h2
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-fluid-xl font-bold leading-tight text-white max-w-3xl"
          >
            Projects that{' '}
            <span className="text-gradient-fire">challenge</span>{' '}
            the expected
          </motion.h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <button className="magnetic group inline-flex items-center gap-4 font-body text-white/50 hover:text-white transition-colors duration-300">
            <span>View all projects</span>
            <span className="w-10 h-px bg-current transition-all duration-300 group-hover:w-16" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
