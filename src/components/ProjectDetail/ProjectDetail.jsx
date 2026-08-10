import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import projectFolders from "../../data/projectFolders";
import projects from "../../data/projects";
import { useMobileDetection } from "../../hooks/useMobileDetection";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { getDefaultParticleCount, getDefaultPixelRatio, DEFAULT_PARTICLE_COLORS } from "../../config/visuals";
import { BentoGrid, BentoGridItem } from "../ui/BentoDemo/BentoGrid";
const Particles = lazy(() => import("../ui/Particles/Particles"));
import "./ProjectDetail.scss";

function ProjectDetail() {
  const { slug } = useParams();
  const isMobile = useMobileDetection();
  const folder = projectFolders.find((f) => f.slug === slug);
  const folderProjects = folder
    ? folder.projectIds
        .map((id) => projects.find((p) => p.id === id))
        .filter(Boolean)
    : [];

  useDocumentMeta(folder ? folder.title : "Page not found", folder?.description);

  const particlesBg = (
    <div className="project-detail__bg" aria-hidden="true">
      <Suspense fallback={null}>
        <Particles
          particleColors={DEFAULT_PARTICLE_COLORS}
          particleCount={getDefaultParticleCount(isMobile)}
          particleSpread={10}
          speed={0.06}
          particleBaseSize={60}
          alphaParticles
          disableRotation={false}
          pixelRatio={getDefaultPixelRatio()}
        />
      </Suspense>
    </div>
  );

  if (!folder) {
    return (
      <main className="project-detail">
        {particlesBg}
        <div className="project-detail__content">
          <Link className="project-detail__back" to="/" state={{ scrollTo: "work" }}>
            &larr; Back to Selected works
          </Link>
          <h1 className="project-detail__not-found">Folder not found.</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="project-detail">
      {particlesBg}

      <div className="project-detail__content">
        <Link className="project-detail__back" to="/" state={{ scrollTo: "work" }}>
          &larr; Back to Selected works
        </Link>

        <header className="project-detail__header">
          <h1 className="project-detail__title">{folder.title}</h1>
          {folder.description && (
            <p className="project-detail__description">{folder.description}</p>
          )}
        </header>

        <BentoGrid>
          {folderProjects.map((project) => (
            <BentoGridItem key={project.id} project={project} />
          ))}
        </BentoGrid>
      </div>
    </main>
  );
}

export default ProjectDetail;
