import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, experience, certifications } from '../data/profile.js'
import { featuredProject, otherProjects } from '../data/projects.js'
import { unlockAchievement } from '../hooks/useAchievements.js'

const ALL_PROJECTS = [featuredProject, ...otherProjects]

const HELP_LINES = [
  'Comandos disponibles:',
  '  help          — muestra esta ayuda',
  '  whoami        — quién soy',
  '  about         — bio corta',
  '  skills        — stack técnico',
  '  experience    — experiencia profesional',
  '  projects      — proyectos destacados',
  '  certs         — certificaciones',
  '  contact       — cómo contactarme',
  '  sudo hire-me  — ejecuta el protocolo de contratación',
  '  clear         — limpia la pantalla',
  '  exit          — cierra la terminal',
]

function runCommand(raw) {
  const cmd = raw.trim()
  const lower = cmd.toLowerCase()

  if (lower === '' ) return []
  if (lower === 'help') return HELP_LINES
  if (lower === 'whoami') return [`${profile.handle} — ${profile.role}`]
  if (lower === 'about' || lower === 'bio') return [profile.bio]
  if (lower === 'skills') {
    return profile.skillGroups.flatMap((group) => [
      `${group.title}:`,
      `  ${group.skills.join(', ')}`,
    ])
  }
  if (lower === 'experience' || lower === 'exp') {
    return experience.flatMap((item) => [`${item.period}  ${item.role} @ ${item.org}`])
  }
  if (lower === 'projects' || lower === 'ls') {
    return ALL_PROJECTS.map((p) => `${p.index}  ${p.name} — ${p.tagline}`)
  }
  if (lower === 'certs' || lower === 'certifications') {
    return certifications.map((c) => `${c.date}  ${c.name} (${c.issuer})`)
  }
  if (lower === 'contact') {
    return [
      `Email:    ${profile.links.email}`,
      `GitHub:   ${profile.links.github}`,
      `LinkedIn: ${profile.links.linkedin}`,
    ]
  }
  if (lower === 'sudo hire-me') {
    return [
      `[sudo] password for ${profile.handle}: ********`,
      'Verificando credenciales… OK',
      'Ejecutando protocolo de contratación…',
      '✔ Disponibilidad confirmada',
      '✔ Interés en ciberseguridad confirmado',
      `→ Escribe a ${profile.links.email} para continuar.`,
    ]
  }
  if (lower === 'date') return [new Date().toString()]
  if (lower.startsWith('echo ')) return [cmd.slice(5)]
  if (lower === 'sudo' ) return ['sudo: se requiere un comando. prueba "sudo hire-me"']

  return [`command not found: ${cmd}`, 'escribe "help" para ver los comandos disponibles']
}

function TerminalWindow({ open, onClose }) {
  const [lines, setLines] = useState([
    { type: 'system', text: `${profile.handle}-terminal v1.0.0 — escribe "help" para empezar` },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      unlockAchievement('terminal')
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [lines])

  const submit = (e) => {
    e.preventDefault()
    const cmd = input
    if (cmd.trim().toLowerCase() === 'clear') {
      setLines([])
      setInput('')
      return
    }
    if (cmd.trim().toLowerCase() === 'exit') {
      onClose()
      return
    }

    if (cmd.trim().toLowerCase() === 'sudo hire-me') unlockAchievement('hire-me')

    const output = runCommand(cmd)
    setLines((prev) => [
      ...prev,
      { type: 'input', text: cmd },
      ...output.map((text) => ({ type: 'output', text })),
    ])
    if (cmd.trim()) setHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)
    setInput('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex])
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex])
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="terminal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="terminal-window"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Terminal interactiva"
          >
            <div className="terminal-titlebar">
              <span className="terminal-dot terminal-dot--red" />
              <span className="terminal-dot terminal-dot--yellow" />
              <span className="terminal-dot terminal-dot--green" />
              <span className="terminal-titlebar-label">{profile.handle}@portfolio: ~</span>
            </div>
            <div
              className="terminal-body"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div key={i} className={`terminal-line terminal-line--${line.type}`}>
                  {line.type === 'input' ? <span className="terminal-prompt">$ </span> : null}
                  {line.text}
                </div>
              ))}
              <form className="terminal-input-row" onSubmit={submit}>
                <span className="terminal-prompt">$</span>
                <input
                  ref={inputRef}
                  className="terminal-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  aria-label="Comando de terminal"
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Terminal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === '`' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    const onOpenEvent = () => setOpen(true)

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('open-terminal', onOpenEvent)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('open-terminal', onOpenEvent)
    }
  }, [])

  return (
    <>
      <button
        type="button"
        className="terminal-trigger"
        onClick={() => setOpen(true)}
        data-cursor="hover"
        aria-label="Abrir terminal"
      >
        <span aria-hidden="true">&gt;_</span>
      </button>
      <TerminalWindow open={open} onClose={() => setOpen(false)} />
    </>
  )
}
