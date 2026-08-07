import { useEffect } from "react";

const DEFAULT_TITLE = "Sofía Minaya";
const DEFAULT_DESCRIPTION =
  "Sofía Minaya — junior full-stack developer y artista multidisciplinar. Portfolio con proyectos, herramientas y un toque personal.";

export const useDocumentMeta = (title, description) => {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta ? meta.getAttribute("content") : null;

    document.title = title ? `${title} — ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    if (meta) {
      meta.setAttribute("content", description || DEFAULT_DESCRIPTION);
    }

    return () => {
      document.title = previousTitle;
      if (meta) {
        meta.setAttribute("content", previousDescription ?? DEFAULT_DESCRIPTION);
      }
    };
  }, [title, description]);
};
