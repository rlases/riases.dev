import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SiCisco, SiGoogle } from 'react-icons/si'
import { BsMicrosoft } from 'react-icons/bs'
import { FaGraduationCap } from 'react-icons/fa6'
import { certifications } from '../data/profile.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'

const ICONS = {
  cisco: SiCisco,
  google: SiGoogle,
  microsoft: BsMicrosoft,
  university: FaGraduationCap,
}

const TONES = {
  cisco: 'cyan',
  google: 'orange',
  microsoft: 'blue',
  university: 'purple',
}

export default function Certifications() {
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const [dragRange, setDragRange] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return
      const overflow = trackRef.current.scrollWidth - viewportRef.current.clientWidth
      setDragRange(Math.max(overflow, 0))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewportRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.section
      id="certificaciones"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <div className="section-title-row">
        <motion.h2 variants={fadeUpItem} className="section-title glitch" data-text="Certificaciones">
          Certificaciones
        </motion.h2>
        {dragRange > 0 && (
          <motion.p variants={fadeUpItem} className="drag-hint">
            ← arrastra →
          </motion.p>
        )}
      </div>
      <div ref={viewportRef} className="cert-viewport">
        <motion.div
          ref={trackRef}
          className="cert-track"
          drag={dragRange > 0 ? 'x' : false}
          dragConstraints={{ left: -dragRange, right: 0 }}
          dragElastic={0.12}
          variants={staggerContainer(0.05)}
        >
          {certifications.map((cert) => {
            const Icon = ICONS[cert.icon] ?? FaGraduationCap
            const tone = TONES[cert.icon] ?? 'blue'
            return (
              <motion.div key={cert.name} variants={fadeUpItem} className={`cert-card cert-card--${tone}`}>
                <div className="cert-icon">
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <p className="cert-name">{cert.name}</p>
                  <p className="cert-meta">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}
