import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { unlockableAchievements } from '../data/unlockables.js'
import { useAchievements } from '../hooks/useAchievements.js'

export default function Achievements() {
  const [open, setOpen] = useState(false)
  const unlocked = useAchievements()

  useEffect(() => {
    const onOpenEvent = () => setOpen(true)
    window.addEventListener('open-achievements', onOpenEvent)
    return () => window.removeEventListener('open-achievements', onOpenEvent)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="achievements-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="achievements-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Logros desbloqueados"
          >
            <div className="achievements-header">
              <div className="achievements-title-group">
                <img
                  className="achievements-mark"
                  src="/rlases-brand-kit/png/08-icono-pastel-secundario@2x.png"
                  alt=""
                  aria-hidden="true"
                />
                <h3>Logros</h3>
              </div>
              <span className="achievements-count">
                {unlocked.length}/{unlockableAchievements.length}
              </span>
            </div>
            <ul className="achievements-list">
              {unlockableAchievements.map((item) => {
                const isUnlocked = unlocked.includes(item.id)
                return (
                  <li
                    key={item.id}
                    className={isUnlocked ? 'achievement achievement--unlocked' : 'achievement'}
                  >
                    <span className="achievement-icon" aria-hidden="true">
                      {isUnlocked ? item.icon : '🔒'}
                    </span>
                    <div>
                      <p className="achievement-name">{isUnlocked ? item.label : '???'}</p>
                      <p className="achievement-hint">{isUnlocked ? item.desc : 'Sigue explorando el sitio…'}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
