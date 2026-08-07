import { Link } from "react-router-dom";
import "./ProjectFolder.scss";

function ProjectFolder({ title, count, previewImages, to, defaultOpen = false }) {
  const countLabel = `${count} ${count === 1 ? "project" : "projects"}`;

  return (
    <Link
      className={`folder${defaultOpen ? " folder--open" : ""}`}
      to={to}
      aria-label={`${title}, ${countLabel}`}
    >
      <span className="folder__shape" aria-hidden="true">
        <span className="folder__back" />
        <span className="folder__papers">
          {previewImages.map((src, index) => (
            <span className={`paper paper--${index + 1}`} key={index}>
              {src ? (
                <img
                  className="paper__img"
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              ) : null}
            </span>
          ))}
        </span>
        <span className="folder__front" />
      </span>
      <span className="folder__meta">
        <span className="folder__title">{title}</span>
        <span className="folder__count">{countLabel}</span>
      </span>
    </Link>
  );
}

export default ProjectFolder;
