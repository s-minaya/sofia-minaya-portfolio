# 001 · Selected Works — carpetas de proyectos — Tareas

> **Cómo se trabaja:** una tarea cada vez. Implementar, enseñar el resultado, esperar confirmación, siguiente. No encadenar la fase entera.
>
> **🔒 = bloqueada.** No se empieza ni se aproxima hasta que llegue el material o la decisión que indica.
>
> `npm run build` y `npm run deploy` solo con permiso explícito de Sofía.

## Fase 1 — Datos

- [x] Volcar `PROJECTS` de `Work.jsx` a una tabla legible: id, title, url, image, tags. Marcar explícitamente qué falta.
- [x] Comprobar que los 20 proyectos de la spec existen en `PROJECTS`. Listar los que no aparezcan y **preguntar**.
- [x] Proponer los `id` en kebab-case y esperar aprobación.
- [x] Proponer la tabla `etiqueta actual → etiqueta nueva` y esperar aprobación. Ninguna etiqueta nueva puede juzgar la calidad del proyecto.
- [x] 🔒 Confirmar con Sofía el orden de relevancia de la carpeta 5 antes de escribirlo.
- [x] Crear `src/data/projects.js` con el modelo del plan. `description` y `repoUrl` a `null`; **sin inventar contenido**.
- [x] Crear `src/data/projectFolders.js` con las 5 carpetas y sus `projectIds` en el orden de la spec.
- [x] Añadir el guard de integridad: un `projectId` inexistente falla de forma visible en desarrollo.
- [x] Verificar que ningún proyecto está duplicado en los datos pese a las repeticiones entre carpetas.
- [x] `Work.jsx` importa desde `src/data/` y ya no define `PROJECTS`. Sin ningún otro cambio en el archivo; la sección se ve exactamente igual que antes.

## Fase 2 — Rutas

- [x] Instalar `react-router-dom` (única dependencia nueva aprobada).
- [x] Montar `HashRouter` y definir la ruta de detalle por `slug` + fallback para slug inexistente.
- [x] Comprobar que la navegación por secciones de la home no se rompe: el `#` ya se usaba para las anclas.
- [x] Verificar que `PageLoader`, el scroll suave y las animaciones GSAP siguen funcionando igual.
- [ ] Probar recarga directa de una URL de detalle en el entorno de Pages, no solo en local.

## Fase 3 — Componente `ProjectFolder`

- [x] Portar el markup a JSX con props: `title`, `count`, `previewImages`, `to`, `defaultOpen`.
- [x] Traducir el estilo a `ProjectFolder.scss` con BEM. Cero clases de Tailwind/HTML/CSS. Tokens `--color-*` y `--font-*` de `:root` donde existan. Crear nuevas si es necesario.
- [x] Listar las medidas fijas en px del snippet original y proponer cuáles pasar a relativas para el responsive. Esperar confirmación antes de aplicarlo.
- [x] Comparar lado a lado con el original: colores, tamaños, sombras, curva y duración de la animación.
- [x] Título en negrita bajo la carpeta.
- [x] Contador dinámico desde `projectIds.length`, con singular y plural.
- [x] Las tres páginas usan las imágenes de los tres primeros proyectos de la carpeta.
- [x] Apertura al hover **y** al foco por teclado.
- [x] `defaultOpen` activo solo en Destacados.
- [x] Elemento interactivo real (`<Link>`), no un `div` con `onClick`. Nombre accesible completo.

## Fase 4 — Carrusel

- [x] Leer cómo calcula `Work.jsx` el ancho de sus elementos **antes** de meter nada dentro. Reportar qué asume.
- [x] Sustituir las tarjetas por las 5 carpetas.
- [x] Elementos visibles: 1 base / 2 desde `$md` / 3 desde `$lg` / 4 desde `$xxl`. Todo `min-width`, importando `_breakpoints.scss`.
- [x] 🔒 Confirmar con Sofía el breakpoint de las 4 carpetas viendo el ancho real; subir a `$xxxl` si se aprietan. **Resuelto:** en desktop grande las 4 carpetas visibles llenan el ancho disponible (`flex: 0 0 calc(25% - 21px)` desde `$xxl`) y la 5ª queda scrollable.
- [x] Verificar que la animación de rebobinado sigue funcionando.
- [x] 🔒 Decidir con Sofía el comportamiento en táctil (sin hover) y aplicarlo. **Decidido:** sin hover en táctil, el toque navega directo al detalle; Destacados ya abre por `defaultOpen`.
- [x] Comprobar que no hay scroll horizontal no intencionado entre 320px y 1920px.

## Fase 5 — Página de detalle

- [x] Estructura base: enlace de vuelta visible, `<h1>` con el título, descripción de la carpeta.
- [ ] 🔒 Bloqueada hasta recibir las descripciones de las carpetas 1–4.
- [x] 🔒 Bloqueada hasta recibir el código del componente bento. **Material recibido** (Sofía lo dejó en `src/components/ui/BentoDemo/BentoDemo.tsx`).
- [x] Adaptar el bento a los proyectos reales, en el orden de `projectIds`.
- [x] Eliminar todo el contenido de ejemplo del componente original.
- [x] Campos en `null` no pintan nada: sin descripción no hay párrafo, sin `url` o `repoUrl` no hay botón. Cero `href="#"`.
- [x] Enlaces externos con `rel="noopener noreferrer"`.

## Fase 6 — Calidad

- [x] Hook propio que actualiza `<title>` y `<meta name="description">` por vista de detalle. Sin dependencias nuevas.
- [x] Recorrido completo con teclado; foco visible en todo momento.
- [x] Un solo `<h1>` por vista; jerarquía de encabezados coherente.
- [x] `alt` descriptivo en imágenes de proyecto; `alt=""` en las decorativas.
- [x] `loading="lazy"` salvo en lo visible al cargar.
- [x] `prefers-reduced-motion: reduce` desactiva apertura y movimiento automático.
- [x] Contraste mínimo 4.5:1 sobre `--color-bg-dark`.

## Cierre

- [ ] Pedir permiso y ejecutar `npm run build` y `npm run lint`: sin errores nuevos.
- [ ] Validar una a una las casillas de `001-spec.md`.
- [ ] Corregir `tech-stack.md`: `ProjectFolder` no es de React Bits sino un snippet de uiverse.io adaptado; `src/data/` ya existe; el enrutado ya no está pendiente (`HashRouter`); la nota sobre `PROJECTS` en `Work.jsx` deja de ser cierta.
- [ ] Actualizar el README del portfolio: la sección Work ya no es una lista de proyectos.
- [ ] Mover la feature a "Hecho" en `../../constitution/roadmap.md`.

## Mantenimiento

- [ ] Al publicar Accept All Cookies o Tech Jobs Dashboard: sustituir el placeholder por el proyecto real (datos + imagen) y comprobar las previews de la carpeta Destacados.
- [ ] Al rellenar `description` o `repoUrl`: comprobar que el bento los pinta bien y que el enlace nuevo tiene `rel="noopener noreferrer"`.
- [ ] Al añadir un proyecto nuevo: darle `id`, meterlo en `projects.js` y añadir su `id` a la carpeta que toque, en la posición de relevancia que le corresponda.
