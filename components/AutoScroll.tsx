"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Auto-scroll lento y contemplativo.
 *
 * Replica el mecanismo probado en bautizo-jayden (rAF + window.scrollBy),
 * con dos ajustes:
 *  - la velocidad se normaliza por delta-time, para que una pantalla de
 *    120 Hz no baje al doble de rápido que una de 60 Hz;
 *  - respeta `prefers-reduced-motion: reduce` (ahí no arranca nunca).
 *
 * Arranca sólo cuando la secuencia de intro ha terminado (`active`), tras
 * una pausa para que el invitado vea el hero. Se detiene con el primer
 * gesto del usuario y NO se reanuda solo: pelearse con la página es peor
 * que perder el efecto. Para volver a activarlo está el botón discreto.
 */

/** px por segundo — equivale a los 0.9 px/frame @60 Hz de bautizo-jayden. */
const VELOCIDAD = 54;
/** ms de espera desde que se revela la invitación. */
const RETARDO = 2000;

const EVENTOS_PARADA = [
  "wheel",
  "touchstart",
  "mousedown",
  "keydown",
] as const;

export default function AutoScroll({ active }: { active: boolean }) {
  // null = no disponible (reduced motion / final de página)
  const [corriendo, setCorriendo] = useState<boolean | null>(null);
  const corriendoRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const arranque = window.setTimeout(() => setCorriendo(true), RETARDO);
    return () => window.clearTimeout(arranque);
  }, [active]);

  useEffect(() => {
    corriendoRef.current = corriendo === true;
    if (corriendo !== true) return;

    let raf = 0;
    let anterior = 0;
    let sobrante = 0; // acumulador sub-pixel

    const tick = (t: number) => {
      if (!corriendoRef.current) return;
      if (anterior === 0) anterior = t;
      // dt acotado: al volver de segundo plano no damos un salto brusco
      const dt = Math.min(50, t - anterior);
      anterior = t;

      sobrante += (VELOCIDAD * dt) / 1000;
      const paso = Math.floor(sobrante);
      if (paso > 0) {
        sobrante -= paso;
        // `behavior: instant` es obligatorio: el proyecto tiene
        // `html { scroll-behavior: smooth }` y sin esto cada paso lanzaría
        // una animación suave nueva por frame (el scroll se atasca).
        window.scrollBy({ top: paso, behavior: "instant" });
      }

      const fin =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (fin) {
        corriendoRef.current = false;
        setCorriendo(null);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const parar = () => {
      corriendoRef.current = false;
      setCorriendo(false);
    };

    raf = requestAnimationFrame(tick);
    EVENTOS_PARADA.forEach((ev) =>
      document.addEventListener(ev, parar, { capture: true, passive: true })
    );

    return () => {
      cancelAnimationFrame(raf);
      EVENTOS_PARADA.forEach((ev) =>
        document.removeEventListener(ev, parar, { capture: true })
      );
    };
  }, [corriendo]);

  if (corriendo === null) return null;

  const alternar = () => {
    if (corriendo) {
      corriendoRef.current = false;
      setCorriendo(false);
    } else {
      setCorriendo(true);
    }
  };

  return (
    <button
      type="button"
      onClick={alternar}
      // el click no debe dispararse como "gesto de parada" del capture
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      aria-label={corriendo ? "Pausar recorrido automático" : "Reanudar recorrido automático"}
      style={{
        position: "fixed",
        bottom: 26,
        left: 22,
        zIndex: 998,
        width: 38,
        height: 38,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        border: "1px solid rgba(212,175,55,0.45)",
        background: "rgba(247,249,255,0.62)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        color: "#000cd9",
        cursor: "pointer",
        padding: 0,
        opacity: 0.55,
        transition: "opacity .3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
    >
      <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        {corriendo ? (
          <>
            <rect x="2" y="1" width="3" height="10" rx="1" />
            <rect x="7" y="1" width="3" height="10" rx="1" />
          </>
        ) : (
          <path d="M2.5 1.2 10.2 6 2.5 10.8Z" />
        )}
      </svg>
    </button>
  );
}
