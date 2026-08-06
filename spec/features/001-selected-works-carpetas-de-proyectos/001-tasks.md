# 001 · Selected Works — carpetas de proyectos — Tareas

> **Cómo se trabaja:** una tarea cada vez. Implementar, enseñar el resultado, esperar confirmación, siguiente. No encadenar la fase entera.
>
> **🔒 = bloqueada.** No se empieza ni se aproxima hasta que llegue el material o la decisión que indica.
>
> `npm run build` y `npm run deploy` solo con permiso explícito de Sofía.

## Fase 1 — Datos

- [ ] Volcar `PROJECTS` de `Work.jsx` a una tabla legible: id, title, url, image, tags. Marcar explícitamente qué falta.
- [ ] Comprobar que los 20 proyectos de la spec existen en `PROJECTS`. Listar los que no aparezcan y **preguntar**.
- [ ] Proponer los `id` en kebab-case y esperar aprobación.
- [ ] Proponer la tabla `etiqueta actual → etiqueta nueva` y esperar aprobación. Ninguna etiqueta nueva puede juzgar la calidad del proyecto.
- [ ] 🔒 Confirmar con Sofía el orden de relevancia de la carpeta 5 antes de escribirlo.
- [ ] Crear `src/data/projects.js` con el modelo del plan. `description` y `repoUrl` a `null`; **sin inventar contenido**.
- [ ] Crear `src/data/projectFolders.js` con las 5 carpetas y sus `projectIds` en el orden de la spec.
- [ ] Añadir el guard de integridad: un `projectId` inexistente falla de forma visible en desarrollo.
- [ ] Verificar que ningún proyecto está duplicado en los datos pese a las repeticiones entre carpetas.
- [ ] `Work.jsx` importa desde `src/data/` y ya no define `PROJECTS`. Sin ningún otro cambio en el archivo; la sección se ve exactamente igual que antes.

## Fase 2 — Rutas

- [ ] Instalar `react-router-dom` (única dependencia nueva aprobada).
- [ ] Montar `HashRouter` y definir la ruta de detalle por `slug` + fallback para slug inexistente.
- [ ] Comprobar que la navegación por secciones de la home no se rompe: el `#` ya se usaba para las anclas.
- [ ] Verificar que `PageLoader`, el scroll suave y las animaciones GSAP siguen funcionando igual.
- [ ] Probar recarga directa de una URL de detalle en el entorno de Pages, no solo en local.

## Fase 3 — Componente `ProjectFolder`

- [ ] Portar el markup a JSX con props: `title`, `count`, `previewImages`, `to`, `defaultOpen`.
- [ ] Traducir el estilo a `ProjectFolder.scss` con BEM. Cero clases de Tailwind/HTML/CSS. Tokens `--color-*` y `--font-*` de `:root` donde existan. Crear nuevas si es necesario.
- [ ] Listar las medidas fijas en px del snippet original y proponer cuáles pasar a relativas para el responsive. Esperar confirmación antes de aplicarlo.
- [ ] Comparar lado a lado con el original: colores, tamaños, sombras, curva y duración de la animación.
- [ ] Título en negrita bajo la carpeta.
- [ ] Contador dinámico desde `projectIds.length`, con singular y plural.
- [ ] Las tres páginas usan las imágenes de los tres primeros proyectos de la carpeta.
- [ ] Apertura al hover **y** al foco por teclado.
- [ ] `defaultOpen` activo solo en Destacados.
- [ ] Elemento interactivo real (`<Link>`), no un `div` con `onClick`. Nombre accesible completo.

## Fase 4 — Carrusel

- [ ] Leer cómo calcula `Work.jsx` el ancho de sus elementos **antes** de meter nada dentro. Reportar qué asume.
- [ ] Sustituir las tarjetas por las 5 carpetas.
- [ ] Elementos visibles: 1 base / 2 desde `$md` / 3 desde `$lg` / 4 desde `$xxl`. Todo `min-width`, importando `_breakpoints.scss`.
- [ ] 🔒 Confirmar con Sofía el breakpoint de las 4 carpetas viendo el ancho real; subir a `$xxxl` si se aprietan.
- [ ] Verificar que la animación de rebobinado sigue funcionando.
- [ ] 🔒 Decidir con Sofía el comportamiento en táctil (sin hover) y aplicarlo.
- [ ] Comprobar que no hay scroll horizontal no intencionado entre 320px y 1920px.

## Fase 5 — Página de detalle

- [ ] Estructura base: enlace de vuelta visible, `<h1>` con el título, descripción de la carpeta.
- [ ] 🔒 Bloqueada hasta recibir las descripciones de las carpetas 1–4.
- [ ] 🔒 Bloqueada hasta recibir el código del componente bento.
- [ ] Adaptar el bento a los proyectos reales, en el orden de `projectIds`.
- [ ] Eliminar todo el contenido de ejemplo del componente original.
- [ ] Campos en `null` no pintan nada: sin descripción no hay párrafo, sin `url` o `repoUrl` no hay botón. Cero `href="#"`.
- [ ] Enlaces externos con `rel="noopener noreferrer"`.

## Fase 6 — Calidad

- [ ] Hook propio que actualiza `<title>` y `<meta name="description">` por vista de detalle. Sin dependencias nuevas.
- [ ] Recorrido completo con teclado; foco visible en todo momento.
- [ ] Un solo `<h1>` por vista; jerarquía de encabezados coherente.
- [ ] `alt` descriptivo en imágenes de proyecto; `alt=""` en las decorativas.
- [ ] `loading="lazy"` salvo en lo visible al cargar.
- [ ] `prefers-reduced-motion: reduce` desactiva apertura y movimiento automático.
- [ ] Contraste mínimo 4.5:1 sobre `--color-bg-dark`.

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
