import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TbTerminal2 } from 'react-icons/tb'
import { profile, certifications } from '../data/profile.js'
import { downloadVCard } from '../hooks/useVCard.js'
import { useTilt } from '../hooks/useTilt.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import { unlockAchievement } from '../hooks/useAchievements.js'
import BrandMark from './BrandMark.jsx'

const TERMINAL_LINES = [
  { prompt: 'whoami', output: profile.handle },
  { prompt: 'cat rol.txt', output: profile.role },
  { prompt: 'locate --user', output: profile.location },
  { prompt: 'status --check', output: '🟢 Disponible' },
]

const terminalContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const terminalLine = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0 },
}

export default function ContactCard() {
  const [flipped, setFlipped] = useState(false)
  const tilt = useTilt()
  const spotlight = useSpotlight()

  useEffect(() => {
    if (flipped) unlockAchievement('card-flip')
  }, [flipped])

  const handleMouseMove = (e) => {
    tilt.onMouseMove(e)
    spotlight.onMouseMove(e)
  }

  return (
    <motion.div
      className="contact-card-scene"
      style={tilt.style}
      onMouseMove={handleMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <motion.div
        ref={spotlight.ref}
        className="contact-card"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setFlipped((f) => !f)}
        data-cursor="hover"
        role="button"
        tabIndex={0}
        aria-label="Voltear tarjeta de presentación"
        onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
      >
        <div className="contact-card-face contact-card-front">
          <div className="contact-card-stat">
            <b>{certifications.length}</b>
            <span>cert.</span>
          </div>
          <div className="contact-card-top">
            <span className="contact-card-avatar">
              <BrandMark className="contact-card-avatar-mark" />
            </span>
            <p className="contact-card-eyebrow">{profile.handle}.</p>
          </div>
          <div>
            <h3 className="contact-card-name">{profile.name}</h3>
            <p className="contact-card-role">{profile.role}</p>
          </div>
          <ul className="contact-card-tags">
            {profile.skillGroups.map((group) => (
              <li key={group.title} className={`contact-card-tag contact-card-tag--${group.tone}`}>
                <span className="contact-card-tag-dot" />
                {group.title}
              </li>
            ))}
          </ul>
          <div className="contact-card-footer">
            <p className="contact-card-location">{profile.location}</p>
            <span className="contact-card-hint">toca para voltear ↻</span>
          </div>
        </div>

        <div className="contact-card-face contact-card-back">
          <div className="contact-card-back-header">
            <TbTerminal2 className="contact-card-terminal-icon" aria-hidden="true" />
            <span>Acceso concedido</span>
          </div>
          <AnimatePresence>
            {flipped && (
              <motion.div
                className="contact-card-terminal"
                variants={terminalContainer}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {TERMINAL_LINES.map((line) => (
                  <motion.p key={line.prompt} variants={terminalLine} className="contact-card-terminal-line">
                    <span className="contact-card-terminal-prompt">$ {line.prompt}</span>
                    <span className="contact-card-terminal-output">{line.output}</span>
                  </motion.p>
                ))}
                <span className="contact-card-terminal-cursor" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="contact-card-back-actions">
            <a
              className="button button-ghost contact-card-linkedin-btn"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-cursor="hover"
            >
              Ver perfil
            </a>
            <button
              type="button"
              className="button button-primary contact-card-save"
              onClick={(e) => {
                e.stopPropagation()
                downloadVCard()
              }}
            >
              Guardar (.vcf)
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
