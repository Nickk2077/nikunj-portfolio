'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const socialLinks = [
  { label: 'Behance', href: 'https://behance.net/', icon: 'Be' },
  { label: 'Dribbble', href: 'https://dribbble.com/', icon: 'Dr' },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'Li' },
  { label: 'Instagram', href: 'https://instagram.com/', icon: 'Ig' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', project: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
  }

  const inputClass = "w-full bg-transparent border-b border-white/10 py-4 text-white font-body text-sm placeholder-white/25 focus:outline-none focus:border-violet-500/60 transition-colors duration-300"

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-void" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-violet-950/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: CTA text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="font-mono text-xs tracking-[0.3em] text-violet-400 uppercase">Let&apos;s Connect</span>
              <span className="flex-1 h-px bg-gradient-to-r from-violet-500/50 to-transparent max-w-xs" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-fluid-xl font-bold leading-tight text-white mb-8"
            >
              Ready to build something{' '}
              <span className="text-gradient-violet">extraordinary?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-white/50 text-base leading-relaxed mb-12 max-w-md"
            >
              Whether you have a detailed brief or just an idea — let&apos;s talk.
              I collaborate with brands, studios, and startups to create work that matters.
            </motion.p>

            {/* Direct contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 mb-12"
            >
              <a href="mailto:hello@nikunjzapadiya.com" className="group flex items-center gap-4 hover:opacity-80 transition-opacity">
                <span className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-violet-400 text-xs font-mono group-hover:border-violet-500/40 transition-all">@</span>
                <div>
                  <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest">Email</p>
                  <p className="font-body text-sm text-white/70">hello@nikunjzapadiya.com</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-cyan-400 text-xs font-mono">↗</span>
                <div>
                  <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest">Based in</p>
                  <p className="font-body text-sm text-white/70">Gujarat, India · Available Worldwide</p>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-4">Find me on</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass border border-white/8 flex items-center justify-center font-mono text-xs text-white/40 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300"
                    data-cursor-hover
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-3xl p-8 md:p-10 border border-white/6">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-8 h-8">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">Message sent!</h3>
                  <p className="font-body text-white/50 text-sm">I&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <select
                      value={formData.project}
                      onChange={e => setFormData(p => ({ ...p, project: e.target.value }))}
                      className={`${inputClass} bg-transparent`}
                      required
                    >
                      <option value="" disabled className="bg-obsidian">Project type</option>
                      <option value="branding" className="bg-obsidian">Graphic Design / Branding</option>
                      <option value="motion" className="bg-obsidian">Motion Graphics</option>
                      <option value="video" className="bg-obsidian">Video Editing</option>
                      <option value="uiux" className="bg-obsidian">UI/UX Design</option>
                      <option value="3d" className="bg-obsidian">3D Design</option>
                      <option value="other" className="bg-obsidian">Something else</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      required
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="magnetic w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium text-sm tracking-wide hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] transition-shadow duration-400 disabled:opacity-70 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {sending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>

                  <p className="font-mono text-[10px] text-white/20 text-center">
                    No spam. Your information stays private.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
