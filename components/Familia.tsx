"use client";
import { useT } from "@/lib/i18n";
import { useEffect, useState } from "react";

const CORTEJO = [
  "Gorgonio Tranquilino",
  "Anallely Tranquilino",
];
const PADRINOS = [
  "Felipe Zanchez",
  "Lourdes Mendoza",
];

/** Tiempo visible por nombre (ms) y duración del fade */
const HOLD = 2800;
const FADE = 600;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CortejoRotativo() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let out: ReturnType<typeof setTimeout>;
    const cycle = setInterval(() => {
      setVisible(false);
      out = setTimeout(() => {
        setI((p) => (p + 1) % CORTEJO.length);
        setVisible(true);
      }, FADE);
    }, HOLD + FADE);
    return () => { clearInterval(cycle); clearTimeout(out); };
  }, [reduced]);

  const nameStyle: React.CSSProperties = {
    fontFamily: "var(--font-cormorant), serif",
    fontWeight: 600,
    fontSize: 24,
    color: "#10132e",
    letterSpacing: 0.6,
    lineHeight: 1.6,
  };

  /* Accesibilidad: sin movimiento → lista completa estática */
  if (reduced) {
    return (
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {CORTEJO.map((n) => (
          <li key={n} style={{ ...nameStyle, fontSize: 21, lineHeight: 2 }}>{n}</li>
        ))}
      </ul>
    );
  }

  return (
    <div aria-live="off">
      {/* Lista completa para lectores de pantalla y buscadores */}
      <span style={{
        position: "absolute", width: 1, height: 1, overflow: "hidden",
        clip: "rect(0 0 0 0)", clipPath: "inset(50%)", whiteSpace: "nowrap",
      }}>
        {CORTEJO.join(", ")}
      </span>

      <div
        aria-hidden="true"
        style={{
          minHeight: 46,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            ...nameStyle,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(6px)",
            transition: `opacity ${FADE}ms ease, transform ${FADE}ms ease`,
          }}
        >
          {CORTEJO[i]}
        </span>
      </div>

      {/* Indicador de posición */}
      <div aria-hidden="true" style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 14 }}>
        {CORTEJO.map((_, k) => (
          <span key={k} style={{
            width: 5, height: 5, borderRadius: "50%",
            background: k === i ? "#d4af37" : "rgba(0,12,217,0.25)",
            transition: "background .4s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

export default function Familia() {
  const t = useT();
  return (
    <section style={{ padding: "64px 26px" }}>
      <p style={{
        fontFamily: "var(--font-cormorant), serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 5,
        textTransform: "uppercase",
        color: "#0000a0",
        textAlign: "center",
        marginBottom: 8,
        opacity: 0.95,
      }}>
        {t("familyKicker")}
      </p>
      <h2 style={{
        fontFamily: "var(--font-great-vibes), cursive",
        fontSize: 50,
        textAlign: "center",
        lineHeight: 1.25,
        marginBottom: 30,
        padding: "6px 24px 10px",
        background: "linear-gradient(135deg,#0000a0 0%,#000cd9 45%,#d4af37 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        overflow: "visible",
        display: "block",
      }}>
        {t("familyTitle")}
      </h2>

      {/* Cortejo de Honor */}
      <div style={{
        width: "100%",
        textAlign: "center",
        padding: "32px 26px",
        background: "linear-gradient(145deg,rgba(255,255,255,0.82),rgba(247,249,255,0.95))",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(0,12,217,0.13)",
        boxShadow: "0 6px 30px rgba(0,0,160,0.07),inset 0 1px 0 rgba(255,255,255,0.88)",
        borderRadius: 24,
        position: "relative",
      }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          margin: "0 auto 14px",
          background: "linear-gradient(135deg,rgba(159,176,245,0.22),rgba(0,12,217,0.22))",
          border: "1.5px solid rgba(159,176,245,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(159,176,245,0.20)",
        }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#9fb0f5" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 4 L2 9 L12 14 L22 9 Z M6 11.2 V16 C8 18 16 18 18 16 V11.2 M22 9 V14"/>
          </svg>
        </div>
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#0000a0",
          marginBottom: 18,
          opacity: 1,
        }}>
          {t("courtTitle")}
        </p>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {CORTEJO.map((n) => (
            <li key={n} style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 23, color: "#10132e", lineHeight: 1.7 }}>{n}</li>
          ))}
        </ul>
        <div aria-hidden="true" style={{ width: 60, height: 1, margin: "24px auto 20px", background: "linear-gradient(90deg,transparent,#d4af37,transparent)" }} />
        <p style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#0000a0",
          marginBottom: 14,
        }}>
          Padrinos de Generación
        </p>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {PADRINOS.map((n) => (
            <li key={n} style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600, fontSize: 23, color: "#10132e", lineHeight: 1.7 }}>{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
