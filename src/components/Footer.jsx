import { profile } from '../data/profile.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <p>
        © {year} {profile.handle} — hecho con React + Vite, publicado con GitHub Pages.
      </p>
    </footer>
  )
}
