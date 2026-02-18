import { useEffect, useState, useCallback } from "react";

// Hook genérico — recibe un array de strings y los cicla con typewriting
// texts: string[]
// typingSpeed: ms por letra al escribir
// deletingSpeed: ms por letra al borrar
// pauseAfterType: ms de espera tras escribir
// pauseAfterDelete: ms de espera tras borrar
function useTypewriter({
  texts = [],
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseAfterType = 1800,
  pauseAfterDelete = 400,
} = {}) {
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentText = texts[textIndex] ?? "";

  const tick = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Escribiendo
      if (displayed.length < currentText.length) {
        setDisplayed(currentText.slice(0, displayed.length + 1));
      } else {
        // Texto completo → pausa antes de borrar
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseAfterType);
      }
    } else {
      // Borrando
      if (displayed.length > 0) {
        setDisplayed((prev) => prev.slice(0, -1));
      } else {
        // Borrado completo → pausa antes del siguiente texto
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, pauseAfterDelete);
      }
    }
  }, [
    displayed,
    isDeleting,
    isPaused,
    currentText,
    pauseAfterType,
    pauseAfterDelete,
    texts.length,
  ]);

  useEffect(() => {
    if (texts.length === 0) return;
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [tick, isDeleting, typingSpeed, deletingSpeed, texts.length]);

  return { displayed, isDeleting };
}

export default useTypewriter;
