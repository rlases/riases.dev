import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { featuredProject, otherProjects } from '../data/projects.js'
import { useScrambleText } from '../hooks/useScrambleText.js'
import { fadeUpItem, staggerContainer, viewport } from '../motion.js'
import MagneticButton from './MagneticButton.jsx'

const ALL_PROJECTS = [featuredProject, ...otherProjects]
const TONES = ['blue', 'purple', 'pink', 'green', 'cyan', 'orange']

function ProjectRow({ project, tone, isOpen, onToggle }) {
  const links = project.links ?? (project.repoUrl ? [{ label: 'Repositorio', url: project.repoUrl }] : [])
  const previewTech = project.tech.slice(0, 3)
  const extraTech = project.tech.length - previewTech.length

  return (
    <motion.div variants={fadeUpItem} className={`proj-row proj-row--${tone}`} data-open={isOpen}>
      <button
        type="button"
        className="proj-row-header"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-cursor="hover"
      >
        <span className="proj-row-index">{project.index}</span>
        <div className="proj-row-heading">
          <h3 className="proj-row-name">
            {project.name}
            {project === featuredProject && <span className="proj-row-badge">Destacado</span>}
          </h3>
          <p className="proj-row-tagline">{project.tagline}</p>
        </div>
        <ul className="proj-row-tech" aria-hidden="true">
          {previewTech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {extraTech > 0 && <li className="proj-row-tech-more">+{extraTech}</li>}
        </ul>
        <span className="proj-row-chevron" aria-hidden="true">
          &#8595;
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="proj-row-content"
          >
            <div className="proj-row-content-inner">
              {project.description && <p className="proj-row-description">{project.description}</p>}
              {project.highlights && (
                <ul className="proj-row-highlights">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <ul className="proj-row-alltech">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="proj-row-actions">
                {project.private ? (
                  <span className="badge-private">Repositorio privado</span>
                ) : (
                  links.map((link) => (
                    <MagneticButton
                      key={link.url}
                      className="button button-ghost"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </MagneticButton>
                  ))
                )}
                {project.releasesUrl && (
                  <MagneticButton
                    className="button button-ghost"
                    href={project.releasesUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Descargas
                  </MagneticButton>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Projects() {
  const scramble = useScrambleText('Proyectos')
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <motion.section
      id="proyectos"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={staggerContainer(0.1)}
    >
      <motion.h2
        variants={fadeUpItem}
        className="section-title"
        onMouseEnter={scramble.onMouseEnter}
        onMouseLeave={scramble.onMouseLeave}
      >
        {scramble.display}
      </motion.h2>
      <motion.div variants={staggerContainer(0.06)} className="proj-list">
        {ALL_PROJECTS.map((project, i) => (
          <ProjectRow
            key={project.name}
            project={project}
            tone={TONES[i % TONES.length]}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </motion.div>
    </motion.section>
  )
}
