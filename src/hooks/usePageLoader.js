import { useEffect, useState } from "react";

const FULL_TEXT = "Sofía Minaya.";
const TYPING_SPEED = 100; // ms por letra
const PAUSE_AFTER = 900; // ms de pausa tras terminar de escribir
const EXIT_TOTAL = 1200; // ms que dura toda la animación de salida

function usePageLoader() {
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pause | exit | done

  // Fase 1: typewriting letra a letra
  useEffect(() => {
    if (phase !== "typing") return;

    if (displayedText.length < FULL_TEXT.length) {
      const t = setTimeout(() => {
        setDisplayedText(FULL_TEXT.slice(0, displayedText.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(t);
    }

    // Texto completo
    const t = setTimeout(() => setPhase("pause"), 200);
    return () => clearTimeout(t);
  }, [phase, displayedText]);

  // Fase 2: pausa para leer -> dispara salida
  useEffect(() => {
    if (phase !== "pause") return;
    const t = setTimeout(() => setPhase("exit"), PAUSE_AFTER);
    return () => clearTimeout(t);
  }, [phase]);

  // Fase 3: salida -> elimina loader del DOM
  useEffect(() => {
    if (phase !== "exit") return;
    const t = setTimeout(() => setPhase("done"), EXIT_TOTAL);
    return () => clearTimeout(t);
  }, [phase]);

  return { displayedText, phase };
}

export default usePageLoader;
