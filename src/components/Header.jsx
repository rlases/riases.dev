import { useActiveSection } from '../hooks/useActiveSection.js'
import { profile } from '../data/profile.js'

const LINKS = [
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'certificaciones', label: 'Certificaciones' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'skills', label: 'Skills' },
  { id: 'contacto', label: 'Contacto' },
]

export default function Header() {
  const active = useActiveSection(LINKS.map((l) => l.id))

  return (
    <header className="site-header">
      <a className="brand" href="#top" data-cursor="hover">
        {profile.handle}<span className="brand-dot">.</span>
      </a>
      <nav className="nav">
        {LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            data-cursor="hover"
            className={active === link.id ? 'nav-link nav-link--active' : 'nav-link'}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
