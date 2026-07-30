# rlases — Portafolio

Portafolio personal de Jhunier Hernandez Calderon ([@riassd](https://github.com/riassd)),
construido con React + Vite y publicado en GitHub Pages bajo dominio propio.

🔗 **https://rlases.dev/**

## Stack técnico

- **React 19 + Vite 8** — base del proyecto, con `vite-plugin-pwa` para el service worker.
- **Framer Motion** — animaciones de entrada, tilt 3D y transiciones entre estados.
- **GSAP + Lenis** — smooth scroll y scroll-linked animations.
- **@react-three/fiber + drei + three** — escena 3D (`NetworkSphere`).
- **cmdk** — Command Palette (`⌘K`).
- **sonner** — notificaciones toast.
- **@react-pdf/renderer** — generación del CV en PDF en el cliente.
- **canvas-confetti** — celebraciones visuales (Konami Code, logros).
- **react-icons** — iconografía (Tabler, Simple Icons, Font Awesome).
- **oxlint** — linting.

## Funcionalidades

- **Command Palette** (`⌘K` / `Ctrl+K`) para navegar, abrir proyectos, enlaces y herramientas sin usar el mouse.
- **Terminal interactiva** (`` Ctrl+` `` o botón `>_`) con comandos tipo shell (`whoami`, `skills`, `experience`, `projects`, `certs`, `contact`, etc.).
- **Sistema de logros** desbloqueables, persistidos en `localStorage` y visibles desde el Command Palette ("Ver logros").
- **Tarjeta de contacto 3D** con efecto holográfico al mover el cursor y una cara trasera oculta con una mini terminal.
- **CV descargable en PDF** y **contacto guardable como .vcf**, generados en el cliente.
- **PWA instalable**, con soporte offline básico vía service worker.
- **Reloj en vivo** y estado de disponibilidad en la sección de contacto.

### 🥚 Easter eggs

El sitio tiene 8 logros escondidos para descubrir explorando:

| Logro | Cómo se activa |
|---|---|
| ⌨️ Power user | Abrir el Command Palette (`⌘K` / `Ctrl+K`) |
| 💻 Hacker de terminal | Abrir la terminal interactiva |
| 🔓 Protocolo activado | Ejecutar `sudo hire-me` en la terminal |
| 🕹️ Modo desarrollador | El Konami Code (`↑ ↑ ↓ ↓ ← → ← → B A`) en cualquier parte del sitio |
| 📄 Reclutador | Descargar el CV en PDF |
| 📇 Networking | Guardar el contacto como `.vcf` |
| 📲 Coleccionista de apps | Instalar el sitio como PWA |
| 🎴 Carta volteada | Voltear la tarjeta de contacto y encontrar la terminal secreta |

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue

El workflow en `.github/workflows/deploy.yml` construye y publica el sitio en
GitHub Pages automáticamente en cada push a `main`. Solo hace falta activar
Pages una vez en el repo: **Settings → Pages → Source → GitHub Actions**.

## Estructura del proyecto

```
src/
  components/   # Secciones y widgets de la UI (Hero, Contact, Terminal, ContactCard, ...)
  data/         # Contenido editable: perfil, proyectos, certificaciones, logros
  hooks/        # Lógica reutilizable: tilt 3D, spotlight, achievements, PDF, vCard...
  pdf/          # Plantilla del CV en PDF
```

## Editar contenido

- `src/data/profile.js` — nombre, rol, bio, skills y enlaces de contacto.
- `src/data/projects.js` — proyecto destacado (ControllerNAV) y tarjetas de
  próximos proyectos.
- `src/data/unlockables.js` — logros/easter eggs disponibles.

## Notas

El sitio se publica en el dominio propio `rlases.dev` (configurado vía el
archivo `CNAME` en `public/` + los registros DNS en el proveedor del
dominio), así que se sirve desde la raíz y `base` en `vite.config.js` es
`'/'`. Si alguna vez se quita el dominio propio, `base` debe volver a
`'/<nombre-del-repo>/'` para que coincida con la subruta por defecto de
GitHub Pages — si no, los assets dan 404 y la página se ve en blanco.
