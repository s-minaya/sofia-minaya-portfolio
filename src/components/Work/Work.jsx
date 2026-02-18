import React from "react";
import "../../styles/Work/Work.scss";
import PROJECT_CATEGORIES from "../../array-projects";

function ProjectCard({ project }) {
  return (
    <article
      className="work__card"
      onClick={() => window.open(project.url, "_blank", "noopener")}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") window.open(project.url, "_blank", "noopener");
      }}
    >
      <div
        className="work__card-image"
        style={{ backgroundImage: `url(${project.image})` }}
        aria-hidden="true"
      />
      <div className="work__card-body">
        <h3 className="work__card-title">{project.title}</h3>
        <p className="work__card-tags">{project.tags.join(" • ")}</p>
      </div>
    </article>
  );
}

function Work() {
  // use first category's projects as selected work
  const category = PROJECT_CATEGORIES && PROJECT_CATEGORIES[0];
  const projects = (category && category.projects) || [];

  return (
    <section className="work">
      <div className="work__label">Selected work</div>

      <div className="work__container">
        <div className="work__carousel">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Work;
