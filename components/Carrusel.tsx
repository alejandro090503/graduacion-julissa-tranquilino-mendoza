"use client";
import { useEffect, useRef } from "react";
import { useT, type TKey } from "@/lib/i18n";

/**
 * Rueda 3D de fotos — mismo patrón que boda-veronica-y-andres:
 * las tarjetas se reparten en un anillo con `rotateY(360/n*i) translateZ(R)`,
 * el anillo gira solo hasta el primer arrastre y luego responde al drag
 * con inercia (velocidad amortiguada 0.94 por frame).
 *
 * Diferencias necesarias aquí:
 * - Sin GSAP: la rotación se escribe directo sobre el nodo.
 * - Radio responsive (en la boda estaba fijo en 210px y se encimaba en 375px).
 * - Las <img> NO llevan `loading="lazy"`: dentro de un contenedor con
 *   translateZ el lazy nunca dispara y las tarjetas quedan vacías sin error.
 */

const FOTOS: { src: string; alt: TKey }[] = [
  { src: "/imagenes/julissa-1.jpg", alt: "galAlt1" },
  { src: "/imagenes/julissa-1.jpg", alt: "galAlt2" },
  { src: "/imagenes/julissa-1.jpg", alt: "galAlt3" },
  { src: "/imagenes/julissa-1.jpg", alt: "galAlt4" },
  { src: "/imagenes/julissa-1.jpg", alt: "galAlt6" },
  { src: "/imagenes/julissa-1.jpg", alt: "galAlt7" },
  { src: "/imagenes/julissa-1.jpg", alt: "galAlt8" },
];

export default function Carrusel() {
  const t = useT();
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const cards = Array.from(
      ring.querySelectorAll<HTMLDivElement>("[data-card]")
    );
    const n = cards.length;
    if (!n) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rot = 0;
    let vel = 0;
    let isDrag = false;
    let auto = !reduced;
    let startX = 0;
    let startRot = 0;
    let lastX = 0;
    let raf = 0;

    /* El radio depende del ancho: con 210px fijos las tarjetas se enciman
       en pantallas de 375px. */
    const colocar = () => {
      const ancho = Math.min(window.innerWidth, 430);
      const radio = Math.round(Math.max(150, Math.min(230, ancho * 0.52)));
      cards.forEach((card, i) => {
        card.style.transform = `rotateY(${(360 / n) * i}deg) translateZ(${radio}px)`;
      });
    };

    const pintar = () => {
      ring.style.transform = `rotateY(${rot}deg)`;
    };

    const down = (x: number) => {
      isDrag = true;
      auto = false;
      ring.style.cursor = "grabbing";
      startX = x;
      lastX = x;
      startRot = rot;
      vel = 0;
    };
    const move = (x: number) => {
      if (!isDrag) return;
      rot = startRot + (x - startX) * 0.45;
      vel = (x - lastX) * 0.5;
      lastX = x;
      pintar();
    };
    const up = () => {
      if (!isDrag) return;
      isDrag = false;
      ring.style.cursor = "grab";
    };

    /* Un solo bucle: giro automático + inercia tras soltar */
    const tick = () => {
      if (!isDrag) {
        if (auto) {
          rot += 0.12;
          pintar();
        } else if (Math.abs(vel) > 0.05) {
          rot += vel;
          vel *= 0.94;
          pintar();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const onMouseDown = (e: MouseEvent) => { e.preventDefault(); down(e.clientX); };
    const onMouseMove = (e: MouseEvent) => move(e.clientX);
    const onTouchStart = (e: TouchEvent) => down(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX);

    colocar();
    pintar();
    raf = requestAnimationFrame(tick);

    ring.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", up);
    ring.addEventListener("touchstart", onTouchStart, { passive: true });
    ring.addEventListener("touchmove", onTouchMove, { passive: true });
    ring.addEventListener("touchend", up);
    window.addEventListener("resize", colocar);

    return () => {
      cancelAnimationFrame(raf);
      ring.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", up);
      ring.removeEventListener("touchstart", onTouchStart);
      ring.removeEventListener("touchmove", onTouchMove);
      ring.removeEventListener("touchend", up);
      window.removeEventListener("resize", colocar);
    };
  }, []);

  return (
    <section style={{ padding: "56px 0 40px", textAlign: "center", overflow: "visible" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#0000a0",
        marginBottom: 8,
        opacity: 0.9,
      }}>
        {t("galKicker")}
      </p>
      <h2 style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        lineHeight: 1.1,
        marginBottom: 6,
        background: "linear-gradient(135deg,#0000a0 0%,#000cd9 45%,#d4af37 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {t("galTitle")}
      </h2>
      <div style={{
        width: 120,
        height: 1,
        margin: "0 auto",
        background: "linear-gradient(90deg,transparent,#d4af37,transparent)",
      }} />

      <div style={{
        position: "relative",
        width: "100%",
        height: 400,
        margin: "28px auto 0",
        perspective: 1200,
        transformStyle: "preserve-3d",
        overflow: "visible",
      }}>
        <div
          ref={ringRef}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            cursor: "grab",
            touchAction: "pan-y",
          }}
        >
          {FOTOS.map((f) => (
            <div
              key={f.src}
              data-card=""
              style={{
                position: "absolute",
                width: 170,
                height: 240,
                left: "50%",
                top: "50%",
                marginLeft: -85,
                marginTop: -120,
                borderRadius: 18,
                overflow: "hidden",
                border: "2px solid rgba(166,124,1,0.34)",
                boxShadow: "0 12px 40px rgba(0,0,160,0.24)",
                userSelect: "none",
                WebkitUserSelect: "none",
                background: "linear-gradient(160deg,#f7f9ff,#e6eaff)",
              }}
            >
              {/* Sin loading="lazy": no dispara dentro de translateZ */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.src}
                alt={t(f.alt)}
                decoding="async"
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontSize: 14,
        letterSpacing: 3,
        color: "#0008b8",
        marginTop: 20,
        opacity: 0.8,
      }}>
        {t("galHint")}
      </p>
    </section>
  );
}
