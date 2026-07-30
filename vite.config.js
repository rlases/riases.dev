import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Served from the custom domain rlases.dev (configured via the `CNAME`
// file in public/), so the site lives at the domain root — base must
// stay '/'. If the custom domain is ever removed, switch back to
// '/<repo-name>/' to match GitHub Pages' default project-site subpath.
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      manifest: false, // manifest.webmanifest is hand-authored in public/
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        globIgnores: ['**/rlases-brand-kit/**'],
        navigateFallbackDenylist: [/^\/?og-image\.png$/],
      },
    }),
  ],
})
