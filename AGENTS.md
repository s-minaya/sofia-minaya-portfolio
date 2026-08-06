# AGENTS.md

Portfolio personal de Sofía Minaya. React 19 + Vite 7 + SASS/BEM. JavaScript.

## Antes de tocar nada

Lee, en este orden:

1. `spec/constitution/mission.md` — para qué existe el proyecto.
2. `spec/constitution/tech-stack.md` — tecnologías, convenciones y **límites duros**.
3. `spec/constitution/roadmap.md` — qué feature está en curso.
4. `spec/features/<feature en curso>/` — `spec.md`, luego `plan.md`, luego `tasks.md`.

La constitución manda. Si algo de una feature choca con `mission.md` o `tech-stack.md`, se replantea la feature, no la constitución.

## Cómo se trabaja

- **Una tarea de `tasks.md` cada vez.** Implementar, enseñar el resultado, esperar confirmación, siguiente. No encadenar una fase entera.
- **Las tareas marcadas 🔒 están bloqueadas.** No se empiezan ni se aproximan hasta que llegue el material que indican.
- Marcar `[x]` en `tasks.md` solo cuando la tarea esté validada, no al escribir el código.
- Al cerrar una feature, moverla a "Hecho" en `roadmap.md`.

## Reglas duras

- **No hacer commit, push, ni build** sin permiso de Sofía.
- **No inventar contenido.** Títulos de proyecto, descripciones, URLs, imágenes, stack y años salen de los datos ya existentes en el repo. Si un dato falta: **parar y preguntar**. Nunca rellenar con texto plausible.
- **No inventar código de terceros.** Los componentes externos los aporta Sofía. Hasta que estén pegados en el repo, no se reconstruyen de memoria ni se "aproximan".
- **No inventar dependencias.** Nada fuera de `package.json` sin aprobación explícita.
- **No introducir Tailwind** ni ninguna librería de utilidades CSS. Todo el estilo en SASS con BEM.
- **No tocar** Hero, About, footer, loader ni el shader WebGL salvo que la feature lo pida.
- **No romper** la animación de rebobinado del carrusel.
- Ante la duda: preguntar. Una pregunta cuesta menos que deshacer diez archivos.

## Convenciones

- Componentes en PascalCase, uno por carpeta, con su `.scss` al lado.
- BEM estricto: `.bloque`, `.bloque__elemento`, `.bloque--modificador`.
- Variables SASS del proyecto antes que valores literales de color, espaciado o tipografía.
- Los datos viven en `src/data/`, nunca dentro del JSX.
- **Idioma:** interfaz en inglés, documentación de `spec/` y conversación en español.
- Accesibilidad como requisito: HTML semántico, navegación por teclado, foco visible, `alt` real, `prefers-reduced-motion` respetado, contraste mínimo 4.5:1.
- Responsive de 320px a 1920px sin scroll horizontal no intencionado.

## Comandos

```bash
npm run dev     # entorno local
npm run build   # build de producción
npm run lint    # revisión de estilo
```

Antes de dar una feature por terminada: `npm run build` y `npm run lint` sin errores nuevos.

## Dónde está cada cosa

Estructura del repo, rutas de los módulos clave, tokens de color, tipografías y breakpoints: `spec/constitution/tech-stack.md`.
