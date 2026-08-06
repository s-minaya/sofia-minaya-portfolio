# Tech stack

## Tecnologías

- **Lenguaje:** JavaScript (ES6+), JSX. Sin TypeScript.
- **Framework / build:** React 19 + Vite 7
- **Estilos:** SASS/SCSS con BEM. Los componentes externos de React Bits mantienen su `.css` plano (no se reescriben a BEM).
- **Animación:** GSAP 3
- **WebGL:** OGL (fondo iridiscente del hero y partículas)
- **Iconos:** Lucide React, React Icons
- **Componentes externos:** React Bits — `Iridescence`, `Particles`, `LogoLoop`, `MagicBento`, `ScrollIndicator`, `Folder` (este último sin contenido todavía, pendiente de material para la feature 001).
- **Enrutado:** Pendiente. Previsto para la feature 001 (páginas de detalle por carpeta), pero `react-router-dom` no está en `package.json` ni se usa en el código todavía.
- **Tests:** Pendiente.
- **Despliegue:** GitHub Pages, vía `gh-pages` (`npm run deploy`).

## Archivos / módulos clave

- `src/components/` — componentes de UI, uno por carpeta con su `.scss`/`.css` al lado.
- `src/components/ui/` — componentes de React Bits.
- `src/config/` — constantes de configuración (navegación, contactos, valores por defecto de las visuales/partículas). Hoy es donde vive la configuración estática; no confundir con `src/data/`.
- `src/hooks/` — hooks compartidos (estado del menú, detección de móvil, loader, máquina de escribir).
- `src/data/` — datos estáticos del sitio (proyectos, carpetas). **Todavía no existe.** Hoy los proyectos son un array `PROJECTS` definido directamente en `src/components/Work/Work.jsx`; migrarlo a `src/data/` es parte de la feature 001.
- `src/styles/App.scss` — reset global, tokens de diseño (bloque `:root`) y estilos propios de `App.jsx` (layout general, `.app-container`, `.app-sections`, `.menu-bg-layer`).
- `src/styles/_breakpoints.scss` — único otro archivo en `src/styles/`: variables SASS de los breakpoints, fuente única de verdad para todos los `@media` del proyecto.
- `src/components/Work/Work.jsx` — sección "Selected works" y carrusel horizontal con animación de rebobinado (`requestAnimationFrame`).
- `src/components/Loader/PageLoader.jsx` — loader con efecto máquina de escribir (usa `src/hooks/usePageLoader.js` y `src/hooks/useTypewriter.js`).
- `src/components/ui/Iridescence/Iridescence.jsx` — shader iridiscente del hero.

## Modelo de datos

- **Estado actual:** no existe todavía. Los proyectos son un array plano `PROJECTS` (con `id`, `title`, `url`, `image`, `tags`) definido dentro de `src/components/Work/Work.jsx`.
- **Objetivo (feature 001), aún sin implementar:**
  - `projects` — un proyecto existe **una sola vez**, aunque pertenezca a varias carpetas.
  - `projectFolders` — cada carpeta referencia proyectos por `id`; el orden del array `projectIds` **es** el orden de pantalla.
  - El número de proyectos de una carpeta siempre se deriva de `projectIds.length`. Nunca se hardcodea.
  - Detalle completo de los campos: `spec/features/001-selected-works-carpetas/plan.md` (todavía no creado; se escribirá al arrancar esa feature).

## Estilo visual

- **Tokens de color** (definidos como custom properties CSS en `:root`, `src/styles/App.scss` — no hay variables SASS `$` para esto):
  - `--color-bg-dark: #000000`
  - `--color-bg-loader: #1e1e1e`
  - `--color-text-primary: #ffffff`
  - `--color-text-muted: rgba(255, 255, 255, 0.45)`
  - `--color-cursor: rgba(255, 255, 255, 0.7)`
  - `--glow-color: 128, 153, 204` (+ `--glow-x`, `--glow-y`, `--glow-intensity`, `--glow-radius` — tokens del efecto glow de MagicBento)
- **Tipografías** (mismo `:root`, cargadas vía Google Fonts en `index.html`):
  - `--font-main: "Geist", sans-serif` — pesos 400/500/600.
  - `--font-japanese: "Noto Sans JP", sans serif` — peso 500, uso puntual (About).
  - Pesos con nombre: `--font-weight-regular: 400`, `--font-weight-medium: 500`, `--font-weight-semibold: 600`.
  - Tamaños fluidos con `clamp()`: `--font-size-hero-title`, `--font-size-hero-subtitle`, `--font-size-hero-description`, `--font-size-loader-text`, `--font-size-nav-items`.
- **Breakpoints:** centralizados en `src/styles/_breakpoints.scss` (variables SASS `$xs`/`$sm`/`$md`/`$lg`/`$xl`/`$xxl`/`$xxxl` — 375/640/768/1024/1200/1280/1600px). Mobile-first estricto: todo `@media` del proyecto es `(min-width: ...)`, sin `max-width` ni pares de números que mantener sincronizados a mano. Cada componente que usa breakpoints importa el partial con `@use "../../styles/breakpoints" as bp;`.
- **Rango responsive soportado:** 320px – 1920px.
- **Motion:** el movimiento da carácter, nunca a costa de la legibilidad. Toda animación tiene su variante reducida.
