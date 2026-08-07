import { useRef, useEffect, useCallback, useState, Children, cloneElement } from "react";
import "./BentoGrid.scss";

const GRID_BREAKPOINT = 1024;

function buildSpans(count) {
  if (count <= 0) return [];
  if (count === 1) return [3];

  let fullRows;
  let wideRows;
  if (count % 3 === 0) {
    fullRows = count / 3;
    wideRows = 0;
  } else if (count % 3 === 2) {
    fullRows = (count - 2) / 3;
    wideRows = 1;
  } else {
    fullRows = (count - 4) / 3;
    wideRows = 2;
  }

  const rows = [];
  for (let i = 0; i < wideRows; i += 1) {
    rows.push(i % 2 === 0 ? [1, 2] : [2, 1]);
  }
  for (let i = 0; i < fullRows; i += 1) {
    rows.push([1, 1, 1]);
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
  if (!project) return null;

  const Icon = project.icon;
  const isWide = span > 1;
  const hasImage = Boolean(project.image);
  const hasDescription = Boolean(project.description);
  const hasTags = Array.isArray(project.tags) && project.tags.length > 0;
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

        {(hasDescription || hasTags || hasUrl || hasRepoUrl) && (
          <div className="bento-grid__panel">
            {hasDescription && (
              <p className="bento-grid__description">{project.description}</p>
            )}

            {hasTags && (
              <ul className="bento-grid__tags" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li className="bento-grid__tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
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
      </div>
    </article>
  );
}

export { BentoGrid, BentoGridItem };
