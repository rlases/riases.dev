import { profile } from '../data/profile.js'
import BrandMark from './BrandMark.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <BrandMark className="footer-mark" aria-hidden="true" />
      <p>
        © {year} {profile.handle} — hecho con React + Vite, publicado con GitHub Pages.
      </p>
    </footer>
  )
}
