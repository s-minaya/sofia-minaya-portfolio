import { useRef, useEffect, useCallback, useState, Children, cloneElement } from "react";
import "./BentoGrid.scss";

const GRID_BREAKPOINT = 1024;
const TAG_MIN_SCALE = 0.55;
const TAG_GAP_REM = 0.6;
const TAG_SCALE_EPSILON = 0.002;

function buildSpans(count) {
  if (count <= 0) return [];

  let rows;
  if (count === 1) {
    rows = [[3]];
  } else if (count === 2) {
    rows = [[1, 2]];
  } else if (count === 3) {
    rows = [[1, 1, 1]];
  } else if (count % 2 === 0) {
    rows = Array.from({ length: count / 2 }, (_, i) => (i % 2 === 0 ? [1, 2] : [2, 1]));
  } else {
    const wideRows = (count - 3) / 2;
    rows = Array.from({ length: wideRows }, (_, i) => (i % 2 === 0 ? [1, 2] : [2, 1]));
    rows.splice(Math.ceil(wideRows / 2), 0, [1, 1, 1]);
  }

  if (import.meta.env.DEV) {
    for (const row of rows) {
      const total = row.reduce((sum, span) => sum + span, 0);
      if (total !== 3) {
        throw new Error(`buildSpans: la fila ${JSON.stringify(row)} no suma 3 columnas (count ${count}).`);
      }
    }
    const flat = rows.flat();
    if (flat.length !== count) {
      throw new Error(`buildSpans: ${flat.length} spans generados para ${count} proyectos. Revisa la regla del bento.`);
    }
  }

  return rows.flat();
}

function computeLayout(count, width) {
  if (count <= 0 || width <= 0) return { cols: 1, spans: [] };
  const desktop = width >= GRID_BREAKPOINT;
  return {
    cols: desktop ? 3 : 1,
    spans: desktop ? buildSpans(count) : new Array(count).fill(1),
  };
}

function BentoGrid({ className = "", children }) {
  const gridRef = useRef(null);
  const count = Children.count(children);
  const [layout, setLayout] = useState({ cols: 1, spans: new Array(count).fill(1) });

  const measure = useCallback(() => {
    const el = gridRef.current;
    if (!el) return;
    setLayout(computeLayout(count, el.clientWidth));
  }, [count]);

  useEffect(() => {
    measure();
    const el = gridRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div
      ref={gridRef}
      className={`bento-grid${className ? ` ${className}` : ""}`}
      style={{ gridTemplateColumns: `repeat(${layout.cols}, 1fr)` }}
    >
      {Children.map(children, (child, index) =>
        child ? cloneElement(child, { span: layout.spans[index] ?? 1 }) : child,
      )}
    </div>
  );
}

function BentoGridItem({ project, span = 1 }) {
  const tagsRef = useRef(null);
  const [tagScale, setTagScale] = useState(1);

  // La medición se normaliza SIEMPRE a escala base (1): el ancho medido se
  // divide por la escala aplicada. Si se midiera a la escala actual, aplicar
  // la escala nueva volvería a disparar el ResizeObserver (el padding en `em`
  // cambia la altura de la fila) y la escala oscilaría sin converger.
  const fitTags = useCallback(() => {
    const el = tagsRef.current;
    if (!el) return;
    const chips = el.querySelectorAll(".bento-grid__tag");
    if (chips.length === 0) {
      setTagScale((prev) => (prev === 1 ? prev : 1));
      return;
    }
    const styles = getComputedStyle(el);
    const rootFontPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const appliedScale = parseFloat(styles.fontSize) / (1.2 * rootFontPx) || 1;
    const gapPx = parseFloat(styles.gap) || TAG_GAP_REM * rootFontPx;
    const totalBase =
      [...chips].reduce((sum, chip) => sum + chip.offsetWidth / appliedScale, 0) +
      gapPx * (chips.length - 1);
    const available = el.clientWidth;
    if (available <= 0) return;
    const scale = totalBase > available ? Math.max(TAG_MIN_SCALE, available / totalBase) : 1;
    setTagScale((prev) =>
      Math.abs(prev - scale) < TAG_SCALE_EPSILON ? prev : scale,
    );
  }, []);

  const hasTags = Boolean(project) && Array.isArray(project.tags) && project.tags.length > 0;

  useEffect(() => {
    if (!project || !hasTags) return;
    const el = tagsRef.current;
    if (!el) return;
    const ro = new ResizeObserver(fitTags);
    ro.observe(el);
    let raf = 0;
    const onFontsReady = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fitTags);
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(onFontsReady);
    }
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [project, hasTags, fitTags]);

  if (!project) return null;

  const Icon = project.icon;
  const isWide = span > 1;
  const hasImage = Boolean(project.image);
  const hasDescription = Boolean(project.description);
  const hasUrl = Boolean(project.url);
  const hasRepoUrl = Boolean(project.repoUrl);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
  };

  return (
    <article
      className={`bento-grid__card${isWide ? " bento-grid__card--wide" : ""}`}
      style={{ gridColumn: `span ${span}` }}
      onMouseMove={handleMouseMove}
    >
      {hasImage && (
        <img
          className="bento-grid__media"
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
        />
      )}

      {hasImage && <div className="bento-grid__overlay" aria-hidden="true" />}
      <div className="bento-grid__glow" aria-hidden="true" />

      <div className="bento-grid__content">
        <div className="bento-grid__header">
          {Icon && (
            <span className="bento-grid__icon" aria-hidden="true">
              <Icon />
            </span>
          )}
          <h2 className="bento-grid__title">{project.title}</h2>
        </div>

        {(hasDescription || hasUrl || hasRepoUrl) && (
          <div className="bento-grid__panel">
            {hasDescription && (
              <p className="bento-grid__description">{project.description}</p>
            )}

            {(hasUrl || hasRepoUrl) && (
              <div className="bento-grid__links">
                {hasUrl && (
                  <a
                    className="bento-grid__link"
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View project
                  </a>
                )}
                {hasRepoUrl && (
                  <a
                    className="bento-grid__link bento-grid__link--secondary"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {hasTags && (
          <ul
            ref={tagsRef}
            className="bento-grid__tags"
            aria-label="Technologies"
            style={{ "--tag-scale": tagScale }}
          >
            {project.tags.map((tag) => (
              <li className="bento-grid__tag" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export { BentoGrid, BentoGridItem };
