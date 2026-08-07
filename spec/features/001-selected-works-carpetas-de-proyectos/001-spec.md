# 001 · Selected Works — carpetas de proyectos

**Estado:** aprobado

## Qué hace

Sustituye la lista plana de proyectos de la sección **Selected works** (`src/components/Work/Work.jsx`) por **cinco carpetas temáticas** dentro del carrusel horizontal ya existente.

Cada carpeta se renderiza con **un único componente reutilizable** configurado por props. Al pasar el ratón o al enfocar con teclado, la carpeta se abre y asoman tres "páginas" con imágenes de proyectos de esa carpeta. Debajo de la carpeta hay un título en negrita y, debajo, un contador dinámico del número de proyectos que contiene.

Al hacer clic se navega a una **página de detalle** con URL propia, que muestra la descripción de la carpeta y sus proyectos en un bento.

## Por qué

Hoy los proyectos aparecen todos al mismo nivel y sin orden: los buenos compiten con los ejercicios de bootcamp, y algunas etiquetas del array `PROJECTS` son autodespectivas (`Failed Attempt`, `Code Written in README`). Quien revisa el portfolio en 30 segundos no sabe por dónde empezar y, fuera de contexto, esas etiquetas solo restan.

Agrupar por temas resuelve tres cosas: lo mejor se ve primero, los proyectos de aprendizaje se conservan pero enmarcados como lo que son, y cada carpeta pasa a ser enlazable por separado.

## Contenido de las carpetas

**Criterio de orden: relevancia.** Lo más importante arriba, el relleno al final. Aplica a las cinco carpetas. El orden listado aquí es el orden final en pantalla: no se reordena en runtime ni se "mejora" el criterio.

### 1 · Destacados
1. Accept All Cookies · placeholder
2. Tech Jobs Dashboard · placeholder
3. Awesome Profile Cards
4. Minaya Travel

### 2 · Full Stack y APIs
1. Animal Crossing API
2. JavaScript Testing Practice (MongoDB + Docker + CI/CD)
3. Harry Potter
4. Countries Explorer
5. Virtual Store

### 3 · React y Frontend
1. Memory Game
2. Dark Horoscope
3. Layout Design Exam
4. Math Workshop

### 4 · Testing y buenas prácticas
1. React Testing Library
2. JavaScript Testing Practice
3. Accept All Cookies

### 5 · Por dónde empecé
1. Bat-Magotchi
2. Adatech
3. Pokémon
4. Piedra Papel Tijera
5. Login Social Media
6. Overwatch Form
7. El Jardín de las Delicias
8. Mefis

Descripción de esta carpeta (sentido literal; se traduce al inglés en la UI sin suavizarlo):

> Mi primera web fue en 2025 y el código estaba escrito en el README porque no sabía cómo utilizar GitHub ni desplegar en Pages. Los dejo todos aquí a propósito: esto es de dónde vengo.

> ✅ Confirmado (Fase 1): orden invertido del que venía en la lista original. Mefis fue el primer código (2025) y queda el último de la carpeta; el orden es de más reciente a más antiguo.

**Repeticiones intencionales:** `JavaScript Testing Practice` está en las carpetas 2 y 4; `Accept All Cookies` está en las carpetas 1 y 4.

## Comportamiento responsive

Son 5 carpetas: el carrusel se mantiene en **todos** los tamaños, porque nunca caben todas a la vez.

| Desde | Carpetas visibles |
| --- | --- |
| base (móvil) | 1 + carrusel |
| `$md` (768px) | 2 + carrusel |
| `$lg` (1024px) | 3 + carrusel |
| `$xxl` (1280px) | 4 + carrusel |

Mobile-first estricto, usando las variables de `src/styles/_breakpoints.scss`. El salto a 4 carpetas se confirma al ver el ancho real de la carpeta renderizada; si a 1280px se aprietan, sube a `$xxxl`.

*Destacados* es la primera carpeta del carrusel y se monta ya abierta (las tres páginas asomando), sin necesidad de hover. El resto se montan cerradas.

## Etiquetas

- Desaparecen las etiquetas autodespectivas del array `PROJECTS`: `Failed Attempt`, `Code Written in README` y cualquier variante irónica sobre la calidad del proyecto.
- Se sustituyen por etiquetas descriptivas y neutras: stack (`HTML`, `SASS`, `Vanilla JS`, `React`), tipo (`Landing`, `Game`, `Form`) o contexto (`Bootcamp exercise`).
- La honestidad sobre el nivel de los primeros proyectos vive **una sola vez**, en la descripción de la carpeta 5 — no repetida como etiqueta en cada tarjeta.

## Criterios de aceptación

**Datos**
- [ ] Los proyectos ya no viven dentro de `Work.jsx`: están en `src/data/`.
- [ ] Un proyecto existe una sola vez en los datos, aunque pertenezca a dos carpetas.
- [ ] Las 5 carpetas contienen exactamente los proyectos listados, en ese orden.
- [ ] Buscar `Failed` y `README` en `src/data/` no devuelve ninguna etiqueta de proyecto.
- [ ] Un `projectId` que no exista falla de forma visible en desarrollo, no renderiza un hueco.

**Componente y estilo**
- [ ] Existe **un solo** componente de carpeta, usado 5 veces con props distintas. No hay `Folder1`, `Folder2`, etc.
- [ ] Cero clases de Tailwind/HTML/CSS en el código final; todo el estilo en SASS con BEM.
- [ ] La carpeta es visualmente equivalente al original de uiverse.io: colores, tamaños, sombras, curva y duración de la animación de apertura.
- [ ] Usa los tokens de `:root` (`--color-*`, `--font-*`) en vez de valores literales cuando el token existe.
- [ ] Al hover **y** al foco por teclado, la carpeta se abre y asoman tres páginas con imágenes de proyectos de esa carpeta.
- [ ] Bajo cada carpeta: título en negrita y, debajo, el contador de proyectos.
- [ ] El contador se deriva de los datos: cambiar los proyectos de una carpeta cambia el número sin tocar el componente.
- [ ] El contador usa singular y plural correctos (`1 project` / `5 projects`).

**Navegación y responsive**
- [ ] Cada carpeta tiene URL propia (`/#/work/<slug>`), enlazable y que funciona al recargar en GitHub Pages.
- [ ] Desde el detalle se vuelve a Selected works con un enlace visible, no solo con el botón del navegador.
- [ ] Se ven 1 / 2 / 3 / 4 carpetas según los breakpoints de la tabla, con carrusel en todos.
- [ ] Todos los `@media` nuevos son `min-width` y usan las variables de `_breakpoints.scss`.
- [ ] Sin scroll horizontal no intencionado entre 320px y 1920px.
- [ ] La animación de rebobinado del carrusel sigue funcionando con las carpetas dentro.
- [ ] En pantallas táctiles la apertura de la carpeta es descubrible sin hover.

**Página de detalle**
- [ ] Muestra título de la carpeta, su descripción y el bento con los proyectos reales, en el orden definido.
- [ ] No queda contenido de ejemplo del componente bento original.
- [ ] Los proyectos sin enlace no pintan botón. Cero `href="#"`.

**Calidad**
- [ ] Navegación completa con teclado; foco visible en todo momento.
- [ ] Cada carpeta expone un nombre accesible completo, p. ej. "Featured, 4 projects".
- [ ] Un solo `<h1>` por vista y jerarquía de encabezados coherente.
- [ ] `alt` descriptivo en imágenes de proyecto; `alt=""` en las decorativas.
- [ ] Con `prefers-reduced-motion: reduce` no hay animación de apertura ni movimiento automático del carrusel.
- [ ] Contraste mínimo 4.5:1 en los textos nuevos sobre `--color-bg-dark`.
- [ ] Cada vista de detalle actualiza `<title>` y `<meta name="description">`.
- [ ] `npm run build` y `npm run lint` (ejecutados **con permiso de Sofía**) sin errores nuevos.

## Fuera de alcance

- Rediseñar Hero, About, footer o el loader.
- Tocar el shader `Iridescence` o el `MagicBento` de la sección About.
- Escribir proyectos nuevos o reescribir descripciones existentes: solo se reordenan y reetiquetan.
- Backend, CMS o datos remotos.
- Multiidioma: la UI sigue en inglés.
- Migrar `src/config/` o cualquier otro dato ajeno a los proyectos.
- Rellenar `repoUrl` de los proyectos: se dejan como placeholder y los completa Sofía después.

## Decisiones tomadas

- **Rutas:** `HashRouter`. URLs tipo `/#/work/featured`. Evita el 404 de GitHub Pages al recargar sin tocar el despliegue. Coste asumido: la URL lleva `#` y el fragmento no llega al servidor, así que el SEO de las vistas de detalle es más débil que con URLs limpias.
- **Componente de carpeta:** viene de uiverse.io, no de React Bits. No le aplica la excepción de "mantener `.css` plano": se traduce a SASS/BEM como componente propio del proyecto.
- **Orden dentro de las carpetas:** por relevancia en las cinco, no cronológico.
- **Enlaces de proyecto:** se mantiene `url` y se añade `repoUrl` con placeholder, a rellenar más adelante.
- **Orden de la carpeta 5 (Por dónde empecé):** invertido del de la lista original — Bat-Magotchi el primero, Mefis el último. Mefis fue el primer código de Sofía (2025); el orden va de más reciente a más antiguo.

## Decisiones pendientes

| # | Decisión | Bloquea |
| --- | --- | --- |
| 1 | Comportamiento de la carpeta en táctil (sin hover) | Fase 4 |
| 2 | Breakpoint definitivo para 4 carpetas (`$xxl` o `$xxxl`), a la vista del ancho real | Fase 4 |

## Pendiente de aportar

| # | Falta | Bloquea |
| --- | --- | --- |
| 1 | Código del componente bento ✅ recibido (`src/components/ui/BentoDemo/BentoDemo.tsx`) | Fase 5 |
| 2 | Descripciones de las carpetas 1–4 | Detalle de esas carpetas |
| 3 | Contenido de Accept All Cookies y Tech Jobs Dashboard | Sustituir los placeholders |
| 4 | Imagen de portada de esos dos placeholders | Páginas de la carpeta Destacados |
| 5 | URLs de repositorio | Segundo enlace en el bento |
