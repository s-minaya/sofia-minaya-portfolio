# 001 · Selected Works — carpetas de proyectos — Plan

## Enfoque

Tres capas, en este orden, porque cada una desbloquea la siguiente y la primera no depende de nada externo:

1. **Datos** — sacar `PROJECTS` de `src/components/Work/Work.jsx` a `src/data/`, y añadir la estructura de carpetas.
2. **Rutas** — `HashRouter` para dar URL propia a cada carpeta sin romper GitHub Pages.
3. **Componentes** — carpeta reutilizable dentro del carrusel existente, y página de detalle con bento.

El carrusel de `Work.jsx` se reutiliza tal cual: cambia lo que hay dentro, no el mecanismo.

## Punto de partida real

- Los proyectos son un array `PROJECTS` **dentro de `Work.jsx`**, con campos `id`, `title`, `url`, `image`, `tags`.
- **No hay descripciones ni `repoUrl`.** Se añaden al modelo como placeholder; los rellena Sofía después.
- `src/data/` **no existe todavía**; se crea en esta feature. No confundir con `src/config/`, que es configuración estática (navegación, contactos, visuales) y no se toca.
- `react-router-dom` **no está instalado**.
- El componente de carpeta viene de **uiverse.io**, normalmente en Tailwind o HTML y CSS. Se traduce a SASS/BEM y vive como componente propio en `src/components/ProjectFolder/`.

> `tech-stack.md` lista hoy `Folder` entre los componentes de React Bits. Es un error: hay que corregirlo al cerrar la feature (tarea en el cierre).

## Modelo de datos

```js
// src/data/projects.js
{
  id: 'animal-crossing-api',
  title: 'Animal Crossing API',
  description: null,        // placeholder — lo rellena Sofía
  tags: ['React', 'REST API'],
  image: '<de PROJECTS>',
  url: '<de PROJECTS | null>',   // demo
  repoUrl: null,            // placeholder — lo rellena Sofía
  status: 'published' | 'placeholder',
}

// src/data/projectFolders.js
{
  id: 'featured',
  slug: 'featured',
  title: 'Featured',
  description: '<copy de la carpeta>',
  projectIds: ['accept-all-cookies', 'tech-jobs-dashboard', '…'], // el orden ES el orden de pantalla
  defaultOpen: true, // solo Destacados
}
```

Reglas:
- Un proyecto existe una sola vez, aunque esté en dos carpetas.
- El contador se deriva de `projectIds.length`. Nunca se hardcodea.
- Las tres páginas que asoman al abrir la carpeta usan las imágenes de los **tres primeros** proyectos de `projectIds`.
- Un campo en `null` es un placeholder consciente: la UI no lo pinta y **el agente no lo rellena**.

## Implementación

1. **Inventario** — volcar `PROJECTS` a una tabla (id, title, url, image, tags) y marcar qué falta para cada carpeta. Sin rellenar huecos.
2. **Mapeo de etiquetas** — tabla `etiqueta actual → etiqueta nueva`, a aprobar antes de aplicar.
3. `src/data/projects.js` — los 20 proyectos normalizados, con los ids acordados.
4. `src/data/projectFolders.js` — las 5 carpetas con sus `projectIds`.
5. **Guard de integridad** — en desarrollo, todo `projectId` referenciado debe existir; si no, error visible.
6. `Work.jsx` — importar desde `src/data/` y eliminar el array local. Nada más de `Work.jsx` cambia en este paso.
7. **Rutas** — instalar `react-router-dom`, montar `HashRouter`, definir la ruta de detalle por `slug` y un fallback para slug inexistente.
8. **`ProjectFolder`** — portar el markup de uiverse.io a JSX con props `title`, `count`, `previewImages`, `to`, `defaultOpen`, y el estilo a `ProjectFolder.scss` con BEM.
9. **Integración en el carrusel** — sustituir las tarjetas por las 5 carpetas y ajustar los elementos visibles por breakpoint.
10. **Página de detalle** — enlace de vuelta, `<h1>`, descripción, bento con los proyectos. Hasta que llegue el bento, lista semántica provisional marcada como provisional.
11. **SEO por vista** — hook propio que actualiza `<title>` y `<meta description>` al montar. Sin instalar nada.
12. **Repaso** — foco, nombres accesibles, `prefers-reduced-motion`, contraste, `alt`.
13. **Validación** — pedir permiso y correr `npm run build` y `npm run lint`.

## Decisiones

- **`HashRouter` en vez de `BrowserRouter`** — GitHub Pages sirve estáticos: con `BrowserRouter`, entrar directo o recargar en una ruta de detalle da 404. `HashRouter` lo evita sin tocar el despliegue ni añadir un `404.html` con redirección. Se acepta la URL con `#` y un SEO más flojo en las vistas de detalle; la home, que es lo que más se comparte, no cambia.
- **Datos fuera del componente** — hoy `PROJECTS` vive en `Work.jsx`, lo que obliga a tocar la vista para cambiar contenido y hace imposible que un proyecto esté en dos carpetas sin duplicarlo. Sacarlo a `src/data/` es requisito, no limpieza opcional.
- **Un componente con props, no cinco variantes** — es el encargo, y evita que cinco copias se desincronicen al retocar el estilo.
- **`ProjectFolder` como componente propio con SASS/BEM** — viene de uiverse.io, que son snippets que se copian y adaptan, no una librería vendorizada. La excepción de `.css` plano de `tech-stack.md` es para React Bits y aquí no aplica.
- **Traducción del estilo, no reinterpretación** — el objetivo es que no se note el cambio de Tailwind/HTML/CSS. Cualquier "mejora" visual es un bug de esta feature.
- **Carrusel reutilizado** — la animación de rebobinado ya funciona y es de lo que mejor está. Se cambia el contenido, no el mecanismo.
- **Destacados abierta al montar** — quien llega con prisa ve proyectos buenos sin un solo clic. Única carpeta con `defaultOpen`.
- **Orden por relevancia en las cinco carpetas** — un único criterio es más fácil de mantener y de explicar que mezclar relevancia con cronología.
- **Honestidad a nivel de carpeta, no de tarjeta** — la frase sobre los primeros proyectos aparece una vez, en la descripción de la carpeta 5. Repetida en cada etiqueta convertía el matiz en ruido negativo.
- **Tokens CSS, no variables SASS, para color y tipografía** — en este proyecto los tokens son custom properties en `:root` de `App.scss`; las variables SASS `$` son solo para breakpoints. El componente nuevo sigue esa separación.

## Riesgos

- **La traducción del estilo se desvía del original** — mitigación: comparar lado a lado con el snippet de uiverse.io renderizado antes de dar la tarea por buena, revisando en concreto curva y duración de la animación.
- **El snippet de uiverse.io asume tamaños fijos en px** — es lo habitual en esos componentes. Mitigación: identificar qué medidas deben volverse relativas para que la carpeta funcione de 320px a 1920px, proponerlas y confirmarlas antes de aplicarlas, en vez de escalar a ojo. Utilizar rem en lugar de px en la medida de lo posible.
- **El carrusel asume un ancho de tarjeta que la carpeta no cumple** — la carpeta abierta con tres páginas ocupa distinto que una tarjeta de proyecto. Mitigación: leer los cálculos del carrusel **antes** de meter nada; si asume ancho fijo, parametrizarlo por breakpoint en vez de deformar la carpeta.
- **`HashRouter` choca con el scroll suave o con anclas existentes** — el `#` ya se usa para navegar entre secciones de la home. Mitigación: montar el router en un paso aislado y verificar que la navegación por secciones, el `PageLoader` y las animaciones GSAP siguen funcionando antes de continuar.
- **Sacar `PROJECTS` de `Work.jsx` rompe la sección** — mitigación: paso 6 aislado, sin ningún otro cambio, verificando que la sección se ve igual que antes con los datos ya fuera.
- **Faltan datos y el agente los rellena** — no hay descripciones ni repos. Mitigación: paso 1 es un inventario que hace visibles los huecos, `null` significa placeholder, y las puertas 🔒 de `001-tasks.md`.
